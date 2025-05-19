import React, { createContext, useContext, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface ImageAssets {
  logo: ImageSourcePropType;
  splash: ImageSourcePropType;
  placeholder: ImageSourcePropType;
}

export interface IconAssets {
  home: string;
  search: string;
  profile: string;
  settings: string;
  back: string;
  close: string;
  check: string;
  add: string;
  edit: string;
  delete: string;
}

interface AssetContextValue {
  images: ImageAssets;
  icons: IconAssets;
}

const defaultImages: ImageAssets = {
  logo: require('../../assets/icon.png'),
  splash: require('../../assets/splash-icon.png'),
  placeholder: require('../../assets/adaptive-icon.png'),
};

const defaultIcons: IconAssets = {
  home: 'home',
  search: 'search',
  profile: 'person',
  settings: 'settings',
  back: 'arrow-back',
  close: 'close',
  check: 'check',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
};

const AssetContext = createContext<AssetContextValue | undefined>(undefined);

interface AssetProviderProps {
  children: ReactNode;
  images?: Partial<ImageAssets>;
  icons?: Partial<IconAssets>;
}

export const AssetProvider: React.FC<AssetProviderProps> = ({
  children,
  images = {},
  icons = {},
}) => {
  const value: AssetContextValue = {
    images: { ...defaultImages, ...images },
    icons: { ...defaultIcons, ...icons },
  };

  return <AssetContext.Provider value={value}>{children}</AssetContext.Provider>;
};

export const useAssets = (): AssetContextValue => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
