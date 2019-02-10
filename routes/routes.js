const redis = require("redis"),
  client = redis.createClient();

// Vista principal
// Se recuperan todas las tareas guardadas en Redis
// y se renderizan junto con la vista
exports.todo = function(req, res){
  let task_id= req.query['id'];
  let oldText="";
  
  if(task_id=="" || task_id==undefined){
    task_id="";
    oldText="";
  	callBackExe();
  } else {
    client.hget("Todo1",task_id, function(err, obj) {
      oldText=obj;
      callBackExe();
    });
  }
  
  function callBackExe(){
    let todos = [];
    
    client.hgetall("Todo1", function(err, objs) {
      for(let k in objs) {
        let newTodo = {
        text: objs[k],
		    id:k
      };
      todos.push(newTodo);
    }
	
    res.render('todo', {
      title: 'ToDo List',
      todos,
	    task_id,
      oldText
    });
  });
  }
};


// Guarda una nueva tarea o guarda los cambios
// en alguna tarea que se indica, la recupera por medio del id
// si no tiene id quiere decir que es una tarea nueva, si tiene id
// entonces es una actualización de una tarea
exports.saveTodo = function(req, res) {
  let newTodo = {};
  newTodo.name = req.body['todo-text'];
  let task_id= req.body['id'];
  if(task_id=="" || task_id==undefined){
    let date = new Date();
    let current_date = date.getTime();
    newTodo.id = current_date;
  }else{
    newTodo.id = task_id;
  }
  client.hset("Todo1", newTodo.id, newTodo.name);
  res.redirect("/todo");
};

// Elimina una tarea mediante su id
exports.removeTodo = function(req, res) {
  let task_id= req.query['id'];
  if(task_id=="" || task_id==undefined){  
    res.redirect("/todo");
  }else{  
    res.redirect("/todo");
    client.hdel("Todo1", task_id);
  }

};
