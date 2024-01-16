import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';
import { md5 } from 'src/utils';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateColorDto, UpdateUserDto } from './dto/udpate-user.dto';
import { MenuService } from 'src/menu/menu.service';
import { COLOR_LIST } from 'src/constants';
import { UpdateBasicInfoDto } from './dto/update-basic-setting.dto';
import { UpdateDarkLightDto } from './dto/update-darkLight-mode.dto';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;
  @Inject(RedisService)
  private redisService: RedisService;
  @Inject(EmailService)
  private emailService: EmailService;
  @Inject(MenuService)
  private menuService: MenuService;
  @Inject(ConfigService)
  private configService: ConfigService;

  async register(user: RegisterUserDto) {
    const captcha = await this.redisService.get(`captcha_${user.email}`);

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (user.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    });

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);
    newUser.email = user.email;
    newUser.nickName = user.nickName;
    newUser.colorConfig = JSON.stringify(COLOR_LIST);

    try {
      const res = await this.userRepository.save(newUser);
      await this.menuService.initColumn(res?.id);
      this.emailService.sendMail({
        to: this.configService.get('nodemailer_auth_user'),
        subject: '新人入驻',
        html: `<p>新人入驻，用户名：${newUser.username}，邮箱：${newUser.email}</p>`,
      });
      return '注册成功';
    } catch (e) {
      // TODO: 需要添加日志模块
      // this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: loginUserDto.username,
      },
    });

    if (!user) {
      console.log('111');
      throw new HttpException('登录异常', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== md5(loginUserDto.password)) {
      throw new HttpException('登录异常', HttpStatus.BAD_REQUEST);
    }

    const vo = new LoginUserVo();
    vo.userInfo = {
      id: user.id,
      username: user.username,
      nickName: user.nickName,
      email: user.email,
      createTime: user.createTime.getTime(),
      isFrozen: user.isFrozen,
      colorConfig: user.colorConfig,
      clickType: user.clickType,
      bgType: user.bgType,
      commonBgType: user.commonBgType,
      pictureBgType: user.pictureBgType,
    };
    return vo;
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return {
      id: user.id,
      username: user.username,
    };
  }

  async findUserDetailById(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const vo = new LoginUserVo();
    vo.userInfo = {
      id: user.id,
      username: user.username,
      nickName: user.nickName,
      email: user.email,
      createTime: user.createTime.getTime(),
      isFrozen: user.isFrozen,
      colorConfig: user.colorConfig,
      clickType: user.clickType,
      bgType: user.bgType,
      commonBgType: user.commonBgType,
      pictureBgType: user.pictureBgType,
    };
    return vo;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user?.username;
  }

  async updatePassword(userId: number, passwordDto: UpdateUserPasswordDto) {
    const captcha = await this.redisService.get(
      `update_password_captcha_${passwordDto.email}`,
    );

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (passwordDto.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      id: userId,
    });
    if (foundUser) {
      foundUser.password = md5(passwordDto.password);
    } else {
      throw new HttpException('密码修改失败', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.userRepository.save(foundUser);
      return '密码修改成功';
    } catch (e) {
      // TODO: 以后
      // this.logger.error(e, UserService);
      return '密码修改失败';
    }
  }

  async forgetPassword(passwordDto: UpdateUserPasswordDto) {
    const captcha = await this.redisService.get(
      `forget_password_captcha_${passwordDto.email}`,
    );

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (passwordDto.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      email: passwordDto.email,
    });
    if (foundUser) {
      foundUser.password = md5(passwordDto.password);
    } else {
      throw new HttpException('密码修改失败', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.userRepository.save(foundUser);
      return '密码修改成功';
    } catch (e) {
      // TODO: 以后
      // this.logger.error(e, UserService);
      return '密码修改失败';
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const captcha = await this.redisService.get(
      `update_user_captcha_${updateUserDto.email}`,
    );

    if (!captcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (updateUserDto.captcha !== captcha) {
      throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({
      id: userId,
    });

    if (updateUserDto.nickName) {
      foundUser.nickName = updateUserDto.nickName;
    }

    try {
      await this.userRepository.save(foundUser);
      return '用户信息修改成功';
    } catch (e) {
      // TODO
      // this.logger.error(e, UserService);
      return '用户信息修改失败';
    }
  }

  async updateColor(userId: number, updateColorDto: UpdateColorDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    user.colorConfig = JSON.stringify(updateColorDto.colorList);

    try {
      await this.userRepository.save(user);
      return '颜色配置修改成功';
    } catch (e) {
      // TODO
      // this.logger.error(e, UserService);
      return '颜色配置修改失败';
    }
  }

  async resetColor(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    user.colorConfig = JSON.stringify(COLOR_LIST);
    try {
      await this.userRepository.save(user);
      return '颜色配置重置成功';
    } catch (e) {
      // TODO
      // this.logger.error(e, UserService);
      return '颜色配置重置失败';
    }
  }

  async setFirst(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    user.isFirst = false;
    try {
      await this.userRepository.save(user);
      return '上报成功';
    } catch (e) {
      // TODO
      // this.logger.error(e, UserService);
      return '上报失败';
    }
  }

  async getIsFirst(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    return {
      isFirst: user.isFirst,
    };
  }

  async updateBasicInfo(
    userId: number,
    updateBasicInfoDto: UpdateBasicInfoDto,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.clickType = updateBasicInfoDto.clickType;
    user.bgType = updateBasicInfoDto.bgType;
    user.pictureBgType = updateBasicInfoDto?.pictureBgType ?? '1';
    try {
      await this.userRepository.save(user);
      return '基本信息修改成功';
    } catch (e) {
      // TODO
      // this.logger.error(e, UserService);
      return '基本信息修改失败';
    }
  }

  async updateDarkLightMode(
    userId: number,
    updateDarkLightDto: UpdateDarkLightDto,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    user.commonBgType = updateDarkLightDto.commonBgType;
    try {
      await this.userRepository.save(user);
      return '修改成功';
    } catch (e) {
      // TODO
      // this.logger.error(e, UserService);
      return '修改失败';
    }
  }
}
