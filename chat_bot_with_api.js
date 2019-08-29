
var fs=require("fs");
var telegram=require("telegram-bot-api");
 var request=require("request");

var api = new telegram({
        token: '< YOUR _ TELEGRAM _ BOT_ API>',
        updates: {
        	enabled: true
    }
});

api.on("message",function(message)
{
	var m=message.text.toLowerCase();
	 if(m.includes("meaning"))
	 {
		m=m.replace("meaning of ",'');
		console.log(m);
		request("https://googledictionaryapi.eu-gb.mybluemix.net/?define="+m+"&lang=en",function(error,response,body)
		{
			
			//console.log(JSON.parse(body)[0].meaning.adjective[0].definition);
			api.sendMessage({chat_id:message.chat.id,text:"Hey I found one of the meaning \n"+ (JSON.parse(body)[0].meaning.adjective[0].definition)/*.meaning.adjective[0].definition).toString()*/ });
			
		});
	}
	var m=message.text.toLowerCase();
	else if(m.includes("weather"))
	{
			var at=m.replace("weather at ","");
			request("http://api.apixu.com/v1/current.json?key=< YOUR _ API _ KEY >&q="+at,function(error,response,body)
			{
				api.sendMessage({chat_id:message.chat.id,text:"Hey I found the wether and the wether condition -----\n\n"+(JSON.parse(body).current.temp_c)+"\n"+(JSON.parse(body).current.condition.text).toString()});
			});
		 console.log(at);
	}

});

