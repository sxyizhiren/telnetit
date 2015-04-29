var TelnetClient = require('../main.js');
var Telnet = require('telnet');
require("should");
var telnetcli = new TelnetClient('ut_telnet');

var testPort=20000;
var testHost='127.0.0.1';
var connconf= {
    "host": testHost,
    "port": testPort,
    "username": "",
    "password": "",
    "enpassword": ""
};

var Input2Output = function(b){
	// if replace \r\n to \n here, then actually, client will receive \r\n.
	var out='$\r\n';
	out += (b + '\r\n');
	out += (' done\r\n');
	out += ('$\r\n');
	return out;
}


var netServer = Telnet.createServer(function (client) {

  // make unicode characters work properly
  client.do.transmit_binary()

  // make the client emit 'window size' events
  client.do.window_size()

  // listen for the window size events from the client
  client.on('window size', function (e) {
    /*if (e.command === 'sb') {
      console.log('telnet window resized to %d x %d', e.width, e.height)
    }*/
  })

  // listen for the actual data from the client
  client.on('data', function (b) {
  	client.write(Input2Output(b));
  })
  
  client.on('end', function (b) {
    console.log('end emit.');
  })
  
  client.on('close', function () {
    console.log('client close.');
  })
  
  client.on('drain', function (b) {
	console.log('drain emit.');
  })
  
  client.on('error', function (err) {
	console.log('client read error:' + err.code);
  })

  client.write('\nHello Client!\n')

});

netServer.on('error',function(err){
  console.log('net Server.error:',err);
  describe("netServer 20000 work successfully.", function() {
    it("should not meet error.", function(done) {
      (err === undefined).should.be.true;
    });
  });
});

netServer.listen(
{
  host: testHost,
  port: testPort
},function(err){
  console.log('net Server.listening:',err);
});

describe("telnet client can connect server", function() {
it("can connect port 20000.", function(done) {
  telnetcli.connect(connconf,function(err){
	(err === null).should.be.true;
	telnetcli.write('what are you doing?',function(){
	  //read until prompt tag
	  telnetcli.read(function(err,recv){
		(err === null).should.be.true;
		recv=recv.join('');
		recv.should.equal(Input2Output('what are you doing?'));
		// test notifyError
		var readErrCnt=2;
		var errmsg='manul rise error';
		telnetcli.read(function(err){
		  err.message.should.equal(errmsg);
		  if(!--readErrCnt){
			telnetcli.close();
			netServer.close(function(err){
			  (err === undefined).should.be.true;
			  done();
			});/*netServer.close*/    
		  }
		});/*telnetcli.read*/

		telnetcli.read(function(err){
		  err.message.should.equal(errmsg);
		  if(!--readErrCnt){
			telnetcli.close();
			netServer.close(function(err){
			  (err === undefined).should.be.true;
			  done();
			});/*netServer.close*/    
		  };
		});/*telnetcli.read*/

		telnetcli.clearWatcher(new Error(errmsg));

	  })/*telnetcli.read*/

	});/*telnetcli.write*/

  });/*telnetcli.connect*/

});/*it*/

});/*describe*/


