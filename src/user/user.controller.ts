import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from 'src/email/email.service';
import { RedisService } from 'src/redis/redis.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateColorDto, UpdateUserDto } from './dto/udpate-user.dto';
import { CustomException } from 'src/exception/customException';
import { verifyEmail } from 'src/utils';

@Controller('user')
export class UserController {
  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
    verifyEmail(address);
    const key = `captcha_${address}`;
    const res = await this.redisService.get(key);
    if (res) {
      throw new CustomException(1, '请勿重复发送，请稍后重试');
    }

    const pre = await this.userService.findUserByEmail(address);
    if (pre) {
      throw new CustomException(1, '该邮箱已使用');
    }
    const code = Math.random().toString().slice(2, 8);
    await this.redisService.set(key, code, 1 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}，5分钟内有效</p>`,
    });
    return '发送成功';
  }

  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    const vo = await this.userService.login(loginUser);

    vo.accessToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
        username: vo.userInfo.username,
      },
      {
        expiresIn:
          this.configService.get('jwt_access_token_expires_time') || '30m',
      },
    );

    vo.refreshToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
      },
      {
        expiresIn:
          this.configService.get('jwt_refresh_token_expres_time') || '7d',
      },
    );
    return vo;
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);

      let user = null;
      try {
        console.log('111');
        user = await this.userService.findUserById(data.userId);
      } catch (err) {
        console.log('err', err);
      }

      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn:
            this.configService.get('jwt_access_token_expires_time') || '30m',
        },
      );

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn:
            this.configService.get('jwt_refresh_token_expres_time') || '7d',
        },
      );

      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @Get('info')
  @RequireLogin()
  async info(@UserInfo('userId') userId: number) {
    const vo = await this.userService.findUserDetailById(userId);
    return vo;
  }

  @Post('update_password')
  async updatePassword(@Body() passwordDto: UpdateUserPasswordDto) {
    return await this.userService.updatePassword(passwordDto);
  }

  @Get('update_password-captcha')
  async updatePasswordCaptcha(@Query('address') address: string) {
    verifyEmail(address);
    const key = `update_password_captcha_${address}`;
    const res = await this.redisService.get(key);
    if (res) {
      throw new CustomException(1, '请勿重复发送，请稍后重试');
    }
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(key, code, 1 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '更改密码验证码',
      html: `<p>你的更改密码验证码是 ${code}</p>`,
    });
    return '发送成功';
  }

  @Post('update')
  @RequireLogin()
  async update(
    @UserInfo('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }

  @Get('update-captcha')
  async updateCaptcha(@Query('address') address: string) {
    verifyEmail(address);
    const key = `update_user_captcha_${address}`;
    const res = await this.redisService.get(key);
    if (res) {
      throw new CustomException(1, '请勿重复发送，请稍后重试');
    }
    const pre = await this.userService.findUserByEmail(address);
    if (pre) {
      throw new CustomException(1, '该邮箱已使用');
    }
    const code = Math.random().toString().slice(2, 8);

    await this.redisService.set(key, code, 1 * 60);

    await this.emailService.sendMail({
      to: address,
      subject: '更改用户信息验证码',
      html: `<p>你的验证码是 ${code}</p>`,
    });
    return '发送成功';
  }

  @Post('update-color')
  @RequireLogin()
  async updateColor(
    @UserInfo('userId') userId: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return await this.userService.updateColor(userId, updateColorDto);
  }

  @Get('reset-color')
  @RequireLogin()
  async resetColor(@UserInfo('userId') userId: number) {
    return await this.userService.resetColor(userId);
  }

  @Get('set-first')
  @RequireLogin()
  async setFirst(@UserInfo('userId') userId: number) {
    return await this.userService.setFirst(userId);
  }

  @Get('is-first')
  @RequireLogin()
  async getIsFirst(@UserInfo('userId') userId: number) {
    return await this.userService.getIsFirst(userId);
  }
}
