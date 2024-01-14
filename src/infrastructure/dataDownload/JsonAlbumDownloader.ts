import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumDownloader } from '@/domain/ports/IAlbumDownloader';
import { type DownloadFileProps, downloadFile } from './helper';

export const createJsonAlbumDownloader = (): IAlbumDownloader => {
  const convertAlbumToJson = (album: IAlbum): string => {
    const jsonContent = JSON.stringify(album, null, 2);
    return jsonContent;
  };

  const download = async (album: IAlbum): Promise<void> => {
    const jsonContent = convertAlbumToJson(album);
    const options: DownloadFileProps = { id: album.id, content: jsonContent, extension: 'json' };
    await downloadFile(options);
  };

  return { download };
};
