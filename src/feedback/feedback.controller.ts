import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { AddFeedBackDto } from './dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('add-opinion')
  @RequireLogin()
  async addColumn(
    @UserInfo('userId') userId: number,
    @Body() addFeedBackDto: AddFeedBackDto,
  ) {
    return await this.feedbackService.addOpinion(userId, addFeedBackDto);
  }
}
