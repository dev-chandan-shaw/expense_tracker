import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId, 
        ref : "User"
    },
    amount : {
        required : true,
        type : Number
    },
    category : {
        type : String,
        enum : ["Food/Drink", "Transport", "Shopping", "Entertainment", "Bill/Recharge"],
        default : "Other"
    }, 
    note : {
        type : String,
    },
    date : {
        type : Date,
        required : true,
    }
})

export const Expense = mongoose.model('Expense', expenseSchema);