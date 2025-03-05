export namespace IMission {
  export interface Model {
    id: number;
    title: string;
    description: string;
    status: number;
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
    mission: {
      title: string;
      description: string;
      status: number;
      gold_reward: number;
      character_id: number;
      chapter_id: number;
    };
  };
  export type Response = IMission.Model;
}

export namespace IUpdateMission {
  export type Params = {
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
    id: number;
  };
  export type Response = {};
}

export namespace IGetMission {
  export type Params = {
    id: number;
  };
  export type Response = IMission.Model;
}

export namespace IGetMissions {
  export type Params = {};
  export type Response = Array<IMission.Model>;
}
