import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MenuService } from 'src/menu/menu.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Menu])],
  controllers: [UserController],
  providers: [UserService, MenuService],
})
export class UserModule {}
