import { Component, OnInit } from '@angular/core';
import { Project, Status } from 'src/app/models/project.model';
import { ListprojectsService } from 'src/app/services/projects/listprojects.service';

@Component({
  selector: 'app-project',
  templateUrl: './listprojects.component.html',
  styleUrls: ['./listprojects.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  newProject: Project = { 
    id: 0, 
    nom: '', 
    description: '', 
    status: Status.NON_DEMARRE, 
    startDate: new Date(), 
    endDate: new Date(), 
    priority: 0,
    type: '',
    budget: 0
  };
  /*  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  */

  constructor(private projectService: ListprojectsService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  viewProject(id: number): void {
    this.projectService.getProjectById(id).subscribe((data: Project) => {
      this.selectedProject = data;
    });
  }

  addProject(newProject: Project): void {
    this.projectService.createProject(newProject).subscribe((data: Project) => {
      this.projects.push(data);
    });
  }

  updateProject(id: number, updatedProject: Project): void {
    this.projectService.updateProject(id, updatedProject).subscribe((data: Project) => {
      const index = this.projects.findIndex(p => p.id === id);
      if (index !== -1) {
        this.projects[index] = data;
      }
    });
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(p => p.id !== id);
    });
  }
}
