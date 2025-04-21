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
