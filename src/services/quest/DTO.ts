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
    id: number;
  };
  export type Response = {};
}

export namespace IGetQuest {
  export type Params = {
    id: number;
  };
  export type Response = IQuest.Model;
}

export namespace IGetQuests {
  export type Params = {};
  export type Response = Array<IQuest.Model>;
}
