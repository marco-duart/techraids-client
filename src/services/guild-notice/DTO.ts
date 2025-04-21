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
