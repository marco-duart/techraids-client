export namespace IGuild {
  export interface Model {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    village_id: number;
    narrator_id: number;
  }
}

export namespace ICreateGuild {
  export type Params = {
    token: string;
    guild: {
      name: string;
      description: string;
      village_id: number;
    };
  };
  export type Response = {};
}

export namespace IUpdateGuild {
  export type Params = {
    token: string;
    id: number;
    guild: {
      name?: string;
      description?: string;
      narrator_id?: string;
      village_id?: number;
    };
  };
  export type Response = {};
}

export namespace IDeleteGuild {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}

export namespace IGetGuild {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = IGuild.Model;
}

export namespace IGetGuilds {
  export type Params = {
    token: string;
  };
  export type Response = Array<IGuild.Model>;
}

export namespace IGetPublicGuilds {
  export type Params = {};
  export type Response = Array<{ id: number; name: string }>;
}
