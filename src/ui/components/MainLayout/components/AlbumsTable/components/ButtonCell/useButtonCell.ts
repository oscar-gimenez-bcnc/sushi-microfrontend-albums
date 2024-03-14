import { type IAlbum } from '@/domain/models/IAlbum';
import { type IHookResponse } from '@/ui/shared/types/types';
import { eventEmitterNotification$ } from 'SushiMicroFrontendNotifications/EventEmitterBus';
import { eventRxJSNotification$ } from 'SushiMicroFrontendNotifications/EventRxJSBus';

const useButtonCell = (): IHookResponse => {
  const handleSendNotification = async (album: IAlbum): Promise<void> => {
    console.log(`Hi send notification from ${album.id}`);
    const event = new CustomEvent('albumNotificationCustomEvent', { detail: { text: `Album is ${album.title}` } });
    window.dispatchEvent(event);
  };

  const handleSendNotificationEventEmitter = async (album: IAlbum): Promise<void> => {
    console.log(`Hi send notification EventEmitter from ${album.id}`);
    if (!window.eventBus) return;
    const eventBus = window.eventBus;
    eventBus.emit('albumNotificationEventEmitter', { text: `Album is ${album.title}` });
  };

  const handleSendNotificationEventEmitterFederated = async (album: IAlbum): Promise<void> => {
    console.log(`Hi send notification handleSendNotificationEventEmitterFederated from ${album.id}`);
    eventEmitterNotification$.emit('albumNotificationEventEmitterFederated', { text: `Album is ${album.title}` });
    console.log(`Hi sent`);
  };

  const handleSendNotificationRxjs = async (album: IAlbum): Promise<void> => {
    console.log(`Hi send notification EventEmitter RxJS from ${album.id}`);
    eventRxJSNotification$.next({ text: `Album is ${album.title}` });
    console.log(`Hi sent`);
  };

  return {
    actions: {
      handleSendNotification,
      handleSendNotificationEventEmitter,
      handleSendNotificationEventEmitterFederated,
      handleSendNotificationRxjs
    }
  };
};

export default useButtonCell;
