var express = require("express");
const { Pool } = require('pg')
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var rows = [];

app.set('port', '8000');
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/', function(req, res) {
    var servidor = req.body.q;

    var sql = "SELECT servidor, 'path', short_filename, dia_backup, output_path, guid FROM backup WHERE txt_file_created = false AND servidor = '" + servidor + "';";
    var rows = [];

    pool.query(sql, (err, res) => {
        if (err) {
            console.log(err)
        }
        else{
            receberRows(res.rows);
        }
        pool.end;
    });
});

app.listen(app.get('port'));

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

var sqlDois = "INSERT INTO backup(guid, servidor) VALUES('asdads', 'gabriel')";

function receberRows(allRows){
    for(var i = 0; i < allRows.length; i++){
        console.log(allRows[i].servidor);
        rows[i] = allRows[i].servidor;
    }
}



/*var getUserDataSql = squel.select()
    .from('backup')
    .fields([
        'servidor', '"path"', 'short_filename', 'dia_backup', 'output_path', 'guid'
    ])
    .where('txt_file_created = true');
*/
