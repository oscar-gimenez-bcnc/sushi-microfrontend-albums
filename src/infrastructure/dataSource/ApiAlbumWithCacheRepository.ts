import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumRepository } from '@/domain/ports/IAlbumRepository';

interface createApiAlbumRepositoryProps {
  cacheActions: ICacheActions;
}

export const createApiAlbumWithCacheRepository = ({
  cacheActions
}: createApiAlbumRepositoryProps): IAlbumRepository => {
  const list = async (): Promise<IAlbum[]> => {
    const cache = cacheActions.getAlbumsCacheData();

    if (cache !== undefined) {
      if (new Date().getTime() > cache.expiry.getTime()) {
        cacheActions.clearAlbumsCache();
      } else {
        const x = Array.from(cache.albums.values());
        const cachedAlbums = x.map((albumCacheItem) => {
          return albumCacheItem.data;
        });

        console.log('Returned from cache');

        return cachedAlbums;
      }
    }

    console.log('Returned from source');
    const source = 'https://jsonplaceholder.typicode.com/albums';
    const res = await fetch(source);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status} obtained from ${source}.`);
    }

    const albums = await res.json();

    albums.forEach((album: IAlbum) => {
      cacheActions.setAlbumCache(album.id, album);
      cacheActions.renewAlbumsExpiryDate();
    });

    return albums;
  };

  return { list };
};
