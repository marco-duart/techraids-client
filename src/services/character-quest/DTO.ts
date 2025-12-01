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
  export type FinishingCharacter = {
    id: number;
    nickname: string;
    image_url: string;
  };
}

export namespace IGetCharacterQuest {
  export type ChapterWithCharactersAndBoss = IChapter.Model & {
    boss?: IBoss.Model & {
      finishing_character?: IGuildMember.FinishingCharacter;
      team_can_defeat: boolean;
      is_finishing_hero?: boolean;
    };
    character?: IGuildMember.Model;
    guild_members?: IGuildMember.Model[];
    is_hero_chapter: boolean;
  };
  export type Params = {
    token: string;
  };
  export type Response = {
    quest: IQuest.Model;
    chapters: ChapterWithCharactersAndBoss[];
    last_task: ITask.Model;
    last_mission: IMission.Model;
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
