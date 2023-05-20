import * as argon2 from 'argon2';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: true })
  public depopToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  //number of requests? 
}
