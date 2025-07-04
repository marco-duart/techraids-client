export namespace IMission {
  export enum Status {
    PENDING = "pending",
    APPROVED = "approved",
    CHARACTER = "rejected",
  }
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
      status: number;
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
      status?: number;
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

export namespace IGetMissions {
  export type Params = {
    token: string;
  };
  export type Response = Array<IMission.Model>;
}
