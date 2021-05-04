module.exports = function(app) {
    var taskList = require("../controllers/taskController");

    app.route('/tasks')
        .get(taskList.all_tasks)
        .post(taskList.create_task);

    app.route('/tasks/update').post(taskList.update_task);
    app.route('/tasks/delete').post(taskList.delete_task);
};

