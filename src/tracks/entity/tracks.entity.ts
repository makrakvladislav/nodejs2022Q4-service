import { AlbumEntity } from 'src/albums/entity/albums.entity';
import { ArtistEntity } from 'src/artists/entity/artists.entity';
import { ITrack } from 'src/interfaces/ITrack';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'track' })
export class TrackEntity implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @JoinColumn({
    name: 'albumId',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({
    name: 'artistId',
    referencedColumnName: 'id',
  })
  artist: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}
