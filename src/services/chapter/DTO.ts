export namespace IChapter {
  export interface Model {
    id: number;
    title: string;
    description: string;
    required_experience: number;
    position_x: number;
    position_y: number;
    position: number;
    created_at: string;
    updated_at: string;
    quest_id: number;
  }
}

export namespace ICreateChapter {
  export type Params = {
    token: string;
    chapter: {
      title: string;
      description: string;
      position_x: number;
      position_y: number;
      position: number;
      required_experience: number;
      quest_id: number;
    };
  };
  export type Response = IChapter.Model;
}

export namespace IUpdateChapter {
  export type Params = {
    token: string;
    id: number;
    chapter: {
      title?: string;
      description?: string;
      position_x: number;
      position_y: number;
      position?: number;
      required_experience?: number;
      quest_id?: number;
    };
  };
  export type Response = IChapter.Model;
}

export namespace IDeleteChapter {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}

export namespace IGetChapter {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = IChapter.Model;
}

export namespace IGetChapters {
  export type Params = {
    token: string;
  };
  export type Response = Array<IChapter.Model>;
}
