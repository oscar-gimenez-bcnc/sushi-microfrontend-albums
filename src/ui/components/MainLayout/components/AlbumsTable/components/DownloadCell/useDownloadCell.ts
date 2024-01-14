import { downloadAlbum } from '@/application/downloadAlbum/downloadAlbum';
import { type IAlbum } from '@/domain/models/IAlbum';
import { createCsvAlbumDownloader } from '@/infrastructure/dataDownload/CsvAlbumDownloader';
import { createJsonAlbumDownloader } from '@/infrastructure/dataDownload/JsonAlbumDownloader';
import { GlobalContext } from '@/ui/contexts/GlobalContext';
import { DownloadMethods } from '@/ui/shared/enums/enums';
import { type IHookResponse } from '@/ui/shared/types/types';
import { useContext } from 'react';

const useDownloadCell = (): IHookResponse => {
  const { downloadMethod } = useContext(GlobalContext);

  const handleDownloadClick = async (album: IAlbum): Promise<void> => {
    const albumDownloader =
      downloadMethod === DownloadMethods.JSON ? createJsonAlbumDownloader() : createCsvAlbumDownloader();
    await downloadAlbum(albumDownloader)(album);
  };

  return {
    actions: { handleDownloadClick }
  };
};

export default useDownloadCell;
