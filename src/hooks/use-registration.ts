import { useState } from "react";
import { Registration } from "../services/auth";
import { RegistrationFormData } from "../schemas/registration-schema";

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (data: RegistrationFormData) => {
    setLoading(true);
    setError(null);

    const result = await Registration(data);

    if (!result.success) {
      setError(result.message);
    }

    setLoading(false);
    return result;
  };

  return { registerUser, loading, error };
};
