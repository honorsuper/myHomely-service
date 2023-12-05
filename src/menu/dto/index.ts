import { IsNotEmpty, MaxLength } from 'class-validator';

export class AddColumnDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  mainTitle: number;
  @IsNotEmpty({
    message: '不能为空',
  })
  list: object;
}

export class RenameColumnDto {
  @IsNotEmpty({
    message: '不能为空',
  })
  @MaxLength(20, {
    message: '不能超过20位',
  })
  mainTitle: string;
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
}

export class EditColumnDto {
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
  @IsNotEmpty({
    message: '标题不能为空',
  })
  mainTitle: number;
  @IsNotEmpty({
    message: '不能为空',
  })
  list: object;
}

export class DelColumnDto {
  @IsNotEmpty({
    message: 'id不能为空',
  })
  id: number;
}

export class SortColumnDto {
  @IsNotEmpty({
    message: '原始位置不能为空',
  })
  fromIndex: number;
  @IsNotEmpty({
    message: '终点位置不能为空',
  })
  toIndex: number;
}
