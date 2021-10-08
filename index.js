import express from 'express'; 
// import bodyParser from 'body-parser';
import {con} from './config/database.js'; 
import playersRoutes from './routes/routes_searchPlayers.js';
import yearRoutes from './routes/routes_searchYear.js';
import crossRoutes from './routes/routes_searchCross.js';
import bullRoutes from './routes/routes_searchBull.js';
// import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mysql from 'mysql'; 
import { monitorEventLoopDelay } from 'perf_hooks';


dotenv.config();



var connection;
// connection = mysql.createConnection({
//   database:'mlp',
//   host:'localhost',
//   user:'root',
//   password:''
// })
function handleDisconnect() {
    connection = mysql.createConnection({
        // pool: true,
        // connectionLimit: 5,
        // waitForConnections: true,
        database:process.env.DATABASE,
        host : process.env.HOST,
        user :  process.env.USER, 
        password: process.env.PASS,
        ssl: {
          rejectUnauthorized: false
        }
    }); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      }
      else if(err.code === 'ER_USER_LIMIT_REACHED'){
        handleDisconnect();
      } 
      else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
    
  }
  
handleDisconnect();

// const compression = require('compression');

const app = express(); 
// const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

// app.use(compression());
app.use(helmet());
app.use(express.json());

// app.use(bodyParser.json());

app.use('/', playersRoutes);
app.use('/', yearRoutes);
app.use('/', crossRoutes);
app.use('/', bullRoutes);
app.listen(process.env.PORT, () => console.log(`server running on https://www.api-rgstats.jonathan-robin.com:}`));

// con.query('select * from score', function(err,res,field){
//     console.log(res)
//     console.log(err)
//     // console.log(field.length);
// })

// console.log(process.env.DATABASE)
// // // Allow Cross-Origin requests
// // app.use(cors());

// // // Set security HTTP headers
// // app.use(helmet());
// // const limiter = new RateLimiter({ tokensPerInterval: 150, interval: "hour" });
// // Limit request from the same API 
// // const limiter = RateLimiter({
// //     max: 150,
// //     windowMs: 60 * 60 * 1000,
// //     message: 'Too Many Request from this IP, please try again in an hour'
// // });
// // app.use('/api', limiter);

// // Body parser, reading data from body into req.body
// app.use(express.json({
//     limit: '15kb'
// }));

// // Data sanitization against Nosql query injection
// app.use(mongoSanitize());

// // Data sanitization against XSS(clean user input from malicious HTML code)
// app.use(xss());

// // Prevent parameter pollution
// app.use(hpp());
