class Task {
    constructor(title, description, priority = 'normal') {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date().toISOString();
    }

    markAsCompleted() {
        this.completed = true;
    }

    updatePriority(newPriority) {
        const validPriorities = ['low', 'normal', 'high'];
        if (validPriorities.includes(newPriority)) {
            this.priority = newPriority;
        } else {
            throw new Error('Invalid priority level.');
        }
    }

    toString() {
        return `${this.title} [${this.priority}] - ${this.completed ? 'Completed' : 'Pending'}`;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title, description, priority) {
        const task = new Task(title, description, priority);
        this.tasks.push(task);
    }

    removeTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
    }

    markTaskAsCompleted(title) {
        const task = this.tasks.find(task => task.title === title);
        if (task) {
            task.markAsCompleted();
        } else {
            console.log('Task not found.');
        }
    }

    updateTaskPriority(title, newPriority) {
        const task = this.tasks.find(task => task.title === title);
        if (task) {
            try {
                task.updatePriority(newPriority);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log('Task not found.');
        }
    }

    listTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks available.');
            return;
        }

        console.log('Task List:');
        this.tasks.forEach(task => {
            console.log(task.toString());
        });
    }

    listPendingTasks() {
        const pendingTasks = this.tasks.filter(task => !task.completed);
        if (pendingTasks.length === 0) {
            console.log('No pending tasks.');
            return;
        }

        console.log('Pending Tasks:');
        pendingTasks.forEach(task => {
            console.log(task.toString());
        });
    }

    listCompletedTasks() {
        const completedTasks = this.tasks.filter(task => task.completed);
        if (completedTasks.length === 0) {
            console.log('No completed tasks.');
            return;
        }

        console.log('Completed Tasks:');
        completedTasks.forEach(task => {
            console.log(task.toString());
        });
    }

    clearAllTasks() {
        this.tasks = [];
        console.log('All tasks cleared.');
    }
}

// Example usage:
const taskManager = new TaskManager();
taskManager.addTask('Buy groceries', 'Milk, Eggs, Bread', 'high');
taskManager.addTask('Walk the dog', 'Evening walk', 'normal');
taskManager.addTask('Study JavaScript', 'Complete the module on promises', 'high');

taskManager.listTasks();

taskManager.markTaskAsCompleted('Buy groceries');
taskManager.listCompletedTasks();
taskManager.listPendingTasks();

taskManager.updateTaskPriority('Walk the dog', 'low');
taskManager.listTasks();

taskManager.clearAllTasks();
taskManager.listTasks();
