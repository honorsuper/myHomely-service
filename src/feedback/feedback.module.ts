import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedBack } from './entities/feedback.entity';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { MenuService } from 'src/menu/menu.service';
import { Menu } from 'src/menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBack, User, Menu])],
  controllers: [FeedbackController],
  providers: [FeedbackService, EmailService, UserService, MenuService],
})
export class FeedbackModule {}
