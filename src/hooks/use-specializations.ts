import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  CreateSpecialization,
  DeleteSpecialization,
  GetSpecialization,
  GetSpecializations,
  UpdateSpecialization,
  SelectSpecialization,
} from "../services/specialization";
import {
  ICreateSpecialization,
  IDeleteSpecialization,
  IGetSpecialization,
  IGetSpecializations,
  IUpdateSpecialization,
  ISelectSpecialization,
  ISpecialization,
} from "../services/specialization/DTO";
import { useAuth } from "../context/user-provider";

export const useSpecializations = () => {
  const { token, validateToken } = useAuth();
  const [specializations, setSpecializations] = useState<
    ISpecialization.Model[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpecializations = async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    const result = await GetSpecializations({ token });
    if (result.success && result.data) {
      setSpecializations(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  const selectSpecialization = async (
    data: Omit<ISelectSpecialization.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await SelectSpecialization({ ...data, token });

    if (result.success) {
      toast.success(result.message);
      await validateToken({ token });
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
    return result.success;
  };

  const createSpecialization = async (
    data: Omit<ICreateSpecialization.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateSpecialization({ ...data, token });
    if (result.success) {
      await fetchSpecializations();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const updateSpecialization = async (
    data: Omit<IUpdateSpecialization.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdateSpecialization({ ...data, token });
    if (result.success) {
      await fetchSpecializations();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deleteSpecialization = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeleteSpecialization({ id, token });
    if (result.success) {
      await fetchSpecializations();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchSpecializations();
  }, [token]);

  return {
    specializations,
    isLoading,
    error,
    fetchSpecializations,
    createSpecialization,
    updateSpecialization,
    deleteSpecialization,
    selectSpecialization,
  };
};
