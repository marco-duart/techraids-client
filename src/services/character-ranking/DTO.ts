export namespace IGetCharacterRanking {
  export type Params = {
    token: string;
  };
  export type Response = {
    missions_completed: [string, number][];
    tasks_completed: [string, number][];
    gold_earned: [string, number][];
    experience: [string, number][];
    bosses_killed: [string, number][];
    titles_earned: [string, number][];
  };
}
