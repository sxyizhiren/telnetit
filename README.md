# install
npm install telnetit

# usage
```
var TelnetClient = require('telnetit');
var telnetcli = new TelnetClient('any_name_for_this_telnet');

var connconf= {
    "host": '127.0.0.1',
    "port": 23,
    "username": "",
    "password": "",
    "enpassword": ""
};
telnetcli.connect(connconf,function(err){
	telnetcli.write('what are you doing?',function(){
	  telnetcli.read(function(err,recv){
		recv=recv.join('');
		console.log('receive:',recv);
		telnetcli.close();
	  });
	});
});

```