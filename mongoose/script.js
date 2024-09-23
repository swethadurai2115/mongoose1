const mongoose = require('mongoose');
const User = require('./models/userModel');


mongoose.connect('mongodb://127.0.0.1:27017/code').then(()=>{
    console.log('connected')
}).catch(()=>{
    console.log('connection error')
})

//const user = new User({
  //  name: 'swetha',
    //age: 21
//});

//user.save().then(()=> {
 //   console.log('User saved')
//})

async function run(){
    try{   
       const user = await User
       .where('id')
       .equals('66ebc3737c6e6bc25b8c9a8a')
       .populate('bestFriend')
       .limit(1);

       console.log(user);
    }catch(e){
    console.log(e.message)
  }

}

run();