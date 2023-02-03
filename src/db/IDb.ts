import { IArtist } from 'src/artists/IArtist';
import { ITrack } from 'src/tracks/ITrack';
import { IUser } from 'src/users/IUser';

export interface IDb {
  users: Array<IUser>;
  artists: Array<IArtist>;
  tracks: Array<ITrack>;
}
