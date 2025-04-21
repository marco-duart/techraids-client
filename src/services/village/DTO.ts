export namespace IVillage {
  export enum VillageType {
    IT = "arcane_scholars",
    MANAGER = "lorekeepers",
    MARKETING = "runemasters",
    COMMERCIAL = "silver_tongues",
    EVENTS = "festbringers",
    QUALITY = "precision_crafters",
    FINANCIAL = "coinwardens",
  }
  export interface Model {
    id: number;
    name: string;
    description: string;
    village_type: VillageType;
    created_at: string;
    updated_at: string;
  }
}

export namespace ICreateVillage {
  export type Params = {
    token: string;
    village: {
      name: string;
      description: string;
    };
  };
  export type Response = IVillage.Model;
}

export namespace IUpdateVillage {
  export type Params = {
    token: string;
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
    token: string;
    id: number;
  };
  export type Response = {};
}

export namespace IGetVillage {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = IVillage.Model;
}

export namespace IGetVillages {
  export type Params = {
    token: string;
  };
  export type Response = Array<IVillage.Model>;
}
