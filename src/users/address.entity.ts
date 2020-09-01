import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string
}

export default Address;
