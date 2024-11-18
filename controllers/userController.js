const User = require('../models/Users');
const bcrypt = require('bcrypt');

const getAllUser = async(req, res)=>{
    try{
        const users = await User.find().select('-password').lean();
        if(!users.length){
            res.status(404);
           return res.json({message: "No User Found"});
        }
       return res.json(users);
    } catch(err){
        console.log(err)
    } 
}

const getUserById = async(req, res)=>{
    try{
        const { id } = req.body;
        const user = await User.find({_id:id}).exec();
        if(!user.length){
            res.status(404);
           return res.json({message: "No User Found With the given Id", id: req.body.id});
        }
       return res.json(user);
    } catch(err){
        console.log(err)
    } 
}

const updateUser = async(req, res)=>{
    try{
        const {id,name ,avatar, bio} = req.body;

        // if(!id|| !username|| !email || !password){
        //    return res.status(400).json({message: "All fields are required"});
        // }

        const user = await User.findById(id).exec();

        if(!user){
           return res.status(400).json({message: "No User with the Given Id is Found"});
        }

        const duplicate = await User.findOne({name}).lean();

        if(duplicate && duplicate._id.toString() !== id){
            return res.status(400).json({message: "Name already taken"});
        }

        // user.username = username;
        user.name = name;
        // user.email = email;
        // user.lastSeen = lastSeen || Date.now();
        // if(password) {
        //     user.password = await bcrypt.hash(password, 10);
        // }
        if(avatar) {
            user.avatar = avatar;
        }
        if(bio) {
            user.bio = bio;
        }

        const updatedUser = await user.save();

        if(updatedUser) {
            res.json({message: "User Updated"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: "No user found with the given ID" });
        }

        await User.deleteOne({ _id: id });

        res.json({ message: `Username ${user.username} deleted` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}