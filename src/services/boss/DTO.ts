export namespace IBoss {
  export interface Model {
    id: number;
    name: string;
    slogan: string;
    description: string;
    defeated: boolean;
    reward_claimed: boolean;
    reward_description: string;
    created_at: string;
    updated_at: string;
    chapter_id: number;
    finishing_character_id: number | null;
    image_url: string;
  }
}
