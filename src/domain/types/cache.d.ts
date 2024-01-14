interface IAlbumsCacheData {
  expiry: Date;
  albums: Map<number, IAlbumCacheItem>;
}

interface IAlbumCacheItem {
  expiry: Date;
  data: IAlbum;
}

interface ICacheActions {
  getAlbumsCacheData: () => IAlbumsCacheData | undefined;
  renewAlbumsExpiryDate: () => void;
  getAlbumCache: (key: number) => IAlbum | undefined;
  setAlbumCache: (key: number, value: IAlbum) => void;
  clearAlbumsCache: () => void;
}
