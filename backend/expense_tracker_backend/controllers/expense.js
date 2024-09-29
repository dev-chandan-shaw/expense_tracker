import { Expense } from "../models/expense.js";

export const handleAddExpense = async(req, res) => {
    console.log(req.body);
    const {price , userId, note, category} = req.body

    const newExpense = await Expense.create({
        userId : userId,
        amount : price,
        note : note,
        date : new Date(),
        category : category
    })

    return res.status(200).json(newExpense);
}

export const handleGetAllExpense = async(req, res) => {
    const allExpeanse = await Expense.find({})
    return res.status(200).json(allExpeanse)
}

export const handleGetAllExpenseByUser = async(req, res) => {
    let id = req.params.id;
    const result = await Expense.find({userId : id});
    return res.status(200).json(result);
}

