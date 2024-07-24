import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ListprojectsService {

  private apiUrl = '/admin/api/projects';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/GetAllProjects`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/GetProjectById/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/AddProject`, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/UpdateProject/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteProject/${id}`);
  }
}
