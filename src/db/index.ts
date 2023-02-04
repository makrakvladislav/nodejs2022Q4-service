import { IDb } from './IDb';

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
