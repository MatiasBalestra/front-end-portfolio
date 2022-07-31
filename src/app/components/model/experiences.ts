export class Job {
    
    id: number;
    jobPosition: string;
    jobCompany: string;
    jobDescription: string;
    jobType: string;
    jobLocalization: string;
    fecha_ini: string;
    fecha_fin: string;
    url_imgJob: string;
    

constructor( 
    jobPosition: string,
    jobCompany: string,
    jobDescription: string,
    jobType: string,
    jobLocalization: string,
    fecha_ini: string,
    fecha_fin: string,
    url_imgJob: string
)
    {
        this.jobPosition = jobPosition;
        this.jobCompany = jobCompany;
        this.jobDescription = jobDescription;
        this.jobType = jobType;
        this.jobLocalization = jobLocalization;
        this.fecha_ini = fecha_ini;
        this.fecha_fin = fecha_fin;
        this.url_imgJob = url_imgJob;
    }
}