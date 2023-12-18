"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xclass_1 = __importDefault(require("../x/xclass"));
const task_1 = require("../core/domain/entities/task");
const taskList_1 = require("../core/domain/entities/taskList");
const task = new task_1.Task(123, "pepe", true);
class Todo {
    constructor() {
        this.x = new xclass_1.default;
    }
    show() {
        const t = new taskList_1.TaskList([task]);
        t.tasks;
        this.x.show();
    }
    sayHi() {
        return `Hola soy Todo`;
    }
}
exports.default = Todo;
