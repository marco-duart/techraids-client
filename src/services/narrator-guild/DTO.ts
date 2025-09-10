import { IUser } from "../auth/DTO";
import { IBoss } from "../boss/DTO";
import { ICharacterTreasureChest } from "../character-treasure-chest/DTO";

export namespace IGetGuildMembers {
  export type Params = {
    token: string;
  };
  export type Response = IUser.Model[];
}

export namespace IGetPendingRewards {
  export type Params = {
    token: string;
  };
  export type Response = {
    pending_bosses: IBoss.Model[];
    pending_chests: Array<
      ICharacterTreasureChest.Model & {
        character_name: string;
        reward_name: string;
        reward_description: string;
      }
    >;
  };
}

export namespace IDeliverRewards {
  export type Params = {
    token: string;
    boss_id?: number;
    character_treasure_chest_id?: number;
  };
  export type Response = ICharacterTreasureChest.Model | IBoss.Model;
}
