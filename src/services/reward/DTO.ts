export namespace IReward {
  export type RewardType =
    | "physical_item"
    | "digital_content"
    | "in_game_benefit"
    | "real_life_experience";
  export interface Model {
    id: number;
    name: string;
    description: string;
    reward_type: RewardType;
    is_limited: boolean;
    stock_quantity: number;
    created_at: string;
    updated_at: string;
    treasure_chest_id: number;
  }
}

export namespace ICreateReward {
  export type Params = {
    token: string;
    reward: {
      name: string;
      description: string;
      reward_type: IReward.RewardType;
      is_limited: boolean;
      stock_quantity: number;
      treasure_chest_id: number;
    };
  };
  export type Response = IReward.Model;
}

export namespace IGetRewards {
  export type Params = {
    token: string;
    treasure_chest_id: number;
  };
  export type Response = IReward.Model[];
}

export namespace IRestockReward {
  export type Params = {
    token: string;
    id: number;
    quantity: number;
  };
  export type Response = IReward.Model;
}

export namespace IRemoveRewardStock {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = IReward.Model;
}
