import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  RegistrationFormData,
} from "../../schemas/registration-schema";
import { useRegistration } from "../../hooks/use-registration";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@styled-icons/bootstrap/ArrowLeft";
import {
  FormContainer,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  SubmitButton,
  BackButton,
} from "./styles";

export const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const { registerUser, loading, error } = useRegistration();
  const navigate = useNavigate();

  const onSubmit = async (data: RegistrationFormData) => {
    const result = await registerUser(data);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <BackButton onClick={() => navigate("/")}>
        <ArrowLeft size="24" />
      </BackButton>

      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} type="email" placeholder="Digite seu email" />
          )}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password">Senha</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} type="password" placeholder="Digite sua senha" />
          )}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password_confirmation">Confirme sua senha</Label>
        <Controller
          name="password_confirmation"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Confirme sua senha"
            />
          )}
        />
        {errors.password_confirmation && (
          <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
        )}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="name">Nome Completo</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Digite seu nome completo"
            />
          )}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label htmlFor="nickname">Apelido</Label>
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Digite seu apelido" />
          )}
        />
        {errors.nickname && (
          <ErrorMessage>{errors.nickname.message}</ErrorMessage>
        )}
      </InputGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </SubmitButton>
    </FormContainer>
  );
};
