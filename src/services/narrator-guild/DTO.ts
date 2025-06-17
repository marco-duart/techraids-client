import { IUser } from "../auth/DTO";

export namespace IGetGuildMembers {
  export type Params = {
    token: string;
  };
  export type Response = IUser.Model[];
}
