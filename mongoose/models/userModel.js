const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
   city: String,
   street: String
})


const userSchema = new mongoose.Schema({
   name: String,
   age: {
      type: Number,
      min: 10,
      max: 30,
      validate :{
         validator : v => v % 2 == 0,
         message : props => `${props.value} is not number`
      }
   },
   email: {
      type: String,
      required: true,
      uppercase: true
   },
   createdAt: {
      type: Date,
      default:()=>Date.now(),
      immutable: true
   },
   updatedAt: Date,
   bestFriend: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User'
   },
   hobbies: [String],
   address:  addressSchema
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;