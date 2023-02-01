const mysql = require('mysql');
const dotenv = require('dotenv');
//const res = require('express/lib/response');
dotenv.config();
const warnDB = mysql.createConnection({
    host     : process.env.mysqldhost,
    user     : process.env.mysqldbuser,
    password : process.env.mysqldbpass,
    database : process.env.mysqldb,
    port     : 3306
  });

function DisplaySQLError(err) {
    console.log("Une erreur SQL est survenue :" + err.stack)
}

function RegisterUser(id,usr) {
    console.log(usr);
    warnDB.query(`INSERT INTO modData (memberID,memberName,warnCount,warnDetails, bansCount) VALUES ('${id}','${usr}',0,'',0);`, function(error) {
        if (error) {
            DisplaySQLError(error)
            return null;
        }
    });
    console.log(`${usr} a été enregistré dans la base de données`);
    //warnDB.end();
    //console.log(`INSERT INTO warns (memberID,warncount,warnDetails) VALUES ('${id}',0,'{}');`);
}

async function CheckUserPresence(id,usr) {
    warnDB.query(`SELECT * FROM modData WHERE memberID = ${id}`, function(error, row) {
     //console.log(row);
    const rowData = row[0];
    console.log(`Le rowData est`);
    console.log(rowData);
    console.log(typeof rowData);
    var memberID;//rowData['memberID'];
    //console.log(memberID);
    //console.log()
    if (error) {
        DisplaySQLError(error);
        return null;
    } 
        //console.log(row[0]);
        //console.log(row[1]);
    if (typeof rowData === 'object') {
        memberID = rowData['memberID'];
        console.log(memberID);
        console.log("J'ai trouvé un truc jsp comment");
        return true;
        }
    else {
        console.log("ya r");
        RegisterUser(id,usr);
        return false;
    }
    });
}

async function GetWarns(id) {
    if (!CheckUserPresence(id)) {
        console.log("Personne invisible dans la base");
        return false;
    }
    warnDB.query(`SELECT warnCount FROM modData WHERE memberID = ?`, [id], function (error, row) {
        if (error) {
            DisplaySQLError(error);
            return null;
        }
        const rowData = row[0];
        if (rowData['warnCount'] == 0) {
            console.log('Aucun warn enregistré pour cette personne');
            return rowData['warnCount'];
        }
    });
    const warns = warnDB.query(`SELECT warnDetails FROM modData WHERE memberID = ?`, [id], function (error, row) {
        if (error) {
            DisplaySQLError(error);
            return null;
        }
        const rowData = row[0];
        console.log('Des warns ont été trouvés pour cette personne');
        return rowData['warnDetails'];
    });
    return warns;
}
//function AddWarn(id) {}

module.exports = { RegisterUser, GetWarns, CheckUserPresence };
