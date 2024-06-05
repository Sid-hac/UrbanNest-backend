import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt"

export const getUsers = async(req , res) => {
    
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to get users"})
    }
    

}
export const getUser = async(req , res) => {

    const id = req.params.id

    try {
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to get user"})
    }
       
}
export const updateUser = async(req , res) => {

    const id = req.params.id
    const {password ,avatar , ...inputs} = req.body
    const tokenUserId = req.userId

    if(id !== tokenUserId){
       return res.status(500).json({message:"not authorized"})
    }

    let updatedPassword = null;

    try {

        if(password){
          updatedPassword = await bcrypt.hash(password , 10)
        }

        const user = await prisma.user.update({
            where:{
                id
            },
            data:{
                ...inputs,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar})
            }
        })

        const {password:changedPassword , ...userInfo} = user;
        return res.status(200).json(userInfo)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to get user"})
    }
       
}
export const deleteUser = async() => {
       
}