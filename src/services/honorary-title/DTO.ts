export namespace IHonoraryTitle {
  export interface Model {
    id: number;
    title: string;
    slogan: string;
    created_at: string;
    updated_at: string;
    character_id: number;
    narrator_id: number;
  }
}

export namespace ISwitchActiveTitle {
  export type Params = {
    token: string;
    honorary_title_id: number;
  };
  export type Response = { success: boolean; error?: string };
}