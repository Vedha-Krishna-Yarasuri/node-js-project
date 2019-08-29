const {c, cpp, node, python, java} = require('compile-run');
var telegram= require("telegram-bot-api");

var api = new telegram({
        token: '< YOUR_TELEGRAM_API >',
        updates: {
            enabled: true
    }
});



api.on('message', function(message)
{
        var sourcecode=message.text
            let resultPromise = cpp.runSource(sourcecode,{ stdin:'3\n2 '});
    resultPromise
        .then(result => {
            console.log(result);//result object
            api.sendMessage({chat_id:message.chat.id,text:result.stdout});
        })
        .catch(err => {
            console.log(err);
        });

})
