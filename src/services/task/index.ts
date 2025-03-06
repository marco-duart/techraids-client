import { isAxiosError } from "axios";
import api from "../api";
import {
  ICreateTask,
  IDeleteTask,
  IGetTask,
  IGetTasks,
  IUpdateTask,
} from "./DTO";

export const CreateTask = async (params: ICreateTask.Params) => {
  try {
    const { token, ...data } = params;

    const response = await api.post<ICreateTask.Response>("/tasks", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Tarefa criada com sucesso!",
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

export const UpdateTask = async (params: IUpdateTask.Params) => {
  try {
    const { token, id, ...data } = params;

    const response = await api.put<IUpdateTask.Response>(`/tasks/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Tarefa atualizada com sucesso!",
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

export const DeleteTask = async (params: IDeleteTask.Params) => {
  try {
    const { token, id } = params;

    await api.delete<IDeleteTask.Response>(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Tarefa deletada com sucesso!",
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

export const GetTask = async (params: IGetTask.Params) => {
  try {
    const { token, id } = params;

    const response = await api.get<IGetTask.Response>(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Tarefa recuperada com sucesso!",
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

export const GetTasks = async (params: IGetTasks.Params) => {
  try {
    const { token } = params;

    const response = await api.get<IGetTasks.Response>("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: "Tarefas recuperadas com sucesso!",
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
