var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var Model=require('./model/models.js');
var router=express.Router();

var port=process.env.PORT || 3000;

// create the application
var app=express();

// database connection
var db="mongodb://localhost/mean-apps";

mongoose.connect(db, function(err,res){
	if(err){
		console.log('not connected to database '+ err)
	}else{
		console.log('connected to mongodb database')
	}
})

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'))

// staticfiles here
app.use(express.static(__dirname + '/public'));

// GET

router.get('/api/users',function(req,res){
	Model.find({},function(err,users){
		if(err){
			res.status(404).send(err)
		}else{
			res.status(200).send(users)
		}
	})
})

// DELETE

router.delete('/api/users/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	Model.remove({_id:id},function(err,response){
		if(err){
			res.status(500).send(err)
		}else{
			res.status(200).send({message: 'successfully deleted'})
		}
	})
})

// PUT

router.put('/api/users',function(req,res){
	Model.findById(req.body._id,function(err,user){
		if(err){
			res.status(404).send(err)
		}else{
			user.update(req.body,function(err,success){
				if(err){
					res.status(404).send(err)
				}else{
					res.status(200).send({message:'success'})
				}
			})
		}
	})
})

// POST

router.post('/api/users',function(req,res){
	var model=new Model(req.body);
	model.save(function(err,user){
		if(err){
			res.status(500).send(err)
		}else{
			res.status(201).send(user)
		}
	})
})

app.use('/',router)

app.listen(port,function(){
	console.log('server is running on port no - port')
})

