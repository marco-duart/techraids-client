import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateCharacterClass,
  IDeleteCharacterClass,
  IGetCharacterClass,
  IGetCharacterClasses,
  IUpdateCharacterClass,
} from "./DTO";

export const CreateCharacterClass = async (
  params: ICreateCharacterClass.Params
) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateCharacterClass.Response>(
      "/character_classes",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Classe de personagem criada com sucesso!",
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};

export const UpdateCharacterClass = async (
  params: IUpdateCharacterClass.Params
) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateCharacterClass.Response>(
      `/character_classes/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Classe de personagem atualizada com sucesso!",
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};

export const DeleteCharacterClass = async (
  params: IDeleteCharacterClass.Params
) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteCharacterClass.Response>(
      `/character_classes/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Classe de personagem deletada com sucesso!",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};

export const GetCharacterClass = async (params: IGetCharacterClass.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetCharacterClass.Response>(
      `/character_classes/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Classe de personagem recuperada com sucesso!",
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};

export const GetCharacterClasses = async (
  params: IGetCharacterClasses.Params
) => {
  try {
    const { token } = params;

    const response = await api.get<IGetCharacterClasses.Response>(
      "/character_classes",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Classes de personagem recuperadas com sucesso!",
      data: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Erro na requisição:", error);

      return {
        success: false,
        message: error.message,
        code: error.response?.status || 500,
      };
    }

    console.error("Erro desconhecido:", error);

    return {
      success: false,
      message: "Erro desconhecido!",
      code: 500,
    };
  }
};
