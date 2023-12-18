"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    show() {
        console.log("soy Todo!");
    }
    sayHi() {
        return `Hola soy Todo`;
    }
}
exports.default = Todo;
const todo = new Todo();
todo.show();
