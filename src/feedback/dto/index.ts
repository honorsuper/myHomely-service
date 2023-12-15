import { IsNotEmpty, MaxLength } from 'class-validator';

export class AddFeedBackDto {
  @IsNotEmpty({
    message: '留言不能为空',
  })
  @MaxLength(500, {
    message: '不能超过500位',
  })
  opinion: string;
}
