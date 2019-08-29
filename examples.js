// var telegram= require("telegram-bot-api");
// var mongojs = require("mongojs");
// var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/amritapuri_places?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["places"]);
// var api = new telegram({
//         token: '878345256:AAFIwOyNkR4sSupmWoTM1UY-Zo8hdYlBrLU',
//         updates: {
//         	enabled: true
//     }
// });
// var place ={
// 	ground_floor:{
// 		acharya_hall:{
// 			id:"a001",
// 		},
// 		shraddha_hall:{
// 			id:"a002",
// 		},
// 		kripa_hall:{
// 			id:"a003",
// 		},
// 	}

// }

// db.places.insert(place,function(err,data)
// {
// console.log(data);
// console.log("success")
// });

// api.on('message', function(message)
// {
//     var message=message.text;
//     message=message.toLowerCase();

//  if(message[1]==0)
//  {
// 	var arr=Object.entries(place.ground_floor);
// 	for(i=0;i<arr.length;i++)
// 	{
// 		var arr2=arr[i];

// 		if(arr2[1].id==message)
// 		{
// 			api.sendMessage({chat_id:message.chat.id,text:arr2[0]})
// 	 		console.log(arr2[0])
// 		}// if loop

// 	}// for loop
//  }// if loop
//  else if(message.length>0)				// only for the ground floor
//  {
// 	var m=Object.entries(place.ground_floor);
// 	 for(i=0;i<m.length;i++)
// 	{
// 	 	var m2=m[i];
// 		if(hello==m2[0])
// 	 	{
// 	 		api.sendMessage({chat_id:message.chat.id,text:m2[1].id})
// 	 		console.log(m2[1].id);
// 		}
// 	}
//  }
//  else
//  {
//  	console.log("sorry i cant get you");
//  }
// });




var mongojs = require("mongojs");
var db = mongojs("mongodb://vedha:krishna123@cluster0-shard-00-00-kbuhh.mongodb.net:27017/practice?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",["practicals","practcals"]);
var express=require("express");
var app = express();


app.use(express.static("public"));
app.get("/login",function(req,res)
{
	res.sendFile(__dirname+"/public/login.html");
});

app.get("/register",function(req,res)
{
	res.sendFile(__dirname+"/public/register.html");
});

var m="";
var b="";
app.get("/login-done",function(req,res)
{

	var object={
		email:req.query.username,
		password:req.query.passwd
	}


	db.practicals.find(object,function(err,data)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(data.length>0)
			{ 
				db.practicals.update({ email:data[0].email},{$set:{status:1}});
				console.log(data);
				res.sendFile(__dirname+"/public/cart.html");
				console.log("Status Updated")
			
				
			}
			else
			{
				res.send("entered details are wrong")
			}
		}
	});

});


app.get("/register-done",function(req,res)
{
	if(req.query.password_1==req.query.password_2)
	{		
		var m=req.query.number;


			var obj={
				fname:req.query.firstname,
				lname:req.query.lastname,
				email:req.query.username,
				password:req.query.password_1,
				mobile:m,
				status:0
			}
			var new_obj={
						email:req.query.username,
					}

			db.practicals.insert(obj,function(err,data)
			{	
				if(err)
				{
					console.log(err)
				}
				else
				{
					res.sendFile(__dirname+"/public/login.html")
				}
			});



			db.practcals.insert(new_obj,function(err,data)
			{
				if(err)
					console.log(err);
				else
					console.log("ALL SET FOR NEW USER");
			})
		
	}
	else
	{
		res.send("passwords do not match");
	}

	
});

app.get('/orders',function(req,res)
{
	var check={
		status:1
	}

//var items = [{ phone:req.query.quantity1},{ laptop:req.query.quantity2},{ tv:req.query.quantity3},{ fridge:req.query.quantity4},{ sofa:req.query.quantity5}];

var items=	{
				phone:req.query.quantity1,
				laptop:req.query.quantity2,
				tv:req.query.quantity3,
				fridge:req.query.quantity4,
				sofa:req.query.quantity5
			}

var keys=Object.keys(items);
var values=Object.values(items);
console.log(keys);
console.log(values);

var last = keys.length;
	db.practicals.find(check,function(err,data)
	{
		if(err)
		{
			console.log(err);
		}
		else
		{
			if(data.length>0)
			{
				console.log(data[0].email);
				var change={
					email:data[0].email
				}
				
				db.practcals.find(change,function(err,data)
				{
					
					if(err)
					{
						console.log(err);
					}
					else
					{
						if (data.length>0)
						{
							for(i=0;i<last;i++)
							{

							if(values[i]>0)
							{
								var key=keys[i];
								key=key.toString();
								var val=values[i];
								val=val.toString();
								var hi=JSON.parse('{ "keys[i].toString()":"values[i].toString()" }');
								db.practcals.update(change,{$set:hi});
							}
						}
							
					}
					}

				})
			 }
		}
	})

});












app.listen(4000,function()
{
	console.log("SERVER STARTED SUCCESSFULLY................")
})