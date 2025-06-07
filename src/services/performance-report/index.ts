import { isAxiosError } from "axios";
import api from "../api";
import { IGetPerformanceReport } from "./DTO";

export const GetPerformanceReport = async (
  params: IGetPerformanceReport.Params
) => {
  try {
    const { token, startDate, endDate } = params;

    const response = await api.get<IGetPerformanceReport.Response>(
      "/narrators/performance_report",
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { start_date: startDate, end_date: endDate },
      }
    );

    return {
      success: true,
      message: "Relatório recuperado com sucesso!",
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
