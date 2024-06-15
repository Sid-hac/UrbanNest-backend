import prisma from "../../lib/prisma.js";

export const addMessage = async (req, res) => {

    const tokenUserId = req.userId
    const chatId = req.params.chatId
    const message = req.body.text


    try {

        const chat = await prisma.chat.findUnique({
            where : {
                id : chatId,
                userIds : {
                    hasSome  : [tokenUserId]
                }
            }
        })

        if (!chat) {
            return res.status(404).json({ message: "chat not found" });
        }

        const newMessage = await prisma.message.create({
            data : {
                text : message,
                chatId : chatId,
                userId : tokenUserId
            }
        })

        await prisma.chat.update({
            where : {
                id : chatId
            },
            data : {
                seenby : [tokenUserId],
                lastMessage : message
            }
        })

      
      res.status(200).json(newMessage);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "failed to get users" });
    }
  };