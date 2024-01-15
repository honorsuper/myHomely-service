import { IsNotEmpty } from 'class-validator';

export class UpdateBasicInfoDto {
  @IsNotEmpty({
    message: '点击菜单操作类型不能为空',
  })
  clickType: string;

  @IsNotEmpty({
    message: '背景类型不能为空',
  })
  bgType: string;

  pictureBgType?: string;
}
