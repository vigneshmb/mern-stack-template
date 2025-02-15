import { sampleModel } from '#Models/sample.model.js';

const projectFilter = {
  __v: 0,
};

const fieldFilter = {};

const createBoard = (req,res)=>{
    const userData = req.body || {title:"default data"}
    const newBoard = new boardModels(userData);
    newBoard.save();
    res.status(201).send("Board created successfully");
}

/* Read Documents */
const getBoards = async(req,res)=>{
    const boardDbData = await boardModels.find({});
    res.status(200).send(boardDbData);
}

const getBoardById = async(req,res)=>{
    // const boardId = req.query.id;
    const boardId = req.params.boardId
    const boardDbData = await boardModels.findOne({_id : boardId}).exec();
    res.status(200).send(boardDbData);
}

const updateBoard =async(req,res)=>{
    const boardId = req.query.id;
    const boardData = req.body || {title:"update dummy data"}
    console.log(boardId,boardData);
    const resp = await boardModels.findByIdAndUpdate(boardId, boardData);
    console.log(resp);
    
    res.status(200).send("Board updated successfully");
}

const deleteBoard =async(req,res)=>{
    const boardId = req.params.id;
    await boardModels.deleteOne({ _id: boardId });
    res.status(200).send("Board deleted successfully");
}

export {createBoard,getBoards,getBoardById,updateBoard,deleteBoard}