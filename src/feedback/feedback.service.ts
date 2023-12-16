import { Inject, Injectable } from '@nestjs/common';
import { AddFeedBackDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedBack } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class FeedbackService {
  @InjectRepository(FeedBack)
  private feedbackRepository: Repository<FeedBack>;

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(UserService)
  private userService: UserService;

  async addOpinion(userId: number, addFeedBackDto: AddFeedBackDto) {
    const newOpinion = new FeedBack();
    newOpinion.userId = userId;
    newOpinion.opinion = addFeedBackDto.opinion;

    const res = await this.userService.findUserDetailById(userId);

    try {
      await this.feedbackRepository.save(newOpinion);
      this.emailService.sendMail({
        name: 'my-homely',
        to: res.userInfo.email,
        subject: '反馈',
        html: `已成功收到您的反馈，我们会尽快相应，再次感谢您对本产品的大力支持！`,
      });
      return '成功';
    } catch (e) {
      // TODO: 需要添加日志模块
      // this.logger.error(e, UserService);
      return '留言失败';
    }
  }
}
