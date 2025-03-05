export namespace ISpecialization {
  export interface Model {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  }
}

export namespace ICreateSpecialization {
  export type Params = {
    specialization: {
      title: string;
      description: string;
    };
  };
  export type Response = ISpecialization.Model;
}

export namespace IUpdateSpecialization {
  export type Params = {
    id: number;
    specialization: {
      title?: string;
      description?: string;
    };
  };
  export type Response = ISpecialization.Model;
}

export namespace IDeleteSpecialization {
  export type Params = {
    id: number;
  };
  export type Response = {};
}

export namespace IGetSpecialization {
  export type Params = {
    id: number;
  };
  export type Response = ISpecialization.Model;
}

export namespace IGetSpecializations {
  export type Params = {};
  export type Response = Array<ISpecialization.Model>;
}
