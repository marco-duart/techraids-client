import { useState } from "react";
import { toast } from "react-hot-toast";
import { UpdatePassword, UpdatePhoto } from "../services/user";
import { IUpdatePassword } from "../services/user/DTO";
import { useAuth } from "../context/user-provider";

export const useAccount = () => {
  const { token, validateToken, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async (
    data: Omit<IUpdatePassword.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdatePassword({ ...data, token });
    if (result.success) {
      await validateToken({ token });
      toast.success("Senha atualizada com sucesso!");
      setIsLoading(false);

      return true;
    } else {
      toast.error(result.message);
      setIsLoading(false);

      return false;
    }
  };

  const updatePhoto = async (photo: File) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdatePhoto({ photo, token });
    if (result.success) {
      await validateToken({ token });
      toast.success("Foto atualizada com sucesso!");
      setIsLoading(false);

      return true;
    } else {
      toast.error(result.message);
      setIsLoading(false);

      return false;
    }
  };

  return {
    user,
    isLoading,
    updatePassword,
    updatePhoto,
  };
};
