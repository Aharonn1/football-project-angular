import express, { Request, Response, NextFunction } from "express";
import tasksService from "../5-services/tasks-service";
import imageHandler from "../2-utils/image-handler";

const router = express.Router();

router.get("/players", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const players = await tasksService.getAllPlayers();
        response.json(players)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/topPlayers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const players = await tasksService.getTopGoalScorers();
        response.json(players)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/topAssists", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const players = await tasksService.getTopAssists();
        response.json(players)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/table", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const table = await tasksService.getTheTable();
        response.json(table)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/awayTeam", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const table = await tasksService.getTheAwayTeam();
        response.json(table)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/players/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName)
        response.sendFile(absolutePath)
    } catch (err: any) {
        next(err)
    }
})

router.delete("/players/:playerId([0-9]+)", async (request: Request, response: Response, next: NextFunction)=>{
    try{  
        const playerId = +request.params.playerId;
        await tasksService.deletePlayer(playerId);
        response.sendStatus(204)
    }catch(err:any){
        next(err)
    }
})

export default router;