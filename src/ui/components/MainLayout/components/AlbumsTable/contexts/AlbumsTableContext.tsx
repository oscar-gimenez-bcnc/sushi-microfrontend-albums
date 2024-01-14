import { type IAlbum } from '@/domain/models/IAlbum';
import { createContext, useState } from 'react';

interface IAlbumsTableContext {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  errorMessage: string | undefined;
  setErrorMessage: (errorMessage: string | undefined) => void;
  albums: IAlbum[];
  setAlbums: (albums: IAlbum[]) => void;
}

const AlbumsTableContext = createContext<IAlbumsTableContext>({
  isLoading: false,
  setIsLoading: () => {},
  errorMessage: undefined,
  setErrorMessage: () => {},
  albums: [],
  setAlbums: () => {}
});

interface AlbumsTableProviderProps {
  children: React.ReactNode;
}

const AlbumsTableProvider: React.FC<AlbumsTableProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const contextValue = {
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    albums,
    setAlbums
  };

  return <AlbumsTableContext.Provider value={contextValue}>{children}</AlbumsTableContext.Provider>;
};

export { AlbumsTableContext, AlbumsTableProvider };
