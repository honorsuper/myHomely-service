import {
  Column,
  CreateDateColumn,
  Entity,
  // JoinTable,
  // ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
    unique: true,
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    name: 'nick_name',
    length: 50,
    comment: '昵称',
  })
  nickName: string;

  @Column({
    comment: '邮箱',
    length: 50,
  })
  email: string;

  @Column({
    comment: '是否首次进入',
    default: true,
  })
  isFirst: boolean;

  @Column({
    comment: '是否冻结',
    default: false,
  })
  isFrozen: boolean;

  @Column({
    comment: '颜色配置',
    type: 'longtext',
  })
  colorConfig: string;
  // 1、当前页面打开，2、新开一个tab
  @Column({
    comment: '点击类型',
    default: '1',
  })
  clickType: string;
  // 1、背白背景 2、图片背景
  @Column({
    comment: '背景类型',
    default: '2',
  })
  bgType: string;

  @Column({
    comment: '黑白背景',
    default: 'LIGHT',
  })
  commonBgType: string;

  @Column({
    comment: '图片背景',
    default: '1',
  })
  pictureBgType: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
