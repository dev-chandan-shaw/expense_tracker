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
    const {month, year} = req.query
    const result = await Expense.find({userId : id});
    return res.status(200).json(result);
}

export const handleGetAllExpenseByUserAndMonthAndYear = async(req, res) =>  {
    const { userId, month, year } = req.query;
    console.log(req.query);
    const startDate = new Date(year, month-1, 1);
    const endDate = new Date(year, month, 1);
    let result = await Expense.find({
        userId : userId,
        date : {
            $gte : startDate,
            $lt : endDate
        }
    })
    return res.status(200).json(result);
    
}

