import { type IAlbum } from '@/domain/models/IAlbum';
import { type IAlbumRepository } from '@/domain/ports/IAlbumRepository';

export const createHardcodedAlbumRepository = (): IAlbumRepository => {
  const list = async (): Promise<IAlbum[]> => {
    return [
      {
        userId: 1,
        id: 1,
        title: 'How to cook sushi'
      },
      {
        userId: 1,
        id: 2,
        title: 'Japanese kitchen for all'
      }
    ];
  };

  return { list };
};
