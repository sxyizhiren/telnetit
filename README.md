- [![Build Status](https://travis-ci.org/sxyizhiren/telnetit.png?branch=master)](https://travis-ci.org/sxyizhiren/telnetit)
- [![NPM version](https://badge.fury.io/js/telnetit.png)](http://badge.fury.io/js/telnetit)
- [![Dependencies Status](https://david-dm.org/sxyizhiren/telnetit.png)](https://david-dm.org/sxyizhiren/telnetit)
- [![NPM Stats](https://nodei.co/npm/telnetit.png?downloads=true&stars=true)](https://npmjs.org/package/telnetit)
- [![NPM Downloads](https://nodei.co/npm-dl/telnetit.png?months=6)](https://npmjs.org/package/telnetit)

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