var express = require('express');
var router = express.Router();

// Include MongoJS and fetch data from mlab.com
var mongojs = require('mongojs');
var db = mongojs('mongodb://arik:arik@ds145997.mlab.com:45997/mytasklist_arik', ['tasks']);

// Get All Tasks
router.get('/tasks', function(req, res, next) {
	
	// Loop through received data
	db.tasks.find(function(err, tasks){
		if(err){
				res.send(err);
		}
		res.json(tasks);
	});	
});

// Get Single Task
router.get('/task/:id', function(req, res, next) {
	
	// Loop through received data
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
				res.send(err);
		}
		res.json(task);
	});	
});

// Save Task (handling POST request
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    } else {
        db.task.save(task, function(err, task) {
            if(err){
				res.send(err);
		    }
		    res.json(task);
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next) {
	
	// Loop through received data
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
				res.send(err);
		}
		res.json(task);
	});	
});

// Update Task
router.put('/task/:id', function(req, res, next) {
	var task = req.body;
    var updTask = {};
    
    if(task.isDone){
         updTask.isDone = task.isDone;    
    }

    if(task.title){
         updTask.title = task.title;    
    }

    if(!updTask){
        response.status(400);
        res,json({
            'error': 'Bad data';
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
		if(err){
				res.send(err);
		}
		res.json(task);
	});    
    }
    
	// Loop through received data
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
				res.send(err);
		}
		res.json(task);
	});	
});

module.exports = router;
