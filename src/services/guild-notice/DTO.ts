export namespace IGuildNotice {
  export interface Model {
    id: number;
    title: string;
    content: string;
    priority: string;
    active: true;
    created_at: string;
    updated_at: string;
    author_id: number;
    guild_id: number;
  }
}

export namespace IGetGuildNotices {
  export type Params = {
    token: string;
  };
  export type Response = Array<IGuildNotice.Model>;
}

export namespace ICreateGuildNotice {
  export type Params = {
    token: string;
    guild: {
      title: string;
      content: string;
      priority: string;
      active: number;
    };
  };
  export type Response = {};
}

export namespace IUpdateGuildNotice {
  export type Params = {
    token: string;
    id: number;
    guild_notice: {
      title?: string;
      content?: string;
      priority?: string;
      active?: number;
    };
  };
  export type Response = {};
}

export namespace IDeleteGuildNotice {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}
