"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("../application/app"));
const myapp = new app_1.default();
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(myapp.getAllTasks()[0].name);
});
router.post('/', (_req, res) => {
    res.send("Saving a data");
});
exports.default = router;
