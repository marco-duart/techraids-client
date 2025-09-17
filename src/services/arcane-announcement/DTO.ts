export namespace IArcaneAnnouncement {
  export type Priority = "low" | "normal" | "high" | "critical";
  export type AnnouncementType =
    | "arcane_decree"
    | "runic_proclamation"
    | "lore_whisper";
  export interface Model {
    id: number;
    title: string;
    content: string;
    announcement_type: AnnouncementType;
    priority: Priority;
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
  export type Response = Array<
    IArcaneAnnouncement.Model & { author_name: string; author_nickname: string }
  >;
}

export namespace ICreateArcaneAnnouncement {
  export type Params = {
    token: string;
    arcane_announcement: {
      title: string;
      content: string;
      priority: IArcaneAnnouncement.Priority;
      active: boolean;
    };
  };
  export type Response = {};
}

export namespace IUpdateArcaneAnnouncement {
  export type Params = {
    token: string;
    id: number;
    arcane_announcement: {
      title?: string;
      content?: string;
      priority?: IArcaneAnnouncement.Priority;
      active?: boolean;
    };
  };
  export type Response = {};
}

export namespace IDeleteArcaneAnnouncement {
  export type Params = {
    token: string;
    id: number;
  };
  export type Response = {};
}
