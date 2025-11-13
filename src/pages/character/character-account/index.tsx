import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  PasswordFormData,
} from "../../../schemas/password-schema";
import { useAccount } from "../../../hooks";
import { motion } from "framer-motion";
import Cropper from "react-easy-crop";
import { Sword, Shield, Camera } from "@styled-icons/remix-fill";
import type { Area } from "react-easy-crop";
import * as S from "./styles";
import { PasswordForm } from "../../../components/forms/password-form";
import { IMAGES } from "../../../utils/constants";

export const CharacterAccountPage = () => {
  const { user, isLoading, updatePassword, updatePhoto } = useAccount();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(resolve as BlobCallback, "image/jpeg", 0.9);
    });
  };

  const handleSavePhoto = async () => {
    if (!croppedAreaPixels || !imgSrc) return;

    try {
      const blob = await getCroppedImg(imgSrc, croppedAreaPixels);
      const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
      await updatePhoto(file);
      setImgSrc("");
    } catch (error) {
      console.error("Error cropping image:", error);
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
              <S.CropWrapper>
                <S.CropContainer>
                  <Cropper
                    image={imgSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    cropShape="round"
                    showGrid={false}
                    style={{
                      containerStyle: {
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      },
                    }}
                  />
                </S.CropContainer>

                <S.ZoomControl>
                  <span>Zoom:</span>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                  />
                </S.ZoomControl>

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
              </S.CropWrapper>
            ) : (
              <>
                <S.ProfilePhoto
                  src={user.photo_url || IMAGES.userIcon}
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
