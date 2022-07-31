export class Skills {
    idSkills: number;
    nameSkill: string;
    levelSkill: number;
    logoSkill: string;
    

    constructor ( nameSkill: string, levelSkill: number, logoSkill: string) {
        
        this.nameSkill = nameSkill;
        this.levelSkill = levelSkill;
        this.logoSkill = logoSkill;

    }
}
