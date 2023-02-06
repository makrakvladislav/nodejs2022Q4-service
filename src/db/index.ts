import { IDb } from '../interfaces/IDb';

export const db: IDb = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    albums: [],
    artists: [],
    tracks: [],
  },
};
