export namespace IReward {
  export enum RewardType {
    PHYSICAL = "physical_item",
    DIGITAL = "digital_content",
    INGAME = "in_game_benefit",
    EXPERIENCE = "real_life_experience",
  }
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
      reward_type: number; //physical_item 0, digital_content 1, in_game_benefit 2, real_life_experience 3
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
