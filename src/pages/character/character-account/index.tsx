import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  PasswordFormData,
} from "../../../schemas/password-schema";
import { useAccount } from "../../../hooks";
import { motion } from "framer-motion";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import { Sword, Shield, Camera } from "@styled-icons/remix-fill";
import * as S from "./styles";
import { PasswordForm } from "../../../components/forms/password-form";

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      1,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const CharacterAccountPage = () => {
  const { user, isLoading, updatePassword, updatePhoto } = useAccount();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height));
  };

  const handleSavePhoto = async () => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const size = 200;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      size,
      size
    );

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.9);
    });

    if (blob) {
      const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
      await updatePhoto(file);
      setImgSrc("");
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    const success = await updatePassword(data);
    if (success) {
      reset();
    }
  };

  if (!user) {
    return (
      <S.LoadingContainer>
        <S.LoadingAnimation>
          <Sword size={48} className="sword-spin" />
          <span>Carregando perfil do guerreiro...</span>
        </S.LoadingAnimation>
      </S.LoadingContainer>
    );
  }

  return (
    <S.AccountContainer>
      <S.HeaderContainer>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <S.MainTitle>Grimório Pessoal</S.MainTitle>
          <S.MainSubtitle>
            "Aqui jazem os segredos mais profundos do seu ser"
          </S.MainSubtitle>
        </motion.div>
      </S.HeaderContainer>

      <S.ProfileSection>
        <S.ProfileHeader>
          <S.ProfileTitle>
            <Shield size={24} />
            <span>Perfil do Herói</span>
          </S.ProfileTitle>
        </S.ProfileHeader>

        <S.ProfileContent>
          <S.PhotoSection>
            {imgSrc ? (
              <>
                <S.CropContainer>
                  <ReactCrop
                    crop={crop}
                    onChange={setCrop}
                    onComplete={setCompletedCrop}
                    aspect={1}
                    circularCrop
                    minWidth={180}
                    minHeight={180}
                  >
                    <S.PreviewImage
                      ref={imgRef}
                      alt="Preview"
                      src={imgSrc}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </S.CropContainer>

                <S.HiddenCanvas ref={previewCanvasRef} />

                <S.PhotoActions>
                  <S.ActionButton
                    onClick={handleSavePhoto}
                    disabled={isLoading}
                  >
                    {isLoading ? "Salvando..." : "Confirmar"}
                  </S.ActionButton>
                  <S.ActionButton
                    variant="cancel"
                    onClick={() => setImgSrc("")}
                    disabled={isLoading}
                  >
                    Cancelar
                  </S.ActionButton>
                </S.PhotoActions>
              </>
            ) : (
              <>
                <S.ProfilePhoto
                  src={user.photo_url || ""}
                  alt="Foto do perfil"
                />
                <S.PhotoUpload>
                  <S.UploadLabel htmlFor="photo-upload">
                    <Camera size={20} />
                    <span>Alterar Avatar</span>
                  </S.UploadLabel>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    style={{ display: "none" }}
                  />
                </S.PhotoUpload>
              </>
            )}
          </S.PhotoSection>

          <S.InfoSection>
            <S.InfoGroup>
              <S.InfoLabel>Nome:</S.InfoLabel>
              <S.InfoValue>{user.name}</S.InfoValue>
            </S.InfoGroup>

            <S.InfoGroup>
              <S.InfoLabel>Apelido:</S.InfoLabel>
              <S.InfoValue>{user.nickname}</S.InfoValue>
            </S.InfoGroup>

            <S.InfoGroup>
              <S.InfoLabel>Email:</S.InfoLabel>
              <S.InfoValue>{user.email}</S.InfoValue>
            </S.InfoGroup>
          </S.InfoSection>
        </S.ProfileContent>
      </S.ProfileSection>

      <PasswordForm
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        isLoading={isLoading}
        onSubmit={onSubmitPassword}
      />
    </S.AccountContainer>
  );
};
