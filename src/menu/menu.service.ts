import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import {
  AddColumnDto,
  DelColumnDto,
  EditColumnDto,
  RenameColumnDto,
  SortColumnDto,
} from './dto';
import { MENU_CONFIG } from 'src/constants';

@Injectable()
export class MenuService {
  @InjectRepository(Menu)
  private userMenuRepository: Repository<Menu>;

  async initColumn(userId: number) {
    const newMenu = new Menu();
    newMenu.userId = userId;
    newMenu.menuConfig = JSON.stringify(MENU_CONFIG);

    this.userMenuRepository.save(newMenu);
  }

  async addColumn(userId: number, columnInfo: AddColumnDto) {
    const findConfig = await this.userMenuRepository.findOneBy({
      userId,
    });

    const newMenuConfig = JSON.parse(findConfig.menuConfig);
    newMenuConfig.push({
      notes: columnInfo.notes ?? '',
      mainTitle: columnInfo.mainTitle,
      list: columnInfo.list,
      id: v4(),
    });

    findConfig.menuConfig = JSON.stringify(newMenuConfig);

    try {
      this.userMenuRepository.save(findConfig);
      return '新建成功';
    } catch (e) {
      // TODO: 以后
      // this.logger.error(e, UserService);
      return '操作失败';
    }
  }

  async editColumn(userId: number, itemInfo: EditColumnDto) {
    const findConfig = await this.userMenuRepository.findOneBy({
      userId,
    });

    const newMenuConfig = JSON.parse(findConfig.menuConfig);

    (newMenuConfig || []).forEach((item) => {
      if (item.id === itemInfo.id) {
        item.list = itemInfo.list;
        item.mainTitle = itemInfo.mainTitle;
        item.notes = itemInfo.notes ?? '';
      }
    });

    findConfig.menuConfig = JSON.stringify(newMenuConfig);

    try {
      this.userMenuRepository.save(findConfig);
      return '修改成功';
    } catch (e) {
      // TODO: 以后
      // this.logger.error(e, UserService);
      return '修改失败';
    }
  }

  async delColumn(userId: number, data: DelColumnDto) {
    const findConfig = await this.userMenuRepository.findOneBy({
      userId,
    });

    const newMenuConfig = (JSON.parse(findConfig.menuConfig) || []).filter(
      (item) => {
        return item.id !== data.id;
      },
    );

    findConfig.menuConfig = JSON.stringify(newMenuConfig);

    try {
      this.userMenuRepository.save(findConfig);
      return '删除成功';
    } catch (e) {
      // TODO: 以后
      // this.logger.error(e, UserService);
      return '删除失败';
    }
  }

  async getColumnInfo(userId: number) {
    const findConfig = await this.userMenuRepository.findOneBy({
      userId,
    });
    return findConfig;
  }

  async rename(userId: number, data: RenameColumnDto) {
    const findConfig = await this.userMenuRepository.findOneBy({
      userId,
    });
    const newMenuConfig = JSON.parse(findConfig.menuConfig);
    (newMenuConfig || []).forEach((item) => {
      if (item.id === data.id) {
        item.mainTitle = data.mainTitle;
      }
    });
    findConfig.menuConfig = JSON.stringify(newMenuConfig);

    try {
      this.userMenuRepository.save(findConfig);
      return '修改成功';
    } catch (e) {
      // TODO: 以后
      // this.logger.error(e, UserService);
      return '修改失败';
    }
  }

  async sortColumn(userId: number, data: SortColumnDto) {
    const findConfig = await this.userMenuRepository.findOneBy({
      userId,
    });
    const newMenuConfig = JSON.parse(findConfig.menuConfig);

    newMenuConfig[data.toIndex] = newMenuConfig.splice(
      data.fromIndex,
      1,
      newMenuConfig[data.toIndex],
    )[0];

    findConfig.menuConfig = JSON.stringify(newMenuConfig);

    try {
      this.userMenuRepository.save(findConfig);
      return '修改成功';
    } catch (e) {
      // TODO: 以后
      // this.logger.error(e, UserService);
      return '修改失败';
    }
  }
}
