const messageModel = require('../models/messageModel');

module.exports.addMsg = async (req, res, next) => {
try{
    const {from,to,message} = req.body;
    const data = await messageModel.create({
        message:{text:message},
        users:[from,to],
        sender:from
    })
    if(data){
        return res.json({msg:'Message added successfully'})
    }
    return res.json({msg:'Failed to add msg to DB'});
}catch(ex){
    next(ex);
}
}


module.exports.getAllMsg = async (req, res, next) => {
try{
    const {from ,to} = req.body;
    const Msgs = await messageModel.find({users:{ $all: [from,to]}}).sort({updatedAt:1})
    const projectedMsgs = Msgs.map(msg =>{
        return {
            fromSelf:msg.sender.toString() === from,
            message:msg.message.text
        }
    })
    return res.json(projectedMsgs)
}catch(ex){
    next(ex);
}
}