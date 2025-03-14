import { isAxiosError } from "axios";
import api from "../api";
import { IGetCharacterQuest } from "./DTO";

export const GetCharacterQuest = async (params: IGetCharacterQuest.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetCharacterQuest.Response>(
      "/characters/character_quest",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return {
      success: true,
      message: "Jornada recuperada com sucesso!",
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
