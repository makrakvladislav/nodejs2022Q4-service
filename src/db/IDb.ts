import { IAlbum } from 'src/albums/IAlbum';
import { IArtist } from 'src/artists/IArtist';
import { IFavorites } from 'src/favorites/IFavorites';
import { ITrack } from 'src/tracks/ITrack';
import { IUser } from 'src/users/IUser';

export interface IDb {
  users: Array<IUser>;
  artists: Array<IArtist>;
  tracks: Array<ITrack>;
  albums: Array<IAlbum>;
  favorites: IFavorites;
}
