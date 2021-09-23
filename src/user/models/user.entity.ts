import { isHash } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'varchar' })
  given_name: string;

  @Column({ type: 'varchar' })
  family_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
