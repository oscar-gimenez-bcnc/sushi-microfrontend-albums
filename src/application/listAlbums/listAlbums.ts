import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumRepository } from '@/domain/ports/IAlbumRepository';

export const listAlbums = (albumRepository: IAlbumRepository) => {
  return async (): Promise<IAlbum[]> => {
    return await albumRepository.list();
  };
};
