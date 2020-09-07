import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Address from './address.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  @Expose()
  public id?: number;

  @Column({unique: true})
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
    cascade: true
  })
  @JoinColumn()
  public address: Address;
}

export default User;
