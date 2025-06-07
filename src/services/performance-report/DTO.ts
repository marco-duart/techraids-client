export namespace IGetPerformanceReport {
  export type Params = {
    startDate?: string;
    endDate?: string;
    token: string;
  };
  export type Response = {
    period: {
      start_date: string;
      end_date: string;
    };
    guild_name: string;
    report: {
      character_id: number;
      name: string;
      nickname: string;
      tasks: {
        total: number;
        approved: number;
        rejected: number;
        pending: number;
        completion_rate: number;
      };
      missions: {
        total: number;
        approved: number;
        rejected: number;
        pending: number;
        completion_rate: number;
      };
      overall_performance: number;
    }[];
  };
}
