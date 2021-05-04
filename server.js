var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    Task = require("./api/models/taskModel"), // 作成したModelの読み込み
    bodyParser = require("body-parser"),
    fs = require("fs");

var dbAddress = "mongodb://localhost/Tododb";
if (fs.existsSync("../server"))
{
    dbAddress = "mongodb://10.0.2.10/Tododb";
}
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
    dbAddress,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/taskRoutes"); // Routeのインポート
routes(app); // appにRouteを設定する

app.listen(port); // appを特定のportでlistenさせる

console.log("todo list RESTful API server started on: " + port);

//////// logger /////////
const logger = require("./util/logger").application;
const systemLogger = require("./util/systemLogger");
const accessLogger = require("./util/accessLogger");
app.use(systemLogger());
app.use(accessLogger());

app.get("/", (req, res) => {
    logger.debug("デバッグログが出力されます");
    res.send("log test");
});

logger.error("test", "1行で表示");
logger.error("app", "システムログの出力テスト Errorです");

