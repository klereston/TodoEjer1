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
const app_1 = __importDefault(require("./application/app"));
const task_1 = require("./core/domain/entities/task");
const CHOICES = ['Exit', 'create_task', 'update_task', 'delete_task', 'show_tasks'];
const messages = {
    name: '',
    completed: false
};
//type index = number | unknown;
const taskToUpdate = {
    i: -1
};
const taskToDelete = {
    i: -1
};
const app = new app_1.default();
function menuView() {
    console.clear();
    console.log('============================================');
    console.log('Choose one option: ');
    CHOICES.forEach((e, i) => {
        console.log(i + "." + e);
    });
    console.log('============================================');
}
const menu = () => {
    return new Promise((resolve) => {
        menuView();
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question("", (answer) => {
            readline.close();
            resolve(answer);
        });
    });
};
const startMenu = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield menu();
    switch (answer) {
        case '0':
            //Exit
            console.log(CHOICES[0]);
            break;
        case '1':
            console.log(CHOICES[1]);
            createTaskTodo(app);
            break;
        case '2':
            console.log(CHOICES[2]);
            updateTaskTodo(app);
            break;
        case '3':
            console.log(CHOICES[3]);
            deleteTaskTodo(app);
            break;
        case '4':
            console.log(CHOICES[4]);
            showDatabase();
            break;
        default:
            errorMenu();
            break;
    }
});
const e = () => {
    return new Promise((resolve) => {
        console.log('Error input: type an option number between 1 to 4 or 0 to exit');
        resolve(1);
    });
};
const errorMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    yield e();
    yield pause();
    yield startMenu(app);
});
const pause = () => {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Press ENTER to continue...', (m) => {
            readline.close();
            resolve(m);
        });
    });
};
const createTaskTodoInputTitle = () => {
    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question("Enter the title task: ", (message) => {
            messages.name = message;
            readline.close();
            resolve(messages);
        });
    });
};
const createTaskTodoInputCompleted = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question("The task is completed (true or false): ", (answer) => {
            readline.close();
            switch (answer) {
                case 'true':
                    messages.completed = Boolean(answer);
                    break;
                case 'false':
                    messages.completed = Boolean(answer);
                    break;
                default:
                    reject('Error: the task can NOT be created, type (true or false) to create this task');
                    break;
            }
            resolve(messages);
        });
    });
};
function createTaskTodoView() {
    console.clear();
    console.log('============================================');
    console.log('Create a new Task');
    console.log('============================================');
}
const createTaskTodo = (app) => __awaiter(void 0, void 0, void 0, function* () {
    createTaskTodoView();
    yield createTaskTodoInputTitle();
    try {
        yield createTaskTodoInputCompleted();
        const id = Math.random(); //generate id, prevent create a task with the same id.
        const task = new task_1.Task(id, messages.name, messages.completed);
        //Checking the task.name doesn't exist.  
        const exT = app.existTask(task);
        if (exT === true) {
            console.log("Can Not save this task, This Title Task already exist!");
        }
        if (exT === false) {
            app.saveTaskInCache(task);
            app.createTask(task);
            console.log("The task was added successfuly");
        }
        //press enter to continue
        yield pause();
        //go back to menu
        yield startMenu(app);
    }
    catch (error) {
        console.log(error);
        yield pause();
        yield startMenu(app);
    }
});
const updateTaskTodoInput = () => {
    return new Promise((resolve) => {
        updateTaskMenu();
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('', (e) => {
            readline.close();
            taskToUpdate.i = Number(e);
            resolve(e);
        });
    });
};
function updateTaskMenu() {
    const listOfTasks = app.getAllTasks();
    const tasksTitles = listOfTasks.map(task => "Task: " + task.name + ", id:" + task.id + ", completed: " + task.completed);
    console.clear();
    console.log('============================================');
    console.log('Choose a task to update?');
    tasksTitles.forEach((e, i) => {
        console.log(i + "." + e);
    });
    console.log('============================================');
}
const updateTaskTodo = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const listOfTasks = app.getAllTasks();
    yield updateTaskTodoInput();
    //find the task object in db by index
    yield updateTaskInputTitle(listOfTasks[taskToUpdate.i]);
    try {
        yield updateTaskInputCompleted();
        const task = new task_1.Task(Math.random(), messages.name, true);
        const exT = app.existTask(task);
        if (exT === true) {
            console.log("Can Not update this task, This Title Task already exist!");
        }
        if (exT === false) {
            //Update the task with new data if the title(name) doesn't exist. 
            listOfTasks[taskToUpdate.i].name = messages.name;
            listOfTasks[taskToUpdate.i].completed = messages.completed;
            app.updateTask(listOfTasks[taskToUpdate.i]);
            console.log("The task was updated successfuly");
        }
        yield pause();
        yield startMenu(app);
    }
    catch (error) {
        console.log(error);
        yield pause();
        yield startMenu(app);
    }
});
const updateTaskInputTitle = (task) => {
    return new Promise((resolve) => {
        console.clear();
        console.log('============================================');
        console.log('UPDATE TASK: title:' + task.name + '  id:' + task.id + '  completed:' + task.completed);
        console.log('============================================');
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`Update: title -> `, (answer) => {
            readline.close();
            messages.name = answer;
            resolve(answer);
        });
    });
};
const updateTaskInputCompleted = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`Update: completed? (true or false) -> `, (answer) => {
            readline.close();
            switch (answer) {
                case 'true':
                    messages.completed = Boolean(answer);
                    break;
                case 'false':
                    messages.completed = Boolean(answer);
                    break;
                default:
                    reject('Error: the task can NOT update, type true or false to complete update this task');
                    break;
            }
            resolve(answer);
        });
    });
};
function deleteTaskTodoView() {
    const listOfTasks = app.getAllTasks();
    const tasksTitles = listOfTasks.map(task => "Task: " + task.name + ", id:" + task.id + ", completed: " + task.completed);
    console.clear();
    console.log('============================================');
    console.log('Choose a task to delete: ');
    tasksTitles.forEach((e, i) => {
        console.log(i + "." + e);
    });
    console.log('============================================');
}
const deleteTaskTodoInput = () => {
    return new Promise((resolve) => {
        deleteTaskTodoView();
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Choose the number of the task to delete: ', (answer) => {
            readline.close();
            taskToDelete.i = Number(answer);
            resolve(answer);
        });
    });
};
const deleteTaskTodo = (app) => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteTaskTodoInput();
    app.deleteTask(app.getAllTasks()[taskToDelete.i]);
    console.log('Task deleted successfuly.');
    yield pause();
    yield startMenu(app);
});
function databaseView() {
    const listOfTasks = app.getAllTasks();
    const tasksTitles = listOfTasks.map(task => "Task: " + task.name + ", id:" + task.id + ", completed: " + task.completed);
    console.clear();
    console.log('============================================');
    console.log('Choose a task to delete: ');
    tasksTitles.forEach((e, i) => {
        console.log(i + "." + e);
    });
    console.log('============================================');
}
const showDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("DATA_BASE: ");
    databaseView();
    //console.log(app.getAllTasks())
    yield pause();
    yield startMenu(app);
});
//START CLI
startMenu(app);
