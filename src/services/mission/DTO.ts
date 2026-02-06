export namespace IMission {
  export type Status = "pending" | "approved" | "rejected"
  export interface Model {
    id: number;
    title: string;
    description: string;
    status: Status;
    gold_reward: number;
    created_at: string;
    updated_at: string;
    character_id: number;
    chapter_id: number;
    narrator_id: number;
  }
}

export namespace ICreateMission {
  export type Params = {
    token: string;
    mission: {
      title: string;
      description: string;
      status: IMission.Status;
      gold_reward: number;
      character_id: number;
    };
  };
  export type Response = IMission.Model;
}

export namespace IUpdateMission {
  export type Params = {
    token: string;
    id: number;
    mission: {
      title?: string;
      description?: string;
      status?: IMission.Status;
      gold_reward?: number;
    };
  };
  export type Response = IMission.Model;
}

export namespace IDeleteMission {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}

export namespace IGetMission {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = IMission.Model;
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

export namespace IGetMissions {
  export interface FilterParams {
    status?: "pending" | "approved" | "rejected";
    gold_reward_min?: number;
    gold_reward_max?: number;
    character_id?: number;
    sort_by?: "status" | "gold_reward" | "created_at" | "updated_at";
    sort_direction?: "asc" | "desc";
    page?: number;
    items?: number;
  }
  export type Params = {
    token: string;
    filters?: FilterParams;
  };
  export interface Response {
    data: Array<IMission.Model>;
    pagy: IPaginationInfo.Info;
  }
}
