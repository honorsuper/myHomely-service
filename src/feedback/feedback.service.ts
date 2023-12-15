import { Injectable } from '@nestjs/common';
import { AddFeedBackDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedBack } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  @InjectRepository(FeedBack)
  private feedbackRepository: Repository<FeedBack>;

  async addOpinion(userId: number, addFeedBackDto: AddFeedBackDto) {
    const newOpinion = new FeedBack();
    newOpinion.userId = userId;
    newOpinion.opinion = addFeedBackDto.opinion;

    try {
      await this.feedbackRepository.save(newOpinion);
      return '成功';
    } catch (e) {
      // TODO: 需要添加日志模块
      // this.logger.error(e, UserService);
      return '留言失败';
    }
  }
}
