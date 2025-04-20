export namespace IUpdatePassword {
  export interface Params {
    token: string;
    current_password: string;
    password: string;
    password_confirmation: string;
  }

  export interface Response {
    success: true;
    message: string;
  }
}

export namespace IUpdatePhoto {
  export interface Params {
    token: string;
    photo: File;
  }

  export interface Response {
    success: true;
    message: string;
    photo_url?: string;
  }
}
