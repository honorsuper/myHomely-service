import { IsNotEmpty } from 'class-validator';

export class UpdateDarkLightDto {
  @IsNotEmpty({
    message: '类型不能为空',
  })
  commonBgType: string;
}
