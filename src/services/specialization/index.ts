import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateSpecialization,
  IDeleteSpecialization,
  IGetSpecialization,
  IGetSpecializations,
  IUpdateSpecialization,
  ISelectSpecialization,
} from "./DTO";

export const SelectSpecialization = async (
  params: ISelectSpecialization.Params
) => {
  try {
    const { token, ...data } = params;

    await api.patch<ISelectSpecialization.Response>(
      `/characters/select_specialization`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Especialização de personagem trocada com sucesso!",
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

export const CreateSpecialization = async (
  params: ICreateSpecialization.Params
) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateSpecialization.Response>(
      "/specializations",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Especialização criada com sucesso!",
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

export const UpdateSpecialization = async (
  params: IUpdateSpecialization.Params
) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateSpecialization.Response>(
      `/specializations/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Especialização atualizada com sucesso!",
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

export const DeleteSpecialization = async (
  params: IDeleteSpecialization.Params
) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteSpecialization.Response>(`/specializations/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Especialização deletada com sucesso!",
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

export const GetSpecialization = async (params: IGetSpecialization.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetSpecialization.Response>(
      `/specializations/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Especialização recuperada com sucesso!",
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

export const GetSpecializations = async (
  params: IGetSpecializations.Params
) => {
  try {
    const { token } = params;

    const response = await api.get<IGetSpecializations.Response>(
      "/specializations",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Especializações recuperadas com sucesso!",
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
