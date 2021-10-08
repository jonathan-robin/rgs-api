import mysql from 'mysql'; 
import dotenv from 'dotenv';

dotenv.config();


export const con = mysql.createConnection({
    database:process.env.DATABASE,
    host : process.env.HOST,
    user :  process.env.USER, 
    password: process.env.PASS
})

