import { Expense } from "../models/expense.js";

export const handleAddExpense = async (req, res) => {
  console.log(req.body);
  const { amount, userId, note, category } = req.body;

  const newExpense = await Expense.create({
    userId: userId,
    amount: amount,
    note: note,
    date: new Date(),
    category: category,
  });

  return res.status(200).json(newExpense);
};


export const handleGetAllExpenseByUser = async (req, res) => {
  let id = req.params.id;
  const { month, year } = req.query;
  const result = await Expense.find({ userId: id });
  return res.status(200).json(result);
};

export const handleGetAllExpenseByUserAndMonthAndYear = async (req, res) => {
  const { userId, month, year } = req.query;
  let currentMonth = parseInt(month) + 1; 
  let nextMonth = (currentMonth + 1) % 13; 
  let myYear = parseInt(year);

  const startDate = new Date(`${myYear}-${currentMonth}-01`);

  const endDate = new Date(`${myYear}-${nextMonth}-01`); 
  let result = await Expense.find({
    userId: userId,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  });

  console.log(res);
  console.log(startDate, endDate);

  return res.status(200).json(result);
};

export const handleGetAllExpenseByUserAndDate = async (req, res) => {
  const { id, date } = req.params;
  const startOfDay = new Date(date);
  console.log(date);
  
  startOfDay.setHours(0, 0, 0, 0); 

  
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999); 

  console.log(startOfDay, endOfDay);

  const results = await Expense.find({
    userId : id,
    date: {
      $gte: startOfDay, 
      $lte: endOfDay, 
    },
  });
  
  return res.status(200).json(results);
};


export const handleGetLastTenTransaction = async(req, res) => {
  const {id, limit} = req.params;
  console.log(req.params);
  
  const result = await Expense.find(
    {userId :  id}
  )
  .sort({_id : -1})
  .limit(limit);

  return res.status(200).json(result);

}