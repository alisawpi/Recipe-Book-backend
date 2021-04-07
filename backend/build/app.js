"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const recipes_1 = __importDefault(require("./controllers/recipes"));
const auth_1 = __importDefault(require("./controllers/auth"));
const config_1 = __importDefault(require("./utils/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = require("./middleware/middleware");
app.use(cors_1.default());
app.use(express_1.default.json());
let MONGO_URI = '';
if (config_1.default.MONGODB_URI) {
    MONGO_URI = config_1.default.MONGODB_URI;
}
else {
    middleware_1.logger.error('Mongo uri is undefined');
}
middleware_1.logger.info(`Connecting to ${MONGO_URI}`);
mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
    middleware_1.logger.info('connected to MongoDB');
})
    .catch((error) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    middleware_1.logger.error('error connection to MongoDB:', error.message);
});
app.use('/api/recipes', recipes_1.default);
app.use('/api/users', auth_1.default);
app.use(middleware_1.unknownEndpoint);
app.use(middleware_1.errorHandler);
exports.default = app;
