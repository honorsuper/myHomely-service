import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'menu',
})
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '用户id',
    unique: true,
  })
  userId: number;

  @Column({
    comment: '用户菜单',
    type: 'longtext',
  })
  menuConfig: string;

  @UpdateDateColumn()
  updateTime: Date;
}
