"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes"));
const deserialiseUser_1 = __importDefault(require("../middleware/deserialiseUser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
function createServer() {
    const app = (0, express_1.default)();
    const corsOrigin = config_1.default.get("corsOrigin");
    app.use((0, cors_1.default)({
        credentials: true,
        origin: corsOrigin,
    }));
    app.use(express_1.default.json());
    app.use(deserialiseUser_1.default);
    (0, routes_1.default)(app);
    return app;
}
exports.default = createServer;
