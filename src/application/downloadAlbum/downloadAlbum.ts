import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumDownloader } from '@/domain/ports/IAlbumDownloader';

export const downloadAlbum = (albumDownloader: IAlbumDownloader) => {
  return async (album: IAlbum): Promise<void> => {
    await albumDownloader.download(album);
  };
};
