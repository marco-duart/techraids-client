export namespace IVillage {
  export interface Model {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }
}

export namespace ICreateVillage {
  export type Params = {
    village: {
      name: string;
      description: string;
    };
  };
  export type Response = IVillage.Model;
}

export namespace IUpdateVillage {
  export type Params = {
    id: number;
    village: {
      name?: string;
      description?: string;
    };
  };
  export type Response = IVillage.Model;
}

export namespace IDeleteVillage {
  export type Params = {
    id: number;
  };
  export type Response = {};
}

export namespace IGetVillage {
  export type Params = {
    id: number;
  };
  export type Response = IVillage.Model;
}

export namespace IGetVillages {
  export type Params = {};
  export type Response = Array<IVillage.Model>;
}
