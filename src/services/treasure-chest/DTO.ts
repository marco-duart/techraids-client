export namespace ITreasureChest {
  export interface Model {
    id: number;
    title: string;
    value: number;
    active: true;
    created_at: string;
    updated_at: string;
    guild_id: number;
  }
}

export namespace ICreateTreasureChest {
  export type Params = {
    token: string;
    treasure_chest: {
      title: string;
      value: number;
      active: boolean;
    };
  };
  export type Response = ITreasureChest.Model;
}

export namespace IGetTreasureChests {
  export type Params = {
    token: string;
  };
  export type Response = ITreasureChest.Model[];
}

export namespace IDeactivateTreasureChest {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = ITreasureChest.Model;
}

export namespace IActivateTreasureChest {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = ITreasureChest.Model;
}
