import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateGuild,
  IDeleteGuild,
  IGetGuild,
  IGetGuilds,
  IGetPublicGuilds,
  IUpdateGuild,
} from "./DTO";

export const CreateGuild = async (params: ICreateGuild.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateGuild.Response>("/guilds", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Guilda criada com sucesso!",
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

export const UpdateGuild = async (params: IUpdateGuild.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateGuild.Response>(
      `/guilds/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Guilda atualizada com sucesso!",
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

export const DeleteGuild = async (params: IDeleteGuild.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteGuild.Response>(`/guilds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Guilda deletada com sucesso!",
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

export const GetGuild = async (params: IGetGuild.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetGuild.Response>(`/guilds/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Guilda recuperada com sucesso!",
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

export const GetGuilds = async (params: IGetGuilds.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetGuilds.Response>("/guilds", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Guildas recuperadas com sucesso!",
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

export const GetPublicGuilds = async () => {
  try {
    const response = await api.get<IGetPublicGuilds.Response>("/public/guilds");

    return {
      success: true,
      message: "Guildas recuperadas com sucesso!",
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
