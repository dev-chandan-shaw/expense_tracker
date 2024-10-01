import { Expense } from "../models/expense.js";

export const handleAddExpense = async (req, res) => {
  console.log(req.body);
  const { price, userId, note, category } = req.body;

  const newExpense = await Expense.create({
    userId: userId,
    amount: price,
    note: note,
    date: new Date(),
    category: category,
  });

  return res.status(200).json(newExpense);
};

export const handleGetAllExpense = async (req, res) => {
  const allExpeanse = await Expense.find({});
  return res.status(200).json(allExpeanse);
};

export const handleGetAllExpenseByUser = async (req, res) => {
  let id = req.params.id;
  const { month, year } = req.query;
  const result = await Expense.find({ userId: id });
  return res.status(200).json(result);
};

export const handleGetAllExpenseByUserAndMonthAndYear = async (req, res) => {
  const { userId, month, year } = req.query;
  let currentMonth = parseInt(month) + 1; // Keep it as is since month is already zero-based
  let nextMonth = (currentMonth + 1) % 13; // Wrap around to January if it goes to 12
  let myYear = parseInt(year);
  // Set the year to 2024 for both dates

  // Start date for the current month
  const startDate = new Date(`${myYear}-${currentMonth}-01`);

  // End date for the next month (last day of the current month)
  const endDate = new Date(`${myYear}-${nextMonth}-01`); // Go back one day to get the last day of the current month

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
