import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';

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

  private tempPassword: string;
  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && this.tempPassword !== this.password) {
      const salt = await genSalt(6);
      this.password = await hash(this.password, salt);
    }
  }

  compare(password: string) {
    return compare(password, this.password);
  }
}
