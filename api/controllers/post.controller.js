import prisma from "../../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 1000000,
        },
      },
    });

    setTimeout(() => {
      res.status(200).json(posts);
    }, 3000);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "can not find posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "can not find posts" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetails,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "can not add post" });
  }
};

export const updatePost = () => {};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
