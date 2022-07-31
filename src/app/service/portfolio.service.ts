import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../components/model/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  apiUrl = "https://balestra-matias.herokuapp.com/";

  getPortfolio(): any{
    return this.http.get(this.apiUrl + 'persona/details');
  }

  getPortfolioById(id: number): Observable<Persona> {

    return this.http.get<Persona>(this.apiUrl + `portfolio/view/${id}`);
  }

  public updatePersona(id: number, persona: Persona): Observable<any> {
   
    return this.http.put<any>(this.apiUrl + `persona/update/${id}`, persona);
  }

  getStudies():any {
    return this.http.get(this.apiUrl + 'education/details');
  }

  getJobs():any {
    return this.http.get(this.apiUrl + 'experience/details');
  }
  

  getSkills():any {
    return this.http.get(this.apiUrl + 'skill/details');
  }

  
}
