import bcrypt from "bcrypt";
import prisma from "../../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create new user and save to db

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User Already Exists" });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user exist
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "incorrect password" });
    }
    // generate token

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d'}
    );

    const { password: userPassword , ...userInfo} = user;

    // send token to client
    res.cookie("token", token , {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        SameSite: "none",
      })
      .status(200)
      .json(userInfo);
      

    //  res.setHeader("set-cookie", "test=" + "myvalue").json("success",)

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const logout = (req, res) => {
  
  res.clearCookie("token" , {
    path: "/",
    // maxAge: 0,
    httpOnly: true,
    secure: true,
    SameSite: "none",
    // path: "/",
  }).status(200).json({message: "logout successful"})
  
};
