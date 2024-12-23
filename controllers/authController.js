const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

const SignUp = async(req, res)=>{
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
           return res.status(401).json({message: "All field are required. "});
        }

        const duplicate = await User.findOne({username}).lean()

        if(duplicate) {
           return res.status(400).json({message: "name already taken"});       
        }

        const hashedPSW = await bcrypt.hash(password,10);

        const userObject = {
            email,
            username,
            password: hashedPSW
        }

        const user = await User.create(userObject);

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "user":user
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '10s'}
        )
    
        const refreshToken = jwt.sign(
            {
                "UserInfo": {
                    "user": user
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '20s'}
        ) 
    
        res.cookie('jwt', refreshToken,{
            httpOnly: true, //accessible only by web server 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None', //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        if(user){
           return res.json({accessToken,message: "New User Created", data: user});
        }

    }catch(err){
        console.log(err);
    }
}

const login = async(req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(401).json({message: "All field are Required"});
        }
    
        const foundUser = await User.findOne({email}).exec();
        if(!foundUser){
           return res.status(400).json({message: "Username not Found"});
        }
    
        const match = await bcrypt.compare(password, foundUser.password);
        if(!match){
           return res.status(400).json({message: "Wrong password"});
        }
    
         const accessToken = jwt.sign(
             {
                 "UserInfo": {
                    "user": foundUser,
                 }
             },
             process.env.ACCESS_TOKEN_SECRET,
             {expiresIn: '10s'}
         )
    
         const refreshToken = jwt.sign(
             {
                 "UserInfo": {
                    "user": foundUser,
                 }
             },
             process.env.REFRESH_TOKEN_SECRET,
             {expiresIn: '20s'}
         ) 
    
         res.cookie('jwt', refreshToken,{
             httpOnly: true, //accessible only by web server 
             secure: process.env.NODE_ENV === 'production',
             sameSite: 'None', //cross-site cookie 
             maxAge: 7 * 24 * 60 * 60 * 1000 
         })
    
        res.json({ accessToken, message: "success", data: foundUser})
    }catch(err){
        console.log(err);
    }
   
}

const refresh = (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt){
       return res.status(400).json({message: "Forbiden"});
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) =>{
            if(err) res.status(400).json({message: "Invalid"});
            const foundUser = await User.findOne({ username: decoded.username });
            if(!foundUser) res.status(400).json({message: "Invalid"});

            const accessToken = jwt.sign(
                {
                    "UserInfo":{
                        "user": foundUser,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'}
            )

            res.json({accessToken});
        }
    )
}

module.exports = {SignUp, login, refresh};