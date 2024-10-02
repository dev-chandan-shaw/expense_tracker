import {handleAddExpense, handleGetAllExpenseByUser, handleGetAllExpenseByUserAndDate, handleGetAllExpenseByUserAndMonthAndYear, handleGetLastTenTransaction} from '../controllers/expense.js'
import express from 'express'
const router = express.Router()
router.route('/').post(handleAddExpense)
router.get('/query', handleGetAllExpenseByUserAndMonthAndYear)
router.get('/:id', handleGetAllExpenseByUser)
router.get('/:id/:date', handleGetAllExpenseByUserAndDate)
router.get('/page/:id/:limit', handleGetLastTenTransaction);



export default router