interface UserInfo {
  id: number;

  username: string;

  nickName: string;

  email: string;

  isFrozen: boolean;

  createTime: number;
}
export class LoginUserVo {
  userInfo: UserInfo;

  accessToken: string;

  refreshToken: string;
}
