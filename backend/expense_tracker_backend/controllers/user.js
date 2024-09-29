import mongoose from 'mongoose';
import User from '../models/user.js'


export async function getAllUser(req, res) {
    try {
        const allUsers = await User.find({})
        return res.status(200).json({
            success : true,
            data : allUsers,
        });
    } catch (error) {
        console.log(`Error while getting data, ${error}`);
    }
}



export async function getUserById(req, res) {
    
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({
                success : false,
                message : `User not found with id, ${userId}`
            })
        }
        const user = await User.findById(userId);
        return res.status(200).json({
            success : true,
            data : user,
        });

    } catch (err) {
        console.log("Error while fetching user");
    }
    
}

export async function createUser(req, res) {
    try {
        const {first_name, last_name, email, password} = req.body
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const result = await User.create({
            firstName : first_name,
            lastName : last_name,
            email : email,
            password : password,
        })

        return res.status(201).json({
            success : true,
            message : "User created successfully",
            data : result
        });

    } catch (error) {
        console.log(`Error while creating user`);
    }
}

export async function deleteUserById(req, res)  {
    try {
        const userId = req.params.id;
        await User.deleteOne({_id : userId});
        return res.status(200).json({
            success : true,
            message : "user deleted successfully"
        });
    } catch (error) {
        console.log(`Error while deleting user`);
    }
}

export async function updateUser(req, res) {
    
    const userId = req.params.id;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({
                success : false,
                message : "User id is not valid"
            })
        }

        const {firstName, lastName, email, gender} = req.body;

        const user = await User.findByIdAndUpdate(userId,
            {
                firstName : firstName,
                lastName : lastName, 
                email : email,
                gender : gender
            },
            {
                new : true
            },
        );

        return res.status(204).json({
            data : user,
            success : true,
            message : "user updated successfully"
        });

    } catch (error) {
        console.log("Error while updating user details");
    }
}


export async function handleLogin(req, res) {
    const {email, password} = req.body;
    console.log(email, password);
    const user = await User.findOne({email : email});
    if (user) {
        if (user.password === password)
            return res.status(200).json(user);
        else return res.status(404).json({
            message : "Email password did not match",
            success : false,
        })
    } else {
        return res.status(404).json({
            message : "user not found",
            success : false
        })
    }
}




