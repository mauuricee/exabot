const mysql      = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const db = mysql.createConnection({
  host     : process.env.mysqldhost,
  user     : process.env.mysqldbuser,
  password : process.env.mysqldbpass,
  database : process.env.mysqldb,
  port     : 3306
});
 
db.connect(function(err) {
    if (err) {
      console.log('Erreur MySQL : ' + err.stack);
      return;
    }
   
    console.log("Connexion MySQL établie avec succès !");
});


function WarnDB() {
    const data = db.query("CREATE TABLE IF NOT EXISTS modData(id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,memberID VARCHAR(60),memberName VARCHAR(60),warnCount INT,warnDetails LONGTEXT, bansCount INTEGER) CHARACTER SET utf8;", function (error) {
        if (error) {
            console.log("Erreur lors de l'initialisation : " + error.stack);
            return;
        }
        
        console.log("Table des warns initialisée !")
    });

    db.end();
}

module.exports = { WarnDB }