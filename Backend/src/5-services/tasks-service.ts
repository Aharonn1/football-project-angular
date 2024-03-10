import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError } from "../4-models/client-errors";
import TeamModel from "../4-models/team-model";
import imageHandler from "../2-utils/image-handler";
import TableModel from "../4-models/tableLeague-model";

async function getTopGoalScorers(): Promise<TeamModel[]> {
    const sql = `SELECT * FROM team ORDER BY goals DESC LIMIT 5`;
    const tasks = await dal.execute(sql)
    return tasks;
}

async function getTopAssists(): Promise<TeamModel[]> {
    const sql = `SELECT * FROM team ORDER BY assists DESC LIMIT 5`;
    const tasks = await dal.execute(sql)
    return tasks;
}

async function getAllPlayers(): Promise<TeamModel[]> {
    const sql = `SELECT * FROM team ORDER BY goals`;
    const tasks = await dal.execute(sql)
    return tasks;
}

async function getTheTable(): Promise<TableModel[]> {
    const sql = `SELECT * FROM tableleague ORDER BY points DESC `;
    const tasks = await dal.execute(sql)
    return tasks;
}

async function getTheAwayTeam(): Promise<TableModel[]> {
    const sql = `SELECT * FROM tableleague WHERE awayTeam = 1`;
    const tasks = await dal.execute(sql)
    return tasks;
}

async function deletePlayer(id: number): Promise<void> {

    const sql = "DELETE FROM team WHERE playerId = ?";
    const result: OkPacket = await dal.execute(sql, id);
    if (result.affectedRows === 0) throw new ResourceNotFoundError(id)

}

export default {
    getAllPlayers,
    getTopGoalScorers,    
    deletePlayer,
    getTheTable,
    getTopAssists,
    getTheAwayTeam
}