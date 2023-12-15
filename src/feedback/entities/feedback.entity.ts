import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'feedback',
})
export class FeedBack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '用户id',
  })
  userId: number;

  @Column({
    comment: '留言',
    type: 'longtext',
  })
  opinion: string;

  @CreateDateColumn()
  createTime: Date;
}
