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

  @Column({ nullable: true })
  public depopId: number;

  @Column({ nullable: true, default: 0 })
  public refreshSchedule: RefreshIntervals;

  @Column({ default: 0 })
  public requests: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}

export type RefreshIntervals = 6 | 12 | 24;
