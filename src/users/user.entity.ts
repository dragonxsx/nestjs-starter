import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Address from './address.entity';
import Post from '../posts/post.entity';
import PublicFile from '../files/publicFile.entity';
import PrivateFile from '../privateFiles/privateFile.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  @Expose()
  public id?: number;

  @Column({ unique: true })
  @Expose()
  public email: string;

  @Column()
  @Expose()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];

  @OneToOne(
    () => PublicFile,
    {
      eager: true,
      nullable: true,
    },
  )
  @JoinColumn()
  public avatar?: PublicFile;

  @OneToMany(
    () => PrivateFile,
    (file: PrivateFile) => file.owner,
  )
  public files?: PrivateFile[];

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;
}

export default User;
