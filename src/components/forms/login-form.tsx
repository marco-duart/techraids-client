import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "../../schemas/login-schema";
import { useAuth } from "../../context/user-provider";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await login(data);
      setError("");
      navigate("/home");
    } catch (err) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.InputGroup>
        <S.Label htmlFor="email">Email</S.Label>
        <S.Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Digite seu email"
        />
        {errors.email && (
          <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      <S.InputGroup>
        <S.Label htmlFor="password">Senha</S.Label>
        <S.Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Digite sua senha"
        />
        {errors.password && (
          <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
        )}
      </S.InputGroup>

      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      <S.SubmitButton type="submit">Login</S.SubmitButton>
    </S.FormContainer>
  );
};
