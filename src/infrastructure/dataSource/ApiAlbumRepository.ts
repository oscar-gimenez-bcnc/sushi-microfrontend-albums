import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumRepository } from '@/domain/ports/IAlbumRepository';

export const createApiAlbumRepository = (): IAlbumRepository => {
  const list = async (): Promise<IAlbum[]> => {
    const source = 'https://jsonplaceholder.typicode.com/albums';

    const res = await fetch(source);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status} obtained from ${source}.`);
    }

    const albums = await res.json();

    return albums;
  };

  return { list };
};
