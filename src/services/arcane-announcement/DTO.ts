export namespace IArcaneAnnouncement {
  export enum AnnouncementType {
    IT = "arcane_decree",
    MANAGER = "runic_proclamation",
    MARKETING = "lore_whisper",
  }
  export interface Model {
    id: number;
    title: string;
    content: string;
    announcement_type: AnnouncementType;
    priority: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    author_id: number;
    village_id: number;
  }
}

export namespace IGetArcaneAnnouncements {
  export type Params = {
    token: string;
  };
  export type Response = Array<IArcaneAnnouncement.Model>;
}
