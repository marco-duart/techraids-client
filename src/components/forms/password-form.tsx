import { Controller } from "react-hook-form";
import { PasswordFormData } from "../../schemas/password-schema";
import { LockPassword } from "@styled-icons/remix-fill";
import * as S from "./styles";

interface Props {
  control: any;
  handleSubmit: any;
  errors: any;
  isLoading: boolean;
  onSubmit: (data: PasswordFormData) => Promise<void>;
}

export const PasswordForm = ({
  control,
  handleSubmit,
  errors,
  isLoading,
  onSubmit,
}: Props) => {
  return (
    <S.PasswordSection>
      <S.PasswordHeader>
        <S.PasswordTitle>
          <LockPassword size={24} />
          <span>Alterar Senha</span>
        </S.PasswordTitle>
      </S.PasswordHeader>

      <S.PasswordForm onSubmit={handleSubmit(onSubmit)}>
        <S.FormGroup>
          <S.FormLabel>Senha Atual:</S.FormLabel>
          <Controller
            name="current_password"
            control={control}
            render={({ field }) => (
              <S.FormInput
                {...field}
                type="password"
                placeholder="Sua senha atual"
              />
            )}
          />
          {errors.current_password && (
            <S.PasswordErrorMessage>
              {errors.current_password.message}
            </S.PasswordErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <S.FormLabel>Nova Senha:</S.FormLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <S.FormInput
                {...field}
                type="password"
                placeholder="Nova senha"
              />
            )}
          />
          {errors.password && (
            <S.PasswordErrorMessage>
              {errors.password.message}
            </S.PasswordErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <S.FormLabel>Confirmar Senha:</S.FormLabel>
          <Controller
            name="password_confirmation"
            control={control}
            render={({ field }) => (
              <S.FormInput
                {...field}
                type="password"
                placeholder="Confirme a nova senha"
              />
            )}
          />
          {errors.password_confirmation && (
            <S.PasswordErrorMessage>
              {errors.password_confirmation.message}
            </S.PasswordErrorMessage>
          )}
        </S.FormGroup>

        <S.FormActions>
          <S.PasswordSubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Atualizando..." : "Atualizar Senha"}
          </S.PasswordSubmitButton>
        </S.FormActions>
      </S.PasswordForm>
    </S.PasswordSection>
  );
};
