var express = require("express");
const { Pool } = require('pg')
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.set('port', '8000');
var server = app.listen(app.get('port'));
var io = require('socket.io')(server);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

   // jade. 
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set('view options', {layout: false});
app.get('/', function(req, res, next){res.render('index');});

app.use(express.static(path.join(__dirname, '/public'))); 

io.on('connection', function(socket) {
    console.log("Afonso connected");
    socket.on('search', function(data){
        console.log('search : ' + data);
        databaseCheck(data);
    });
    socket.on('disconnect', function(){
        console.log('Afonso disconnected');
    });
});

function databaseCheck(data){
    var sql = "SELECT servidor, \"path\", short_filename, dia_backup, output_path, guid FROM backup WHERE servidor = '" + data + "';";
    var sqlTest = "SELECT EXISTS (SELECT servidor FROM backup WHERE servidor = '" + data + "');";
    pool.query(sql, (err, response) => {
        if (err) {
            console.log(err)
        }
        else{
            var serverPath = [];
            var i = 0;
            console.log("Numero de linhas: " + response.rows.length);

            response.rows.forEach(element => {
                serverPath[i] = element.path;
                console.log(serverPath[i]);
                i++; 
            }); 

            if(response.rows[0].exists){
                io.emit('searchRes', data);
            }
        }
        pool.end;
    });
};

const pool = new Pool({
    user: 'postgres',
    host: '172.20.21.28',
    database: 'backup',
    password: '123456',
    port: '5432', 
})

/*var server = http.createServer(function (req, res) {
    displayForm(res);
});

function displayForm(res){
    fs.readFile('/home/gabriel/Área de Trabalho/html/index.html', function (err, html) {
        if (err){
            console.log(err);
        }    
          
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();      
    });
}


server.listen(PORT);
console.log("server listening on " + PORT);


*/


/*var getUserDataSql = squel.select()
    .from('backup')
    .fields([
        'servidor', '"path"', 'short_filename', 'dia_backup', 'output_path', 'guid'
    ])
    .where('txt_file_created = true');
*/
