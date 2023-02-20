import { IAlbum } from 'src/interfaces/IAlbum';
import { IArtist } from 'src/interfaces/IArtist';
import { IFavorites } from 'src/interfaces/IFavorites';
import { ITrack } from 'src/interfaces/ITrack';
import { IUser } from 'src/interfaces/IUser';

export interface IDb {
  users: Array<IUser>;
  artists: Array<IArtist>;
  tracks: Array<ITrack>;
  albums: Array<IAlbum>;
  favorites: IFavorites;
}
