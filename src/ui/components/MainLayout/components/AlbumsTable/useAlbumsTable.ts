import { GlobalContext } from '@/ui/contexts/GlobalContext';
import { type IHookResponse } from '@/ui/shared/types/types';
import { useContext, useEffect } from 'react';
import { AlbumsTableContext } from './contexts/AlbumsTableContext';
import { listAlbums } from '@/application/listAlbums/listAlbums';
import { type IAlbumRepository } from '@/domain/ports/IAlbumRepository';
import { createApiAlbumRepository } from '@/infrastructure/dataSource/ApiAlbumRepository';
import { createBrokenRepository } from '@/infrastructure/dataSource/BrokenRepository';
import { createEmptyAlbumRepository } from '@/infrastructure/dataSource/EmptyRepository';
import { createHardcodedAlbumRepository } from '@/infrastructure/dataSource/HardcodedAlbumRepository';
import { DataSources } from '@/ui/shared/enums/enums';
import { createApiAlbumWithCacheRepository } from '@/infrastructure/dataSource/ApiAlbumWithCacheRepository';

const useAlbumsTable = (): IHookResponse => {
  const { dataSource, isCacheEnabled, cacheActions } = useContext(GlobalContext);
  const { isLoading, albums, errorMessage, setErrorMessage, setAlbums, setIsLoading } = useContext(AlbumsTableContext);

  useEffect(() => {
    const dataFetcher = async (): Promise<void> => {
      setErrorMessage(undefined);

      try {
        const albumRepositoryMap: { [key in DataSources]: () => IAlbumRepository } = {
          [DataSources.EXTERNAL]:
            isCacheEnabled && cacheActions !== undefined
              ? () => createApiAlbumWithCacheRepository({ cacheActions })
              : createApiAlbumRepository,
          [DataSources.INTERNAL]: createHardcodedAlbumRepository,
          [DataSources.EMPTY]: createEmptyAlbumRepository,
          [DataSources.BROKEN]: createBrokenRepository
        };

        const albumRepository = albumRepositoryMap[dataSource as DataSources]();

        const albumsFetched = await listAlbums(albumRepository)();
        setAlbums(albumsFetched);
      } catch (err) {
        setAlbums([]);
        const message = err instanceof Error ? err.message : 'No information provided.';
        setErrorMessage(`Oops! We have difficulties to show this data. ${message}`);
      } finally {
        setIsLoading(false);
      }
    };
    void dataFetcher();
  }, [dataSource, errorMessage]);

  return {
    states: { albums, errorMessage, isLoading }
  };
};

export default useAlbumsTable;
