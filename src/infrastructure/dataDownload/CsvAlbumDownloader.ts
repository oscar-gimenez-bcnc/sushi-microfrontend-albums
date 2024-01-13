import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumDownloader } from '@/domain/ports/IAlbumDownloader';
import { type DownloadFileProps, downloadFile } from './helper';

export function createCsvAlbumDownloader(): IAlbumDownloader {
  const convertAlbumToCsv = (album: IAlbum): string => {
    const headers = 'User ID,ID,Title';
    const row = [album.userId, album.id, album.title].map((field) => `"${field}"`).join(',');
    return `${headers}\n${row}`;
  };

  const download = async (album: IAlbum): Promise<void> => {
    const csvContent = convertAlbumToCsv(album);
    const options: DownloadFileProps = { id: album.id, content: csvContent, extension: 'csv' };
    await downloadFile(options);
  };

  return { download };
}
