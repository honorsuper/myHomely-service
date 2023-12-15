import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedBack } from './entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedBack])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
