import { IQuest } from "../quest/DTO";
import { IChapter } from "../chapter/DTO";
import { ITask } from "../task/DTO";
import { IMission } from "../mission/DTO";

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
    active_title: null;
  }
}

export namespace IGetCharacterQuest {
  export type Params = {
    token: string;
  };
  export type Response = {
    quest: IQuest.Model;
    current_chapter: IChapter.Model;
    guild_members: IGuildMember.Model[];
    last_task: ITask.Model;
    last_mission: IMission.Model;
  };
}
