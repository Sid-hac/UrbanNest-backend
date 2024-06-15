import prisma from "../../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIds: {
          hasSome: [tokenUserId],
        },
      },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get chats" });
  }
};
export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIds: {
          hasSome: [tokenUserId],
        },
      },
      include:{
        messages : {
            orderBy : {
                createdAt : "asc"
            }
        }
      }
    });

    await prisma.chat.update({
        where : {
            id : req.params.id
        },
        data : {
            seenby:{
                push: tokenUserId
            }
        }
    })
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get chat" });
  }
};
export const addChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIds: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get user" });
  }
};
export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat =  await prisma.chat.update({
        where : {
            id : req.params.id,
            userIds: {
                hasSome: [tokenUserId],
            },
        },
        data : {
            seenby:{
                push: tokenUserId
            }
        }
    })
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get chat" });
  }
};
