"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const PaperRoutes_1 = __importDefault(require("./routes/PaperRoutes"));
const RawMaterialRoutes_1 = __importDefault(require("./routes/RawMaterialRoutes"));
const RollMaterialRoutes_1 = __importDefault(require("./routes/RollMaterialRoutes"));
const AuthRouter_1 = __importDefault(require("./routes/AuthRouter"));
const cors_2 = require("./config/cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)(cors_2.corsOptions));
// Routes 
app.use('/api/products', ProductRoutes_1.default);
app.use('/api/papers', PaperRoutes_1.default);
app.use('/api/raw-material', RawMaterialRoutes_1.default);
app.use('/api/roll-material', RollMaterialRoutes_1.default);
app.use('/api/auth', AuthRouter_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map