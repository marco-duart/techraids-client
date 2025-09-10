import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Registration } from "../services/auth";
import { GetPublicGuilds } from "../services/guild";
import { RegistrationFormData } from "../schemas/registration-schema";
import { IGetPublicGuilds } from "../services/guild/DTO";

export const useRegistration = () => {
  const [publicGuilds, setPublicGuilds] = useState<
    IGetPublicGuilds.Response | undefined
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchPublicGuilds = async () => {
    setLoading(true);

    const result = await GetPublicGuilds();
    if (result.success) {
      setPublicGuilds(result.data);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  const registerUser = async (data: RegistrationFormData) => {
    setLoading(true);

    const result = await Registration(data);

    if (!result.success) {
      toast.error(result.message);
    }

    setLoading(false);
    return result;
  };

  useEffect(() => {
    fetchPublicGuilds();
  }, []);

  return { publicGuilds, registerUser, loading };
};
