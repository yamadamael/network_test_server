var mongoose = require("mongoose"),
    Task = mongoose.model("Tasks");

get_all_tasks = async function() {
    const tasks = await Task.find({});
    return {
        Todo: {
            Params: tasks
        }
    };
};

// 全てのタスクを取得する
exports.all_tasks = async function(req, res) {
    const tasks = await get_all_tasks();
    res.json(tasks)
};

// 新しいタスクを作成する
exports.create_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.save(async function(err, task) {
        if (err) res.send(err);
        const tasks = await get_all_tasks();
        res.json(tasks)
    });
};

// 特定のタスクを取得する
exports.load_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
        if (err) res.send(err);
        res.json(task);
    });
};

// 特定のタスクを更新する
exports.update_task = function (req, res) {
    Task.findOneAndUpdate(
        { _id: req.body.id },
        req.body,
        { new: true },
        async function(err, task) {
            if (err) res.send(err);
            const tasks = await get_all_tasks();
            res.json(tasks);
        }
    );
};

// 特定のタスクを削除する
exports.delete_task = function(req, res) {
    Task.findOneAndDelete(
        { _id: req.body.id },
        async function(err, task) {
            if (err) res.send(err);
            const tasks = await get_all_tasks();
            res.json(tasks)
        }
    );
};
