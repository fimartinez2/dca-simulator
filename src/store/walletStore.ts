import { WalletItem } from "@/interface/wallet";
import { create } from "zustand";

interface GraphConfigStore {
  wallet: WalletItem[];
  setWallet: (wallet: WalletItem[]) => void;
}

export const useGraphConfig = create<GraphConfigStore>()((set) => ({
  wallet: [],
  setWallet: (wallet) => set({ wallet }),
}));
