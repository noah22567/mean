var cors = require('cors')

var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
  
var db = mongo.connect("mongodb://localhost:27017/AngularCRUD", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
   
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
  
app.use(function (req, res, next) {        

     res.setHeader('Access-Control-Allow-Origin', '*');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
 var Schema = mongo.Schema;  
  
var UsersSchema = new Schema({      
 name: { type: String   },       
 email: { type: String   },
 password: { type: String   },   
},{ versionKey: false});

// var ExpensesSchema
//  description: {type: String },
//  amount: {type: Number},
//  date: {type: Date},
//  types: {type: String},
 
// },{ versionKey: false });


var model = mongo.model('users', UsersSchema, 'users');  
  
app.post("/api/SaveUser",function(req,res){   
 var mod = new model(req.body);  
 if(req.body.mode =="Save")  
 {  
    mod.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 });  
}  
else   
{  
 model.findByIdAndUpdate(req.body.id, { name: req.body.name, password: req.body.password},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     }  
 });  
  
  
}  
 })  
  
 app.post("/api/deleteUser",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
   })
   
app.get("/api/login",function(req,res){
    console.log("We are login");
    // console.log(req.name,req.password,req);
    
    model.findOne(req.name, req.password, 
        { projection: { _id: 1, name: 1 } },function(err,data){  
    // model.find({name:req.params.name, password:req.params.password},function(err,data){  

    //model.findOne(req.params.name, req.params.password,function(err,data){  
        
        console.log("After login");
        console.log(data);

        if(err){  
            res.send(err);  
        }  
        else{                
            res.send(data);  
            }  
    });  
})

  
 app.get("/api/getUser",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  })

  app.get('/api/getDetail/:_id', function (req, res) {
    model.findById(req.params._id, function (err, users) {
        if(err){  
            res.send(err);         }  
        else{                
            res.send(users);  
            }  
    });  
  })

/////////////////////////////////////////////////////////////////////////////////

var ExpensesSchema = new Schema({    
 key: {type: String},
 description: {type: String },
 amount: {type: Number},
 date: {type: Date},
 types: {type: String},  
},{ versionKey: false });  
   
var modelex = mongo.model('expenses', UsersSchema, 'expenses');

app.post("/api/SaveExpense",function(req,res){   
 var mod = new modelex(req.body);  
 if(req.body.mode =="Save")  
 {  
    mod.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 });  
}  
else   
{  //////////
 model.findByIdAndUpdate(req.body.id, { name: req.body.name, address: req.body.address},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     }  
 });  
  
  
}  
 })  
  
 app.post("/api/deleteExpense",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 });    
   })  
  
  
  
 app.get("/api/getExpenses",function(req,res){  
     console.log(req,"get Expense")
    modelex.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  })  

 app.get("/api/getExpense/:key",function(req,res){  
    console.log(req.params.key,"get Expense")
    // console.log(req)
    modelex.find(req.param.key,function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{        
                  console.log(data)        
                  res.send(data);  
                  }  
          });  
  })  

app.listen(8080, function () {  
    
 console.log('Example app listening on port 8080!')  
})  
