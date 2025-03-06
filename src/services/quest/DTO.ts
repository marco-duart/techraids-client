export namespace IQuest {
  export interface Model {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    guild_id: number;
  }
}

export namespace ICreateQuest {
  export type Params = {
    token: string;
    quest: {
      title: string;
      description: string;
      guild_id: number;
    };
  };
  export type Response = {};
}

export namespace IUpdateQuest {
  export type Params = {
    token: string;
    id: number;
    quest: {
      title: string;
      description: string;
      guild_id: number;
    };
  };
  export type Response = {};
}

export namespace IDeleteQuest {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}

export namespace IGetQuest {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = IQuest.Model;
}

export namespace IGetQuests {
  export type Params = {
    token: string;
  };
  export type Response = Array<IQuest.Model>;
}
