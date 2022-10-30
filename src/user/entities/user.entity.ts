import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  firstName: string;

  @Column({ type: String, nullable: false })
  lastName: string;

  @Column({ type: String, nullable: false })
  username: string;

  @Column({ type: String, nullable: false })
  password: string;

  @Column({ type: String, nullable: false })
  email: string;

  @Column({ type: String, nullable: false })
  phoneNumber: string;

  @Column({ type: Boolean, default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    return (this.password = hashedPassword);
  }
}
