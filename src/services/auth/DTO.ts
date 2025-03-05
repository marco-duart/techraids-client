export namespace IUser {
  export interface Model {
    email: string;
    provider: string;
    uid: string;
    id: number;
    allow_password_change: boolean;
    name: string;
    nickname: string;
    role: string;
    experience: number;
    gold: number;
    village_id: number;
    guild_id: number;
    character_class_id: number;
    specialization_id: number;
    current_chapter_id: number;
    created_at: string;
    updated_at: string;
  }
}

export namespace ILogin {
  export type Params = {
    email: string;
    password: string;
  };
  export type Response = {
    data: IUser.Model;
  };
}

export namespace IRegistration {
  export type Params = {
    email: string;
    password: string;
    password_confirmation: string;
    full_name: string;
    nickname: string;
  };
  export type Response = {
    status: string;
    data: IUser.Model;
  };
}

