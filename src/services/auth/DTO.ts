import { IVillage } from "../village/DTO";
import { IGuild } from "../guild/DTO";
import { ICharacterClass } from "../character-class/DTO";
import { ISpecialization } from "../specialization/DTO";
export namespace IUser {
  export enum Role {
    NARRATOR = "narrator",
    CHARACTER = "character",
  }
  export interface Model {
    email: string;
    provider: string;
    uid: string;
    id: number;
    allow_password_change: boolean;
    name: string;
    nickname: string;
    role: Role;
    experience: number;
    gold: number;
    village_id: number;
    guild_id: number;
    character_class_id: number;
    specialization_id: number;
    current_chapter_id: number;
    created_at: string;
    updated_at: string;
    photo_url: string;
    current_level: number;
  }

  export type UserWithRelations = IUser.Model & {
    village: IVillage.Model;
    guild: IGuild.Model;
    character_class: ICharacterClass.Model;
    specialization: ISpecialization.Model;
  };
}

export namespace ILogin {
  export type Params = {
    email: string;
    password: string;
  };
  export type Response = {
    data: IUser.UserWithRelations;
  };
}

export namespace IRegistration {
  export type Params = {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    nickname: string;
  };
  export type Response = {
    status: string;
    data: IUser.Model;
  };
}
