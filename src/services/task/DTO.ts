export namespace ITask {
  export type Status = "pending" | "approved" | "rejected"
  export interface Model {
    id: number;
    title: string;
    description: string;
    status: Status;
    experience_reward: number;
    created_at: string;
    updated_at: string;
    character_id: number;
    chapter_id: number;
    narrator_id: number;
  }
}

export namespace ICreateTask {
  export type Params = {
    token: string;
    task: {
      title: string;
      description: string;
    };
  };
  export type Response = ITask.Model;
}

export namespace IUpdateTask {
  export type Params = {
    token: string;
    id: number;
    task: {
      title?: string;
      description?: string;
      status?: ITask.Status;
      experience_reward: number;
    };
  };
  export type Response = ITask.Model;
}

export namespace IDeleteTask {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}

export namespace IGetTask {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = ITask.Model;
}

export namespace IPaginationInfo {
  export interface Info {
    count: number;
    page: number;
    items: number;
    pages: number;
    last: number;
    from: number;
    to: number;
  }
}

export namespace IGetTasks {
  export interface FilterParams {
    status?: "pending" | "approved" | "rejected";
    experience_reward_min?: number;
    experience_reward_max?: number;
    character_id?: number;
    sort_by?: "status" | "experience_reward" | "created_at" | "updated_at";
    sort_direction?: "asc" | "desc";
    page?: number;
    items?: number;
  }
  export type Params = {
    token: string;
    filters?: FilterParams;
  };
  export interface Response {
    data: Array<ITask.Model>;
    pagy: IPaginationInfo.Info;
  }
}
