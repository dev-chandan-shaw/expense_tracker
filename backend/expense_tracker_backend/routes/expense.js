import {handleAddExpense, handleGetAllExpense, handleGetAllExpenseByUser} from '../controllers/expense.js'
import express from 'express'
const router = express.Router()
router.route('/').post(handleAddExpense).get(handleGetAllExpense)
router.get('/:id', handleGetAllExpenseByUser)

export default router