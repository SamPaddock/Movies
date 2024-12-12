import { Share } from "react-native";
import i18next from 'i18next';

export const getTranslation = (key: string) => {
  return i18next.t(key);
};

export const convertMinutesToHours = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return `${hours}h ${remainingMinutes}min`;
};

export const getYearFromData = (text: string) => {
      const date = new Date(text);
      return date.getFullYear();
};

export const getFormattedDate = (text: string) => {
      const date = new Date(text);
      return `${date.getMonth()}/${date.getDay()}`;
};

export const shareContent = async (url: string, message: string) => {
      try {
            const result = await Share.share({
                  message: message,
                  url: url,
            });
            if (result.action === Share.sharedAction) {
                  console.log('Shared successfully');
            } else if (result.action === Share.dismissedAction) {
                  console.log('Sharing dismissed');
            }
      } catch (error) {
            console.error('Error sharing image:', error);
      }
}

