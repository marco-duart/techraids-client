export namespace IBoss {
  export interface Model {
    id: number;
    name: string;
    slogan: string;
    description: string;
    defeated: boolean;
    reward_claimed: boolean;
    reward_description: string;
    created_at: string;
    updated_at: string;
    chapter_id: number;
    finishing_character_id: number | null;
    image_url: string;
  }
}

export namespace ICreateBoss {
  export type Params = {
    token: string;
    boss: {
      name: string;
      description: string;
      slogan: string;
      chapter_id: number;
      reward_description: string;
    };
  };
  export type Response = IBoss.Model;
}

export namespace IUpdateBoss {
  export type Params = {
    token: string;
    id: number;
    boss: {
      name: string;
      description: string;
      slogan: string;
      reward_description: string;
    };
  };
  export type Response = IBoss.Model;
}

export namespace IDeleteBoss {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}

export namespace IGetBoss {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = IBoss.Model;
}

export namespace IGetBosses {
  export type Params = {
    token: string;
  };
  export type Response = Array<IBoss.Model & { chapter_title: string }>;
}
