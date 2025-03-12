export namespace ICharacterClass {
  export interface Model {
    id: number;
    name: string;
    slogan: string;
    required_experience: number;
    entry_fee: number;
    created_at: string;
    updated_at: string;
    specialization_id: number;
    image_url: string;
  }
}

export namespace ICreateCharacterClass {
  export type Params = {
    token: string;
    character_class: {
      name: string;
      slogan: string;
      required_experience: number;
      entry_fee: number;
      specialization_id: number;
    };
  };
  export type Response = ICharacterClass.Model;
}

export namespace IUpdateCharacterClass {
  export type Params = {
    token: string;
    id: string;
    character_class: {
      name?: string;
      slogan?: string;
      required_experience?: number;
      entry_fee?: number;
      specialization_id?: number;
    };
  };
  export type Response = ICharacterClass.Model;
}

export namespace IDeleteCharacterClass {
  export type Params = {
    token: string;
    id: string;
  };
  export type Response = {};
}

export namespace IGetCharacterClass {
  export type Params = {
    token: string;
    id: string;
  };
  export type Response = ICharacterClass.Model;
}

export namespace IGetCharacterClasses {
  export type Params = {
    token: string;
  };
  export type Response = Array<ICharacterClass.Model>;
}
