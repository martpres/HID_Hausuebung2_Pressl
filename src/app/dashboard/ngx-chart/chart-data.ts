import { Serie } from "./serie";

export class ChartData{
    name : string;
    series: Serie[]=[];

    constructor(name: string){
        this.name = name;
    }
}