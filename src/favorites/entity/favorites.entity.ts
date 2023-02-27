import { Exclude } from 'class-transformer';
import { AlbumEntity } from 'src/albums/entity/albums.entity';
import { ArtistEntity } from 'src/artists/entity/artists.entity';
import { TrackEntity } from 'src/tracks/entity/tracks.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => ArtistEntity, {
    eager: true,
  })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, {
    eager: true,
  })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, {
    eager: true,
  })
  @JoinTable()
  tracks: TrackEntity[];
}
