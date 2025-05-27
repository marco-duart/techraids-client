import { useState } from "react";
import { toast } from "react-hot-toast";
import { SwitchActiveTitle } from "../services/honorary-title";
import { ISwitchActiveTitle } from "../services/honorary-title/DTO";
import { useAuth } from "../context/user-provider";

export const useHonoraryTitles = () => {
  const { token, validateToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const switchHonoraryTitle = async (
    data: Omit<ISwitchActiveTitle.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await SwitchActiveTitle({ ...data, token });

    if (result.success) {
      toast.success(result.message);
      await validateToken({ token });
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
    return result.success;
  };

  return {
    isLoading,
    switchHonoraryTitle,
  };
};
