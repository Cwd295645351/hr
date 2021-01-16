<!--
 * @Description: 后台功能md
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-26 15:59:44
 * @LastEditors: Chen
 * @LastEditTime: 2021-01-17 00:24:10
-->

# hr 管理系统后台

本系统后台使用`koa2`框架，数据库使用`mongodb`，进程守护使用`pm2`

## koa2 框架

1. 全局安装`koa2`脚手架

```js
npm install koa-generator -g
```

2. 使用`koa2`初始化模板

```js
Koa2 项目名称
```

3. 运行代码

```js
npm install & npm run dev
```

4. 安装环境参数 cross-env

```js
npm i cross-env --save-dev
```

5. 使用`import`步骤：
在package中的`script`中的`dev`和`start`后面添加`--exec babel-node`
加载依赖`babel-preset-es2015`和`babel-cli`
创建文件`babelrc`，文件内容如下：
  ```js
  {
      "presets":["es2015"]
  }
  ```

##

## 鉴权
前后端鉴权有两种方式，一种是`session-cookie`鉴权，保存到redis中，另一种是token鉴权。

#### 1. 基于`koa-generic-session`和`koa-redis`实现登录

```js
npm i koa-generic-session koa-redis redis --save
```

引用`session`

```js
const session = require("koa-generic-session");
const redisStore = require("koa-redis");

app.keys = ["dsafasfas$@!6"];
app.use(
	session({
		// 配置 cookie
		cookie: {
			path: "/",
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		},
		// 配置 redis
		store: redisStore({
			all: "127.0.0.1:6379", // redis的地址
		}),
	})
);
```

访问`session`方法：

```js
ctx.session.count;
```
### 2. token鉴权

`koa2`中实现鉴权方式是使用`jsonwebtoken`插件来产生token，用`koa-jwt`插件来验证token产生`token`方法：
```js
const jwt = require('jsonwebtoken');

router.post('/login', async (ctx) => {
    const data = ctx.request.body;
    const result = await User.findOne({
        username: data.username,
        password: data.password
    })
    if(result !== null){
        const token = jwt.sign({
            username: result.username,
            _id: result._id
        }, 'admin', { expiresIn: '2h' });
        return ctx.body = {
            code: 200,
            token: token,
            msg: '登录成功'
        }
    }else{
        return ctx.body = {
            code: 400,
            token: null,
            msg: '用户名或密码错误'
        }
    }
});
```
  验证`token`方法：
```js
const koajwt = require('koa-jwt');

// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
      		ctx.body = 'Protected resource, use Authorization header to get access\n';
        }else{
            throw err;
        }
    })
})

app.use(koajwt({
	secret: 'my_token'
}).unless({
	path: [/\/user\/login/]
}));
/*
  通过 app.use 来调用该中间件，并传入密钥 {secret: 'my_token'}
  unless 可以指定哪些 URL 不需要进行 token 验证。
  token 验证失败的时候会抛出401错误，因此需要添加错误处理，而且要放在 app.use(koajwt()) 之前，否则不执行。
  如果请求时没有token或者token过期，则会返回401。
*/
```
本项目使用token方式进行鉴权

## 安全性防范

-   安装`xss`插件

```js
npm i xss --save
```

-   使用`md5` 对密码进行加密

```js
const crypto = require("crypto");

// 密匙
const SECRET_KEY = "fasbq_46456#";

// md5 加密
function md5(content) {
	let md5 = crypto.createHash("md5");
	return md5.update(content).digest("hex");
}

// 加密函数
function genPassword(password) {
	const str = `password=${password}&key=${SECRET_KEY}`;
	return md5(str);
}

module.exports = {
	genPassword,
};
```
- 使用JWT生成token令牌验证用户

## 记录日志

-   `access log` 记录，使用`morgan`

```js
npm i koa-morgan --save

const path = require("path");
const fs = require("fs");
const morgan = require("koa-morgan")


const ENV = process.env.NODE_ENV;
if (ENV != "production") {
  // 开发环境 / 测试环境
  app.use(
    morgan("dev", {
      stream: process.stdout,
    })
  );
} else {
  // 线上环境
  const logFileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a",
  });
  app.use(
    morgan("combined", {
      stream: writeStream,
    })
  );
}
```

-   动态拼接查询条件

```js
const whererOpt = {};
if (keyword) whereOpt.keyword = new RegExp(keyword);
const list = await Blog.find(whereOpt).sort({ _id: -1 });
```

## 打包上线
将vue打包后的文件放到`public`文件夹下即可

## 跨域处理
安装库 koa2-cors
```js
  npm i koa2-cors --save

  const cors = require('koa2-cors');
 
  app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            if (ctx.url === '/test') {
                return '*'; // 允许来自所有域名请求
            }
            return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
```

## 下一个版本功能点
1. 下个版本引入权限管理，对不同用户分配不同的权限
2. 文件管理
3. 面试者录用后背景颜色变化
4. 面试情况表添加入职时间
