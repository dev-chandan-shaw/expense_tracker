import {handleAddExpense, handleGetAllExpense, handleGetAllExpenseByUser, handleGetAllExpenseByUserAndDate, handleGetAllExpenseByUserAndMonthAndYear} from '../controllers/expense.js'
import express from 'express'
const router = express.Router()
router.route('/').post(handleAddExpense).get(handleGetAllExpense)
router.get('/query', handleGetAllExpenseByUserAndMonthAndYear)
router.get('/:id', handleGetAllExpenseByUser)
router.get('/:id/:date', handleGetAllExpenseByUserAndDate)


export default router