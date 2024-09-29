import {handleAddExpense, handleGetAllExpense, handleGetAllExpenseByUser, handleGetAllExpenseByUserAndMonthAndYear} from '../controllers/expense.js'
import express from 'express'
const router = express.Router()
router.route('/').post(handleAddExpense).get(handleGetAllExpense)
router.get('/query', handleGetAllExpenseByUserAndMonthAndYear)
router.get('/:id', handleGetAllExpenseByUser)


export default router