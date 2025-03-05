export namespace IChapter {
  export interface Model {
    id: number;
    title: string;
    description: string;
    required_experience: number;
    created_at: string;
    updated_at: string;
    quest_id: number;
  }
}

export namespace ICreateChapter {
  export type Params = {
    chapter: {
      title: string;
      description: string;
      required_experience: number;
      quest_id: number;
    };
  };
  export type Response = IChapter.Model;
}

export namespace IUpdateChapter {
  export type Params = {
    id: number;
    chapter: {
      title?: string;
      description?: string;
      required_experience?: number;
      quest_id?: number;
    };
  };
  export type Response = IChapter.Model;
}

export namespace IDeleteChapter {
  export type Params = {
    id: number;
  };
  export type Response = {};
}

export namespace IGetChapter {
  export type Params = {
    id: number;
  };
  export type Response = IChapter.Model;
}

export namespace IGetChapters {
  export type Params = {};
  export type Response = Array<IChapter.Model>;
}
