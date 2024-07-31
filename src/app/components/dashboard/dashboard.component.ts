// src/app/components/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Project, User, Task } from 'src/app/models/project.model';
import { ListprojectsService } from 'src/app/services/projects/Add+List/listprojects.service';
import { AdminUserListService } from 'src/app/services/users/AdminUserList/admin-user-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  selectedProjectUsers: User[] = [];
  selectedProjectTasks: Task[] = []; // Add this line

  constructor(
    private projectsService: ListprojectsService,
    private userService: AdminUserListService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getAllProjects().subscribe((data: Project[]) => {
      this.projects = data;
    });
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.loadProjectUsers(project.id);
    this.loadProjectTasks(project.id); // Add this line
  }

  loadProjectUsers(projectId: number): void {
    this.userService.getUsersByProject(projectId).subscribe((data: User[]) => {
      this.selectedProjectUsers = data;
    });
  }

  loadProjectTasks(projectId: number): void {
    this.projectsService.getTasksByProject(projectId).subscribe((data: Task[]) => {
      this.selectedProjectTasks = data; // Add this line
    });
  }

  viewDetails(user: User): void {
    // Implement view details functionality
  }
}
