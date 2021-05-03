
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    Task = require("./api/models/taskModel"), // 作成したModelの読み込み
    bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect(
    "mongodb://10.0.2.10/Tododb",
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

app.get("/access1", (req, res) => {
    res.status(200).send("access test 200");
});

app.get("/access2", (req, res) => {
    res.status(403).send("access test 403");
});

app.get("/access3", (req, res) => {
    res.status(404).send("access test 404");
});

app.get("/access4", (req, res) => {
    res.status(500).send("access test 500");
});

app.get("/error", (req, res) => {
    throw new Error("システムログの出力テスト");
});



// logger.mark("test", logger);

logger.error("test", "1行で表示");
logger.error("app", "システムログの出力テスト Errorです");

