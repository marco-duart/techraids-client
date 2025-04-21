import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { IArcaneAnnouncement } from "../services/arcane-announcement/DTO";
import { IGuildNotice } from "../services/guild-notice/DTO";
import { useAuth } from "../context/user-provider";
import { GetArcaneAnnouncements } from "../services/arcane-announcement";
import { GetGuildNotices } from "../services/guild-notice";

export const useJournal = () => {
  const { token, user } = useAuth();
  const [arcaneAnnouncements, setArcaneAnnouncements] = useState<IArcaneAnnouncement.Model[] | undefined>([]);
  const [guildNotices, setGuildNotices] = useState<IGuildNotice.Model[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'arcane' | 'guild'>('arcane');

  const fetchArcaneAnnouncements = async () => {
    if (!token) return;

    setIsLoading(true);
    const result = await GetArcaneAnnouncements({ token });
    if (result.success) {
      setArcaneAnnouncements(result.data);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const fetchGuildNotices = async () => {
    if (!token) return;

    setIsLoading(true);
    const result = await GetGuildNotices({ token });
    if (result.success) {
      setGuildNotices(result.data);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchArcaneAnnouncements();
    fetchGuildNotices();
  }, [token]);

  return {
    arcaneAnnouncements,
    guildNotices,
    isLoading,
    activeTab,
    setActiveTab,
    userGuildId: user?.guild.id
  };
};