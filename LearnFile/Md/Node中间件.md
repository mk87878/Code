##Node express常用中间件
> 出自《Node与Express开发》

在 Express 4.0 之前，Express 中捆绑了 Connect，它包含了大部分常用的中间件。因为Express 的捆绑方式，看起来这些中间件就像是 Express 的一部分一样（比如你可以这样引入 body-parser： app.use(express.bodyParser) ）。这样看不出来这个中间件实际上是Connect 的一部分。到 Express 4.0，Connect 从 Express 中移除了。随着这个改变，一些Connect 中间件（比如 body-parser ）也从 Connect 中分离出来变成了独立的项目。唯一保留在 Express 中的中间件只剩下 static 了。从 Express 中剥离中间件可以让 Express 不用再维护那么多的依赖项，并且这些独立的项目可以独立于 Express 而自行发展成熟。大多数之前捆绑在 Express 中的中间件都十分基础，所以一定要知道“它去哪了”以及如何得到它。你大概总是需要 Connect，所以我建议你把它和 Express 一起安装（ npm install --save connect ），并使它在你的程序中可以访问到（ var connect = require(connect); ）。

- basicAuth （app.use(connect.basicAuth)(); ）

提供基本的访问授权。记住，basic-auth 只提供最基本的安全，并且你只能通过 HTTPS使用 basic-auth（否则用户名和密码是通过明文传输的）。只有在需要又快又容易的东西，并且在使用 HTTPS 时，才应该用 basic-auth。

- body-parser   （ npm install --save body-parser, app.use(require(body- parser)()); ）

只连入 json 和 urlencoded 的便利中间件。这个中间件还在 Connect 里，但到 3.0 时会移除出去，所以建议你现在开始用这个包。除非你有特别的理由要分别单独使用 json或 urlencoded ，否则最好用这个包。

- json   （参见 body-parser ）

解析 JSON 编码的请求体。如果你在编写一个期望收到 JSON 编码请求体的 API，就会需要这个中间件。目前它的使用还不是十分普遍（大多数 API 仍然使用 application/x-www-form-urlencoded ，这种编码可以被 urlencoded 中间件解析），但它确实能让你的程序更健壮，并不会过时。

- urlencoded   （参见 body-parser ）

解析互联网媒体类型为 application/x-www-form-urlencoded 的请求体。这是处理表单
和 AJAX 请求最常用的方式。

- multipart   （已废弃）

解析互联网媒体类型为 multipart/form-data 的请求体。这个中间件已被废弃了，并在Connect 3.0 中会被移除。你应该用 Busboy 或 Formidable 代替它（见第 8 章）。

- compress   （ app.use(connect.compress); ）

用 gzip 压缩响应数据。这是好事，用户会因此感激你的，特别是那些网络比较慢或者用手机上网的用户。它应该在任何可能会发送响应的中间件之前被尽早连入。唯一应该出现在 compress 之前的中间件只有 debugging 或 logging（它们不发送响应）。

- cookie-parser   （ npm install --save cookie-parser, app.use(require(cookie-parser)（秘钥放在这里）; ）

提供对 cookie 的支持。参见第 9 章。

- cookie-session   （ npm install --save cookie-session, app.use(require(cookie-session)());）

提供 cookie 存储的会话支持。我一般不推荐使用这种存储方式的会话。你一定要把它放在 cookie-parser 后面连入。参见第 9 章。

- express-session   （ npm install --save express-session, app.use(require(express-session)()); ）

提供会话 ID （存在 cookie 里）的会话支持。默认存在内存里，不适用于生产环境，并且可以配置为使用数据库存储。参见第 9 章和第 13 章。

- csurf   （ npm install --save csurf, app.use(require(csurf)()); ）

防范跨域请求伪造（CSRF）攻击。因为它要使用会话，所以必须放在 express-session中间件后面。它目前等同于 connect.csrf 中间件。可惜简单连入这个中间件并不能神奇地防范 CSRF 攻击，详情请参见第 18 章。

- directory   （ app.use(connect.directory()); ）

提供静态文件的目录清单支持。如果不需要目录清单，则无需引入这个中间件。

- errorhandler   （ npm install --save errorhandler, app.use(require(errorhandler)()); ）

为客户端提供栈追踪和错误消息。我建议不要在生产环境中连入它，因为它会暴露实现细节，可能引发安全或隐私问题。详情请参见第 20 章。

- static-favicon   （ npm install --save static-favicon, app.use(require(static-favicon)(path_to_favicon)); ）

提供 favicon（出现在浏览器标题栏上的图标）。这个中间件不是必需的，你可以简单地在 static 目录下放一个 favicon.ico，但这个中间件能提升性能。如果你要使用它，应该尽可能地往中间件栈的上面放。你也可以使用除 favicon.ico 之外的其他文件名。

- morgan   （之前的 logger , npm install --save morgan, app.use(require(morgan)()); ）

提供自动日志记录支持：所有请求都会被记录。详情请参见第 20 章。

- method-override   （ npm install --save method-override, app.use(require(method-override)()); ）

提供对 x-http-method-override 请求头的支持，允许浏览器“假装”使用除 GET 和 POST
之外的 HTTP 方法。这对调试有帮助。只在编写 API 时才需要。

- query 

解析查询字符串，并将其变成请求对象上的 query 属性。这个中间件是由 Express 隐含连入的，所以不要自己连入它。

- response-time   （ npm install --save response-time, app.use(require(response-time)()); ）

向响应中添加 X-Response-Time 头，提供以毫秒为单位的响应时间。一般在做性能调优时才需要这个中间件。

- static   （ app.use(express.static(path_to_static_files)()); ）

提供对静态（public）文件的支持。这个中间件可以连入多次，并可指定不同的目录。详情请参见第 16 章。

- vhost   （ npm install --save vhost, var vhost = require(vhost); ）

虚拟主机（vhost），这个术语是从 Apache 借来的，它可使子域名在 Express 中更容易管理。详情请参见第 14 章