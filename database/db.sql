CREATE DATABASE njs-mysql-db;

USE njs-mysql-db;

CREATE TABLE users() {
    iduser      int(11) AUTO_INCREMENT         not null,
    username    varchar(16)     not null,
    password    varchar(60)     not null,
    fullname    varchar(100)    not null,
    PRIMARY KEY(id)
};

CREATE TABLE links() {
    idlink      int(11) AUTO_INCREMENT not null,
    title       varchar(150)    not null,
    utl         varchar(255)    not null,
    description text,
    userid      int(11)         not null,
    created_date timestamps     not null DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (userid) REFERENCES users(iduser),
    PRIMARY KEY (idlink)
};

/* OJO: en phpmyaddmin a la llave foreanea le ponemos tipo de llave INDEX */

/* ejemplo para modificar variable */
ALTER TABLE links MODIFY idlink INT(11) NOT NULL AUTO_INCREMENT;

DESCRIBE links;

/* 42:54 */
