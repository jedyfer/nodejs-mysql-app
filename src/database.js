/* ARCHIVO DE CONEXION */
const mysql = require('mysql');
const { pathToFileURL } = require('url');
const { promisify } = require('util');  //  promisify permite las promesas en los coolbacks
const { database } = require('./keys'); /* solo trae la funcion database */

/* Conexion */
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    
    if (connection) connection.release();

    console.log('DB is Connected.');
    return;
});

/* el promisify permite hacer usar promesas:funciones asnyc al hacer consultas */
pool.query = promisify(pool.query);

module.exports = pool;
