

export const shouldBeLoggedIn = (req , res) => {
       console.log(req.userId);

    res.status(200).json({message: "you are authenticated"});
}

export const shouldBeAdmin = () => {
    
}