export class Studies {

    id: number;
    titulo: string;
    institutoName: string;
    descriptionEducation: string;
    linkCertificado: string;
    fecha_ini: string;
    fecha_fin: string;

    constructor(
        titulo: string,
        institutoName: string,
        descriptionEducation: string,
        linkCertificado: string,
        fecha_ini: string,
        fecha_fin: string,
        ){
            this.titulo = titulo;
            this.institutoName = institutoName;
            this.descriptionEducation = descriptionEducation;
            this.linkCertificado = linkCertificado;
            this.fecha_ini = fecha_ini;
            this.fecha_fin = fecha_fin;
        }

}
