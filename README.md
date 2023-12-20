# myhomely
我的导航书签服务端仓库



## 项目开发

该项目使用 `Nest` 进行开发。

```sh
# 1. 克隆项目至本地
git clone https://github.com/honorsuper/myHomely-service


# 2. 跟目录新增env文件
.env
```
MYSQL_ROOT_PASSWORD=xxxxxx
TIMEZONE=Asia/Shanghai
```

.env.pro
```shell
# redis 相关配置
# redis_server_host=redis-container
redis_server_host=localhost
redis_server_port=6379

# nodemailer 相关配置
nodemailer_host=smtp.126.com
nodemailer_port=25
nodemailer_auth_user=xxxxxx@126.com
nodemailer_auth_pass=xxxxxx

# mysql 相关配置
# mysql_server_host=mysql-container
mysql_server_host=localhost
mysql_server_port=3306
mysql_server_username=root
mysql_server_password=xxxxxx
mysql_server_database=my_homely_system

# nest 服务配置
nest_server_port=3000


# jwt 配置
jwt_secret=honor
jwt_access_token_expires_time=30m
jwt_refresh_token_expres_time=7d
```


# 2. 安装项目依赖
yarn

# 3. 运行项目
yarn dev
```
最后,打开你的浏览器访问服务的地址 http://serverIP:3000 即可


## 前端
```sh
# 1. 克隆项目至本地
git clone https://github.com/honorsuper/myHomely

# 2. 安装项目依赖
pnpm i

# 3. 运行项目
pnpm run dev
```

