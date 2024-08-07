const User=require('../models/user');

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({ error: 'No user was found in DB' });
        }
        req.profile=user;
        next();
    })
}

exports.getUser=(req,res)=>{
    return res.json(req.profile);
}

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        { $set:req.body},
        (err,user)=>{
            if (err) {
				return res.status(400).json({ error: 'You are not authorized to update information' });
			}
			return res.json(user);
        }
    );
}