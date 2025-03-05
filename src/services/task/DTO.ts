export namespace ITask {
  export interface Model {
    id: number;
    title: string;
    description: string;
    status: number;
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
    task: {
      title: string;
      description: string;
    };
  };
  export type Response = ITask.Model;
}

export namespace IUpdateTask {
  export type Params = {
    id: number;
    task: {
      status: number;
      experience_reward: number;
    };
  };
  export type Response = ITask.Model;
}

export namespace IDeleteTask {
  export type Params = {
    id: number;
  };
  export type Response = {};
}

export namespace IGetTask {
  export type Params = {
    id: number;
  };
  export type Response = ITask.Model;
}

export namespace IGetTasks {
  export type Params = {};
  export type Response = Array<ITask.Model>;
}
