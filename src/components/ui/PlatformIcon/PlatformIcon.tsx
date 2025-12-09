import { PlatformType } from '../../../types/types';
import { GoogleIcon, GoogleAdsIcon, VkIcon, TelegramIcon, AppLovinIcon } from '../Icons/platforms';
import './PlatformIcon.css';

interface PlatformIconProps {
  platform: PlatformType;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeMap = {
  small: 40,
  medium: 40,
  large: 40,
};

export const PlatformIcon = ({ platform, size = 'medium', className = '' }: PlatformIconProps) => {
  const iconSize = sizeMap[size];

  const getIcon = () => {
    switch (platform) {
      case 'google':
        return <GoogleIcon size={iconSize} />;
      case 'googleAds':
        return <GoogleAdsIcon size={iconSize} />;
      case 'vk':
        return <VkIcon size={iconSize} />;
      case 'telegram':
        return <TelegramIcon size={iconSize} />;
      case 'applovin':
        return <AppLovinIcon size={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <div className={`platform-icon platform-icon--${size} platform-icon--${platform} ${className}`}>
      {getIcon()}
    </div>
  );
};
