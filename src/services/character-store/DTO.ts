import { IReward } from "../rewards/DTO";
import { ITreasureChest } from "../treasure_chest/DTO";

export namespace IPurchaseChest {
  export type Params = {
    token: string;
    treasure_chest_id: number;
  };
  export type Response = {
    reward: IReward.Model;
  };
}

export namespace IGetStoreItens {
  export type Params = {
    token: string;
  };
  export type Response = {
    store_items: Array<{
      chest: ITreasureChest.Model;
      possible_rewards: Array<IReward.Model>;
      rewards_count: number;
    }>;
  };
}

export namespace IGetPurchaseHistory {
  export type Params = {
    token: string;
  };
  export type Response = {
    purchase_history: [
      {
        id: number;
        purchased_at: string;
        last_updated: string;
        chest: ITreasureChest.Model;
        reward: IReward.Model;
      }
    ];
  };
}
