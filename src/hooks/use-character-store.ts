import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  GetStoreItens,
  GetPurchaseHistory,
  PurchaseChest,
} from "../services/character-store";
import {
  IGetPurchaseHistory,
  IGetStoreItens,
} from "../services/character-store/DTO";
import { useAuth } from "../context/user-provider";
import { IReward } from "../services/reward/DTO";
import { ITreasureChest } from "../services/treasure-chest/DTO";

export const useCharacterStore = () => {
  const { token, user, validateToken } = useAuth();
  const [storeItems, setStoreItems] = useState<IGetStoreItens.Response>();
  const [purchaseHistory, setPurchaseHistory] =
    useState<IGetPurchaseHistory.Response>();
  const [isLoading, setIsLoading] = useState(false);
  const [openedChest, setOpenedChest] = useState<{
    chest: ITreasureChest.Model | undefined;
    reward: IReward.Model | undefined;
  } | null>(null);

  const fetchStoreItems = async () => {
    if (!token) return false;

    setIsLoading(true);
    const result = await GetStoreItens({ token });
    if (result.success) {
      setStoreItems(result.data);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
    return result.success;
  };

  const fetchPurchaseHistory = async () => {
    if (!token) return false;

    setIsLoading(true);
    const result = await GetPurchaseHistory({ token });
    if (result.success) {
      setPurchaseHistory(result.data);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
    return result.success;
  };

  const purchaseChest = async (chestId: number) => {
    if (
      !token ||
      !user ||
      user.gold <
        (storeItems?.store_items.find((c) => c.chest.id === chestId)?.chest
          .value || 0)
    ) {
      toast.error("Ouro insuficiente para esta compra!");
      return false;
    }

    setIsLoading(true);
    const result = await PurchaseChest({ token, treasure_chest_id: chestId });
    if (result.success) {
      toast.success(result.message);
      await Promise.all([
        fetchStoreItems(),
        fetchPurchaseHistory(),
        validateToken({ token }),
      ]);
      setOpenedChest({
        chest: storeItems?.store_items.find((c) => c.chest.id === chestId)
          ?.chest!,
        reward: result.data?.reward,
      });
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
    return result.success;
  };

  useEffect(() => {
    fetchStoreItems();
    fetchPurchaseHistory();
  }, [token]);

  return {
    storeItems,
    purchaseHistory,
    openedChest,
    isLoading,
    purchaseChest,
    fetchStoreItems,
    fetchPurchaseHistory,
    closeOpenedChest: () => setOpenedChest(null),
  };
};
