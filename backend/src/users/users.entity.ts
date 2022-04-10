import {AfterInsert, AfterUpdate, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @AfterInsert()
  logInsert() {
    console.log(`added user for id: ${this.id}`);
  }
}
