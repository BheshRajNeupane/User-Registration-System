
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv') ;


dotenv.config({path:'../.env'});

// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose
.connect( /*DB  ||*/'mongodb://localhost:27017/users').
then( ()=>  console.log( "DB connection was successful..!!"));

const port = process.env.PORT || 3000;

  const server = app.listen(port, ()=>{
      console.log(`Application running on port ${port}...`);   
  });  

// function to Handle  Unhandle Rejection
process.on('unhandledRejection', err => {
   console.log(err.name,err.message)
   console.log('UNHANDEL REJECTION:\n\n *Shutting Down...!!\n\n');
   server.close(()=>{
       process.exit(1);
   })
});