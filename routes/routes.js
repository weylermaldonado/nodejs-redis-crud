const redis = require("redis"),
  client = redis.createClient();

exports.todo = function(req, res){
 let anid= req.query['id'];
 let oldText="";
  console.log("View id is =>"+anid);
  if(anid=="" || anid==undefined){
  anid="";
  oldText="";
  	

  callBackExe();
  }
  else{
   client.hget("Todo1",anid, function(err, obj) {
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
      todos: todos,
	  anid:anid,
	  oldText:oldText
    });
  });
  }
 
};



exports.saveTodo = function(req, res) {
  let newTodo = {};
  newTodo.name = req.body['todo-text'];
  let anid= req.body['id'];
  if(anid=="" || anid==undefined){
  
  let d = new Date();
  let n = d.getTime();
  newTodo.id = n;
  }
  else{
  newTodo.id = anid;
  }
 
  client.hset("Todo1", newTodo.id, newTodo.name);
  res.redirect("/todo");
};

exports.removeTodo = function(req, res) {
 let anid= req.query['id'];
  if(anid=="" || anid==undefined){  
  res.redirect("/todo");
  }
  else{  
  res.redirect("/todo");
   client.hdel("Todo1", anid);
  }

};
