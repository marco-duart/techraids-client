export namespace ICharacterTreasureChest {
  export interface Model {
    id: number,
    reward_claimed: boolean,
    created_at: string,
    updated_at: string,
    character_id: number,
    treasure_chest_id: number,
    reward_id: number
  }
}
