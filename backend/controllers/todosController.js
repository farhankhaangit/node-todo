const TodoModel = require('../models/TodoModel')

const standardResponse = (sts,msg,err,dta) => {
    return {
        'status' : sts,
        'message' : msg,
        'error' : err,
        'data' : dta
    }
}

module.exports.getTodo = async (req,res) => {
    const todo = await TodoModel.find()
    res.send(todo)
}

module.exports.saveTodo = async (req,res) => {
    const {text} = req.body
    if(text==null){
        return res.status(200).send(standardResponse(false,'text is required','ValidationFailed',null));
    }
    await TodoModel.create({text}).then((data) => {
        return res.status(200).send(standardResponse(true,'Created Successfully',null,data));
    })
}

module.exports.updateTodo = async (req,res) => {
    const {_id,text} = req.body;

    await TodoModel.findByIdAndUpdate(_id,{text}).then((data) => {
        return res.status(200).send(standardResponse(true,'Updated Successfully',null,data));
    })
}