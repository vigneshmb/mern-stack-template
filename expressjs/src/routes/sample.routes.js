import { Router } from "express";

import { createBoard,getBoards,getBoardById,updateBoard,deleteBoard } from "#Controllers/sample.controller.js";

const boardRouter = Router();

boardRouter.post("/create",createBoard);
boardRouter.get("/getAll",getBoards);
boardRouter.get("/get/:boardId",getBoardById);
boardRouter.put("/update",updateBoard);
boardRouter.delete("/delete/:id",deleteBoard);

export default boardRouter;