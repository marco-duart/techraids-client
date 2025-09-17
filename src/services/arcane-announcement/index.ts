import { isAxiosError } from "axios";
import api from "../api";
import { IGetArcaneAnnouncements, ICreateArcaneAnnouncement, IDeleteArcaneAnnouncement, IUpdateArcaneAnnouncement } from "./DTO";

export const GetArcaneAnnouncements = async (
  params: IGetArcaneAnnouncements.Params
) => {
  try {
    const { token } = params;

    const response = await api.get<IGetArcaneAnnouncements.Response>(
      "/arcane_announcements",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Anúncios Arcanos recuperadas com sucesso!",
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

export const CreateArcaneAnnouncement = async (params: ICreateArcaneAnnouncement.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateArcaneAnnouncement.Response>(
      "/arcane_announcements",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Anúncio Arcano criado com sucesso!",
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

export const UpdateArcaneAnnouncement = async (params: IUpdateArcaneAnnouncement.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateArcaneAnnouncement.Response>(
      `/arcane_announcements/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Anúncio Arcano atualizado com sucesso!",
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

export const DeleteArcaneAnnouncement = async (params: IDeleteArcaneAnnouncement.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteArcaneAnnouncement.Response>(`/arcane_announcements/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Anúncio Arcano deletado com sucesso!",
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
