export class Project {

    id: number;
    projectName: string;
    projectDescription: string;
    projectUrlImg: string;
    linkRepositorio: string;
    linkWeb: string;



    constructor (
        projectName: string,
        projectDescription: string,
        projectUrlImg: string,
        linkRepositorio: string,
        linkWeb: string,
    ){
       
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.projectUrlImg = projectUrlImg;
        this.linkRepositorio = linkRepositorio;
        this.linkWeb = linkWeb;
    }

}
