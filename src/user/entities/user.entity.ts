import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataTypeDefaults } from 'typeorm/driver/types/DataTypeDefaults';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phone_number: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
