"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const db_1 = require("./utils/db");
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
const server_1 = __importDefault(require("./utils/server"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = require("../swagger-output.json");
const port = config_1.default.get("port");
const hostname = config_1.default.get("hostname");
const app = (0, server_1.default)();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const signals = ["SIGINT", "SIGTERM", "SIGHUP"];
function gracefulShutdown({ signal, }) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`Got signal ${signal}. Good bye`);
        yield (0, db_1.disconnectFromDb)();
        process.exit(0);
    });
}
app.listen(port, hostname, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`App is running at http://${hostname}:${port}`);
    yield (0, db_1.connectToDb)();
    (0, routes_1.default)(app);
    for (let i = 0; i < signals.length; i++) {
        process.on(signals[i], () => gracefulShutdown({
            signal: signals[i],
        }));
    }
}));
