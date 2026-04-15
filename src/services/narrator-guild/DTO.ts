import { IUser } from "../auth/DTO";
import { IBoss } from "../boss/DTO";
import { IChapter } from "../chapter/DTO";
import { IGuildMember } from "../character-quest/DTO";
import { ICharacterTreasureChest } from "../character-treasure-chest/DTO";
import { IQuest } from "../quest/DTO";

export namespace IGetGuildMembers {
  export type Params = {
    token: string;
  };
  export type Response = IUser.Model[];
}

export namespace IGetNarratorQuest {
  export type ChapterWithCharactersAndBoss = IChapter.Model & {
    required_xp?: number;
    guild_members: IGuildMember.Model[] | null;
    boss:
      | (IBoss.Model & {
          finishing_character: IGuildMember.FinishingCharacter | null;
          team_can_defeat: boolean;
        })
      | null;
  };

  export type GuildResume = {
    total_members: number;
    average_xp: number;
    min_xp: number;
    max_xp: number;
    average_level: number;
    members_by_chapter: Array<{
      chapter_id: number | null;
      chapter_title: string;
      members_count: number;
    }>;
  };

  export type NextBossHint =
    | {
        available: false;
        message: string;
      }
    | {
        available: true;
        chapter_id: number;
        chapter_title: string;
        boss_id: number;
        boss_name: string;
        team_members_on_chapter: number;
        team_current_xp: number;
        required_xp: number;
        xp_gap: number;
        can_defeat_now: boolean;
        estimated_days_to_defeat?: number;
      };

  export type Hints = {
    analysis_window_days: number;
    task_pace: {
      approved_tasks_per_day: number;
      approved_tasks_last_window: number;
      average_xp_per_approved_task: number;
      estimated_team_xp_per_day: number;
    };
    next_boss: NextBossHint;
    pacing_scenarios: Array<{
      horizon_days: number;
      projected_approved_tasks: number;
      suggested_xp_per_task?: number;
      feasible_with_current_pace: boolean;
    }>;
    recommendations: string[];
  };

  export type Params = {
    token: string;
  };

  export type Response = {
    quest: IQuest.Model;
    guild_resume: GuildResume;
    hints: Hints;
    chapters: ChapterWithCharactersAndBoss[];
  };
}

export namespace IGetPendingRewards {
  export type Params = {
    token: string;
  };
  export type Response = {
    pending_bosses: IBoss.Model[];
    pending_chests: Array<
      ICharacterTreasureChest.Model & {
        character_name: string;
        reward_name: string;
        reward_description: string;
      }
    >;
  };
}

export namespace IDeliverRewards {
  export type Params = {
    token: string;
    boss_id?: number;
    character_treasure_chest_id?: number;
  };
  export type Response = ICharacterTreasureChest.Model | IBoss.Model;
}
