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
    const todo = await TodoModel.find().sort({time:-1});
    res.send(todo);
}

module.exports.saveTodo = async (req,res) => {
    const {text,title} = req.body
    if(text==null || title==null){
        return res.status(200).send(standardResponse(false,'text and title are required','ValidationFailed',null));
    }
    const currentDate = new Date();
    const dataInput = {
        "text" : text,
        "title" : title,
        "time" : currentDate
    }
    await TodoModel.create(dataInput).then((data) => {
        return res.status(200).send(standardResponse(true,'Created Successfully',null,data));
    })
}

module.exports.updateTodo = async (req,res) => {
    const {id,text,title} = req.body;
    if(id==null){
        return res.status(200).send(standardResponse(false,'id is required','ValidationFailed',null));
    }
    const time = new Date();
    await TodoModel.findByIdAndUpdate(id,{text,title,time},{ new: true }).then((data) => {
        return res.status(200).send(standardResponse(true,'Updated Successfully',null,data));
    }).catch((er) => {
        return res.status(200).send(standardResponse(false,'Something Went Wrong',er.message,null));
    })
}

module.exports.deleteTodo = async (req, res) => {
    const {id} = req.params;
    await TodoModel.findByIdAndDelete(id).then(() => {
        return res.status(200).send(standardResponse(true,'Deleted Successfully',null,null));
    }).catch((er) => {
        return res.status(200).send(standardResponse(false,'Something Went Wrong',er.message,null));
    })
}