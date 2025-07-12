"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Middleware (optional)
// app.use(express.json());
// app.use(cors()); etc.
// Routes
app.get('/', (req, res) => {
    res.send('<h2>Hello world</h2>');
});
exports.default = app;
