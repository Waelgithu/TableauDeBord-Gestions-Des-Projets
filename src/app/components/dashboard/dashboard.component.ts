import { Component, OnInit } from '@angular/core';
import { Project, User, Task, Status } from 'src/app/models/project.model';
import { ListprojectsService } from 'src/app/services/projects/Add+List/listprojects.service';
import { AdminUserListService } from 'src/app/services/users/AdminUserList/admin-user-list.service';
import { ChartData } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
//import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle } from 'ng-apexcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  selectedProjectUsers: User[] = [];
  selectedProjectTasks: Task[] = [];
  totalBudget: number = 0;
  statusCounts: { [key in Status]?: number } = {};
  statusData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }]
  };

  constructor(
    private projectsService: ListprojectsService,
    private userService: AdminUserListService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService.getAllProjects().subscribe((data: Project[]) => {
      this.projects = data;
      this.calculateTotalBudget();
      this.calculateStatusCounts();
    });
  }

  calculateTotalBudget(): void {
    this.totalBudget = this.projects.reduce((sum, project) => sum + project.budget, 0);
  }

  calculateStatusCounts(): void {
    this.statusCounts = this.projects.reduce((counts, project) => {
      counts[project.status] = (counts[project.status] || 0) + 1;
      return counts;
    }, {} as { [key in Status]?: number });

    this.statusData.labels = Object.keys(this.statusCounts);
    this.statusData.datasets[0].data = Object.values(this.statusCounts);

    this.cdr.detectChanges(); // Ensure Angular detects changes
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.loadProjectUsers(project.id);
    this.loadProjectTasks(project.id);
  }

  loadProjectUsers(projectId: number): void {
    this.userService.getUsersByProject(projectId).subscribe((data: User[]) => {
      this.selectedProjectUsers = data;
    });
  }

  loadProjectTasks(projectId: number): void {
    this.projectsService.getTasksByProject(projectId).subscribe((data: Task[]) => {
      this.selectedProjectTasks = data;
    });
  }

  viewDetails(user: User): void {
    // Implement view details functionality
  }
  
}
