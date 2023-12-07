interface UserInfo {
  id: number;

  username: string;

  nickName: string;

  email: string;

  isFrozen: boolean;

  createTime: number;

  colorConfig: string;
}
export class LoginUserVo {
  userInfo: UserInfo;

  accessToken: string;

  refreshToken: string;
}
