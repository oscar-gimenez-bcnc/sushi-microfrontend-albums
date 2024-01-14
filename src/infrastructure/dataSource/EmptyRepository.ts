import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumRepository } from '@/domain/ports/IAlbumRepository';

// This adapter simulates an empty data source
export const createEmptyAlbumRepository = (): IAlbumRepository => {
  const list = async (): Promise<IAlbum[]> => {
    return [];
  };

  return { list };
};
