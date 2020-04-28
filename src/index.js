//console.log("hola");

const http = require('http');
const url = require('url');
var querystring = require('querystring');
var {info, error} = require('./modules/my-log');
var consts = require('./utils/consts');
var firebase = require('../libs/firebase');
var {countries} = require('countries-list');

var server = http.createServer(function(request, response){
    var parsed = url.parse(request.url);
    console.log("parsed: ", parsed);
    // response.writeHead(200, {'Context-type': 'application/json'});
    // response.write(JSON.stringify(countries.PE));
    // response.end();

    var pathname = parsed.pathname;
    var query = querystring.parse(parsed.query);
    console.log("query", query);

    if(pathname=='/'){
    response.writeHead(200, {'Context-type': 'text/html'});
        response.write('<html><body><p>Hola gente de Youtube</p></body></html>');
        response.end();
    }
        
    else if (pathname == '/exit'){
        response.writeHead(200, {'Context-type': 'text/html'});
        response.write('<html><body><p>BYE</p></body></html>');
        response.end();
    }
    else if (pathname == '/country'){
        response.writeHead(200, {'Context-type': 'application/json'});
        response.write(JSON.stringify(countries[query.code]));
        response.end();
    }
    else if (pathname == '/info'){
        var result = info(pathname.url);
        response.writeHead(200, {'Context-type': 'text/html'});
        response.write(result);
        response.end();
    }
    else if (pathname == '/error'){
        var result = error(pathname.url);
        response.writeHead(200, {'Context-type': 'text/html'});
        response.write(result);
        response.end();
    }
    
    else{
        response.writeHead(404, {'Context-type': 'text/html'});
        response.write('<html><body><p>NOT FOUND</p></body></html>');
        response.end();
    }
    
});

/*function suma(num1, num2){
    return num1+num2;
}*/

//console.log("la suma es: "+ suma(5,2));

server.listen(3000);