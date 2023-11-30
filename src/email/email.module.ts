import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Global()
@Module({
  controllers: [EmailController],
  providers: [EmailService],
  // TODO: 需要研究下
  exports: [EmailService],
})
export class EmailModule {}
