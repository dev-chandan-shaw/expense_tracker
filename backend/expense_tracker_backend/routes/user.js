import express from 'express'

import {getAllUser, createUser, getUserById, deleteUserById, updateUser, handleLogin}  from '../controllers/user.js'

const router = express.Router()

router.route('/').get(getAllUser).post(createUser)

router.post('/login', handleLogin);

router.route('/:id').get(getUserById).delete(deleteUserById).put(updateUser)

export default router