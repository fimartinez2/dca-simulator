import { WalletItem } from "@/interface/wallet";
import { create } from "zustand";

interface WalletStore {
  wallet: WalletItem[];
  setWallet: (wallet: WalletItem[]) => void;
}

export const useWalletStore = create<WalletStore>()((set) => ({
  wallet: [],
  setWallet: (wallet) => set({ wallet }),
}));
