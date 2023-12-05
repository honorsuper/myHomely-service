import { Body, Controller, Get, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  AddColumnDto,
  DelColumnDto,
  EditColumnDto,
  RenameColumnDto,
} from './dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('column-info')
  @RequireLogin()
  async getColumnInfo(@UserInfo('userId') userId: number) {
    return await this.menuService.getColumnInfo(userId);
  }

  @Post('add-column')
  @RequireLogin()
  async addColumn(
    @UserInfo('userId') userId: number,
    @Body() columnInfo: AddColumnDto,
  ) {
    return await this.menuService.addColumn(userId, columnInfo);
  }

  @Post('edit-column')
  @RequireLogin()
  async editColumn(
    @UserInfo('userId') userId: number,
    @Body() itemInfo: EditColumnDto,
  ) {
    return await this.menuService.editColumn(userId, itemInfo);
  }

  @Post('rename')
  @RequireLogin()
  async menuRename(
    @UserInfo('userId') userId: number,
    @Body() data: RenameColumnDto,
  ) {
    return await this.menuService.rename(userId, data);
  }

  @Post('del-column')
  @RequireLogin()
  async delColumn(
    @UserInfo('userId') userId: number,
    @Body() data: DelColumnDto,
  ) {
    return await this.menuService.delColumn(userId, data);
  }
}
