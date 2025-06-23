import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  CreateCharacterClass,
  DeleteCharacterClass,
  GetCharacterClasses,
  UpdateCharacterClass,
  SwitchCharacterClass,
} from "../services/character-class";
import {
  ICreateCharacterClass,
  IUpdateCharacterClass,
  ISwitchCharacterClass,
  ICharacterClass,
} from "../services/character-class/DTO";
import { useAuth } from "../context/user-provider";

export const useCharacterClasses = () => {
  const { token, validateToken } = useAuth();
  const [characterClasses, setCharacterClasses] = useState<
    ICharacterClass.Model[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacterClasses = async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    const result = await GetCharacterClasses({ token });
    if (result.success && result.data) {
      setCharacterClasses(result.data);
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  const switchCharacterClass = async (
    data: Omit<ISwitchCharacterClass.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await SwitchCharacterClass({ ...data, token });

    if (result.success) {
      toast.success(result.message);
      await validateToken({ token });
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
    return result.success;
  };

  const createCharacterClass = async (
    data: Omit<ICreateCharacterClass.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await CreateCharacterClass({ ...data, token });
    if (result.success) {
      await fetchCharacterClasses();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const updateCharacterClass = async (
    data: Omit<IUpdateCharacterClass.Params, "token">
  ) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await UpdateCharacterClass({ ...data, token });
    if (result.success) {
      await fetchCharacterClasses();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  const deleteCharacterClass = async (id: number) => {
    if (!token) return false;

    setIsLoading(true);
    const result = await DeleteCharacterClass({ id, token });
    if (result.success) {
      await fetchCharacterClasses();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCharacterClasses();
  }, [token]);

  return {
    characterClasses,
    isLoading,
    error,
    fetchCharacterClasses,
    createCharacterClass,
    updateCharacterClass,
    deleteCharacterClass,
    switchCharacterClass,
  };
};
