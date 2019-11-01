var fs=require("fs");
var telegram=require("telegram-bot-api");
var api = new telegram({
	token:'< YOUR _ TELEGRAM _ API>',
	updates: {
        	enabled: true
    }
});

api.on("message",function(message)
{

	
		var str=fs.readFileSync("hello.txt").toString();
		var s=message.chat.id.toString()+":"+message.text.toLowerCase();
		var search=str.split(",")
		var pos=search.includes(s);

		console.log(message.text)
		if(pos==true){
			console.log(pos);
			api.sendMessage({chat_id:message.chat.id,text:"Name aldready exist"});
		}
		else
		{
			console.log("i am here");
			fs.appendFileSync("hello.txt",s+",");
		}
});

