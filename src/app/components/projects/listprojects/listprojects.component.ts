import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project, Status, SanteGenerale, Avancement, RespectBudget } from 'src/app/models/project.model';
import { ListprojectsService } from 'src/app/services/projects/Add+List/listprojects.service';

@Component({
  selector: 'app-listprojects',
  templateUrl: './listprojects.component.html',
  styleUrls: ['./listprojects.component.css']
})
export class ListprojectsComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { 
    id: 0, 
    nom: '', 
    description: '', 
    status: Status.NON_DEMARRE, 
    santeGenerale: SanteGenerale.SeDerouleCommePrevu,
    respectPlanning: Avancement.Respecte,
    respectPerimetre: Avancement.Respecte,
    respectBudget: RespectBudget.Respecte,
    startDate: new Date(), 
    endDate: new Date(), 
    priority: 0, 
    type: '',
    budget: 0,
    assignedUser: null,
    tasks: [],
    users: []
  };

  statusOptions: string[] = Object.values(Status);

  constructor(private projectService: ListprojectsService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  addProject(): void {
    this.projectService.createProject(this.newProject).subscribe(() => {
      this.newProject = { 
        id: 0, 
        nom: '', 
        description: '', 
        status: Status.NON_DEMARRE, 
        santeGenerale: SanteGenerale.SeDerouleCommePrevu,
        respectPlanning: Avancement.Respecte,
        respectPerimetre: Avancement.Respecte,
        respectBudget: RespectBudget.Respecte,
        startDate: new Date(), 
        endDate: new Date(), 
        priority: 0, 
        type: '',
        budget: 0,
        assignedUser: null,
        tasks: [],
        users: []
      };
      this.loadProjects(); // Reload the project list
    });
  }

  viewProject(id: number): void {
    this.router.navigate([`/project-details/${id}`]);
  }

  editProject(id: number): void {
    this.router.navigate([`/edit-project/${id}`]);
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.loadProjects(); // Reload the project list
    });
  }
}
