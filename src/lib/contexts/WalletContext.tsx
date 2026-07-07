"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

export type ChainType = "Ethereum" | "Solana" | "Polygon";

export interface Wallet {
  id: string;
  address: string;
  chain: ChainType;
  isDefault: boolean;
}

interface WalletContextType {
  wallets: Wallet[];
  addWallet: (address: string, chain: ChainType) => void;
  removeWallet: (id: string) => void;
  setDefaultWallet: (id: string, chain: ChainType) => void;
  getDefaultWallet: (chain: ChainType) => Wallet | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallets, setWallets] = useState<Wallet[]>([]);

  // Load initial mock data
  useEffect(() => {
    setWallets([
      { id: "1", address: "0x1234...abcd", chain: "Ethereum", isDefault: true },
      { id: "2", address: "5Hq1...9kZp", chain: "Solana", isDefault: true }
    ]);
  }, []);

  const addWallet = (address: string, chain: ChainType) => {
    setWallets(prev => {
      const hasChainWallets = prev.some(w => w.chain === chain);
      return [
        ...prev,
        {
          id: Math.random().toString(36).substring(7),
          address,
          chain,
          isDefault: !hasChainWallets // Make default if it's the first for this chain
        }
      ];
    });
  };

  const removeWallet = (id: string) => {
    setWallets(prev => prev.filter(w => w.id !== id));
  };

  const setDefaultWallet = (id: string, chain: ChainType) => {
    setWallets(prev => prev.map(w => {
      if (w.chain !== chain) return w;
      return { ...w, isDefault: w.id === id };
    }));
  };

  const getDefaultWallet = (chain: ChainType) => {
    return wallets.find(w => w.chain === chain && w.isDefault);
  };

  return (
    <WalletContext.Provider value={{ wallets, addWallet, removeWallet, setDefaultWallet, getDefaultWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallets() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallets must be used within a WalletProvider');
  }
  return context;
}
