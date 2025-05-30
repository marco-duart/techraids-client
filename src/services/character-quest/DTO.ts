import { IQuest } from "../quest/DTO";
import { IChapter } from "../chapter/DTO";
import { ITask } from "../task/DTO";
import { IMission } from "../mission/DTO";
import { IHonoraryTitle } from "../honorary-title/DTO";
import { IBoss } from "../boss/DTO";

export namespace IGuildMember {
  export interface Model {
    nickname: string;
    current_level: number;
    experience: number;
    character_class: {
      name: string;
      slogan: string;
      image_url: string;
    };
    current_chapter: IChapter.Model;
    active_title?: IHonoraryTitle.Model;
  }
}

export namespace IGetCharacterQuest {
  type FinishingCharacter = {
    id: number;
    nickname: string;
    image_url: string;
  };
  export type Params = {
    token: string;
  };
  export type Response = {
    quest: IQuest.Model;
    chapters: Array<
      IChapter.Model & {
        boss?: IBoss.Model & { finishing_character?: FinishingCharacter };
      }
    >;
    current_chapter: IChapter.Model;
    guild_members: IGuildMember.Model[];
    last_task: ITask.Model;
    last_mission: IMission.Model;
    current_boss:
      | (IBoss.Model & { team_can_defeat: boolean; is_finishing_hero: boolean })
      | null;
  };
}

export namespace IProgressChapter {
  export type Params = {
    token: string;
  };
  export type Response = {
    success: boolean;
    chapter: IChapter.Model | null;
  };
}

export namespace IDefeatBoss {
  export type Params = {
    token: string;
  };
  export type Response = {
    success: boolean;
  };
}
