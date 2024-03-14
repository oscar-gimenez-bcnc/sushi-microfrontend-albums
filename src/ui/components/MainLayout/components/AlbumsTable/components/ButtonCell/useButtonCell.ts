import { type IAlbum } from '@/domain/models/IAlbum';
import { type IHookResponse } from '@/ui/shared/types/types';

const useButtonCell = (): IHookResponse => {
  const handleSendNotification = async (album: IAlbum): Promise<void> => {
    console.log(`Hi send notification from ${album.id}`);
    const event = new CustomEvent('albumNotificationCustomEvent', { detail: { album } });
    window.dispatchEvent(event);
  };

  const handleSendNotificationEventEmitter = async (album: IAlbum): Promise<void> => {
    console.log(`Hi send notification EventEmitter from ${album.id}`);
    if (!window.eventBus) return;
    const eventBus = window.eventBus;
    eventBus.emit('albumNotificationEventEmitter', { album });
  };

  return {
    actions: { handleSendNotification, handleSendNotificationEventEmitter }
  };
};

export default useButtonCell;
