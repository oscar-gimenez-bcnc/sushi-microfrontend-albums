import { type IAlbum } from '@/domain/models/IAlbum';
import useButtonCell from './useButtonCell';

interface ButtonCellProps {
  album: IAlbum;
}

const ButtonCell: React.FC<ButtonCellProps> = ({ album }) => {
  const {
    actions: {
      handleSendNotification,
      handleSendNotificationEventEmitter,
      handleSendNotificationEventEmitterFederated,
      handleSendNotificationRxjs
    }
  } = useButtonCell();

  return (
    <button
      aria-label="Download button"
      type="button"
      className="btn btn-ghost btn-xs bg-slate-200"
      onClick={() => {
        /* handleSendNotification(album); */
        /* handleSendNotificationEventEmitter(album); */
        /* handleSendNotificationEventEmitterFederated(album); */
        handleSendNotificationRxjs(album);
      }}
    >
      Send notification
    </button>
  );
};

export default ButtonCell;
