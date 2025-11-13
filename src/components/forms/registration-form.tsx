import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  RegistrationFormData,
} from "../../schemas/registration-schema";
import { useRegistration } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@styled-icons/bootstrap/ArrowLeft";
import * as S from "./styles";

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const { publicGuilds, registerUser, loading } = useRegistration();
  const navigate = useNavigate();

  const onSubmit = async (data: RegistrationFormData) => {
    const result = await registerUser(data);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.BackButton onClick={() => navigate("/")}>
        <ArrowLeft size="24" />
      </S.BackButton>

      <S.InputGroup>
        <S.Label htmlFor="email">Email</S.Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <S.Input {...field} type="email" placeholder="Digite seu email" />
          )}
        />
        {errors.email && (
          <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label htmlFor="password">Senha</S.Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <S.Input
              {...field}
              type="password"
              placeholder="Digite sua senha"
            />
          )}
        />
        {errors.password && (
          <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label htmlFor="password_confirmation">Confirme sua senha</S.Label>
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <S.Input
              {...field}
              type="password"
              placeholder="Confirme sua senha"
            />
          )}
        />
        {errors.password_confirmation && (
          <S.ErrorMessage>
            {errors.password_confirmation.message}
          </S.ErrorMessage>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label htmlFor="name">Nome Completo</S.Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <S.Input
              {...field}
              type="text"
              placeholder="Digite seu nome completo"
            />
          )}
        />
        {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label htmlFor="nickname">Apelido</S.Label>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <S.Input {...field} type="text" placeholder="Digite seu apelido" />
          )}
        />
        {errors.nickname && (
          <S.ErrorMessage>{errors.nickname.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label htmlFor="guild_id">Equipe</S.Label>
        <Controller
          name="guild_id"
          control={control}
          render={({ field }) => (
            <S.Select {...field}>
              <option value="">Selecione uma equipe</option>
              {publicGuilds?.map((guild) => (
                <option key={guild.id} value={guild.id}>
                  {guild.name}
                </option>
              ))}
            </S.Select>
          )}
        />
        {errors.guild_id && (
          <S.ErrorMessage>{errors.guild_id.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      <S.SubmitButton type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </S.SubmitButton>
    </S.FormContainer>
  );
};
