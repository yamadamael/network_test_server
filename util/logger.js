const log4js = require("log4js");
const levels = require("log4js/lib/levels").levels;
const config = require("../config/log4js-config.js");
log4js.configure(config);

// それぞれのログ種別ごとに作成
const console = log4js.getLogger();
const system = log4js.getLogger("system"); // configで設定したsystemで作成
const access = log4js.getLogger("access");

// アプリケーションロガーの拡張
const ApplicationLogger = function() {
    this.logger = log4js.getLogger("application");
};

const proto = ApplicationLogger.prototype;
for (let level of levels)
{
    level = level.toString().toLowerCase();
    proto[level] = (function (level) {
        return function (key, message) {
            const logger = this.logger;
            logger.addContext("key", key);
            logger[level](message);
        };
    })(level);
}

const application = new ApplicationLogger();

// ログ種別のエクスポート
module.exports = {
    console,
    system,
    application,
    access,
};

