import { Component, OnInit } from '@angular/core';
import { Project, User, Task, Status, ProjectStatusHistory } from 'src/app/models/project.model';
import { ListprojectsService } from 'src/app/services/projects/Add+List/listprojects.service';
import { AdminUserListService } from 'src/app/services/users/AdminUserList/admin-user-list.service';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pieChartLabels: string[] = ['Utilisé', 'Restant'];
  pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{
      data: [3, 2], // Placeholder values
      backgroundColor: ['#FF6384', '#36A2EB']
    }]
  };

  projects: Project[] = [];
  selectedProject: Project | null = null;
  selectedProjectUsers: User[] = [];
  selectedProjectTasks: Task[] = [];
  selectedProjectStatusHistory: ProjectStatusHistory[] = [];
  totalBudget: number = 0;
  statusCounts: { [key in Status]?: number } = {};
  statusTimelineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

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
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.loadProjectUsers(project.id);
    this.loadProjectTasks(project.id);
    this.loadProjectStatusHistory(project.id);
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

  loadProjectStatusHistory(projectId: number): void {
    this.projectsService.getStatusHistoryByProject(projectId).subscribe((data: ProjectStatusHistory[]) => {
      this.selectedProjectStatusHistory = data;
      this.prepareStatusTimelineData(); // Update the chart when status history changes
    });
  }

  prepareStatusTimelineData(): void {
    const statusData: { [date: string]: { [status: string]: number } } = {};

    this.selectedProjectStatusHistory.forEach(entry => {
      const date = new Date(entry.changeDate).toLocaleDateString();
      if (!statusData[date]) {
        statusData[date] = {};
      }
      statusData[date][entry.newStatus] = (statusData[date][entry.newStatus] || 0) + 1;
    });

    const labels = Object.keys(statusData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const datasets = Object.keys(Status).map(status => ({
      label: Status[status as keyof typeof Status], // Convert enum to label
      data: labels.map(date => statusData[date][status] || 0),
      borderColor: this.getStatusColor(status as Status),
      backgroundColor: this.getStatusColor(status as Status) + '33', // Adding transparency to color
      fill: false
    }));

    this.statusTimelineChartData = {
      labels,
      datasets
    };
  }

  getStatusColor(status: Status): string {
    switch (status) {
      case Status.EN_COURS:
        return '#FF6384';
      case Status.ANNULE_ET_CLOTURE:
        return '#36A2EB';
      case Status.LIVRE_ET_CLOTURE:
        return '#FFCE56';
      case Status.LIVRE:
        return '#4BC0C0';
      case Status.NON_DEMARRE:
        return '#9966FF';
      case Status.EN_ATTENTE:
        return '#FF9F40';
      default:
        return '#000000';
    }
  }

  viewDetails(user: User): void {
    // Implement view details functionality
  }
}
