import { UploadedFile } from "express-fileupload";

class TeamModel{

    playerId:number;
    countryId:number;
    firstName:string;
    lastName:string;
    numberShirt:number;
    role:string;
    goals:number;
    assists:number;
    image:UploadedFile
    imageName:string;
    scored:boolean;
    price:number;
    age:number;
    totalPrice: number;
    averageAge: number;

    constructor(team:TeamModel){
        this.playerId = team.playerId;
        this.countryId = team.countryId;
        this.firstName = team.firstName;
        this.lastName = team.lastName;
        this.numberShirt = team.numberShirt;
        this.role = team.role;
        this.goals = team.goals;
        this.assists = team.assists;
        this.imageName = team.imageName;
        this.image = team.image;
        this.scored = team.scored;
        this.price = team.price;
        this.age = team.age;
        this.totalPrice = team.totalPrice;
        this.averageAge = team.averageAge
    }
}
export default TeamModel;