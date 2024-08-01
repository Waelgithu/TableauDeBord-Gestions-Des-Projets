import { Component, OnInit } from '@angular/core';
import { Task, Status, User } from 'src/app/models/project.model';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { AdminUserListService } from 'src/app/services/users/AdminUserList/admin-user-list.service';
import { ListprojectsService } from 'src/app/services/projects/Add+List/listprojects.service';


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  projects: any[] = []; // Define the project type if possible
  filteredUsers: User[] = [];
  selectedTask: Task | null = null;
  selectedUserId: number | null = null;
  selectedPerson: User | null = null; // Ensure this is of type User or null
  selectedProjectId: number | null = null;

  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    status: Status.NON_DEMARRE,
    startDate: new Date(),
    endDate: new Date(),
    priority: 0
  };

  taskStatusOptions: string[] = ['NON_DEMARRE', 'EN_ATTENTE', 'EN_COURS', 'ANNULE_ET_CLOTURE', 'LIVRE_ET_CLOTURE', 'LIVRE'];

  constructor(
    private taskService: TasksService,
    private userService: AdminUserListService,
    private projectService: ListprojectsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadUsers();
    this.loadProjects();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((data: Task[]) => {
      this.tasks = data; // No transformation needed here
    });
  }

  loadUsers(): void {
    this.userService.getAllAccounts().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = this.users.filter(user => user.role !== 'ADMIN');
    });
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe((data: any[]) => {
      this.projects = data; // No transformation needed here
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onStartDateChange(event: any): void {
    this.newTask.startDate = new Date(event.target.value);
  }
  
  onEndDateChange(event: any): void {
    this.newTask.endDate = new Date(event.target.value);
  }

  viewTask(id: number): void {
    this.router.navigate(['/tasks', id]);
  }

  editTask(id: number): void {
    this.router.navigate(['/edit-task', id]);
  }

  addTask(newTask: Task): void {
    if (this.selectedPerson) {
      newTask.users = [this.selectedPerson]; // Add selected person to the task if available
    } else {
      newTask.users = []; // Ensure the users property is an empty array if no person is selected
    }
    if (this.selectedProjectId) {
      this.taskService.assignTaskToProject(newTask.id, this.selectedProjectId).subscribe(() => {
        this.taskService.createTask(newTask).subscribe(() => {
          this.loadTasks();
          this.resetNewTask();
        }, error => {
          console.error('Error adding task:', error);
          alert('Failed to add task.');
        });
      }, error => {
        console.error('Error assigning task to project:', error);
        alert('Failed to assign task to project.');
      });
    } else {
      alert('Please select a project.');
    }
  }

  resetNewTask(): void {
    this.newTask = {
      id: 0,
      title: '',
      description: '',
      status: Status.NON_DEMARRE,
      startDate: new Date(),
      endDate: new Date(),
      priority: 0
    };
    this.selectedPerson = null; // Reset selected person
    this.selectedProjectId = null; // Reset selected project
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  assignUserToTask(): void {
    if (this.selectedUserId !== null && this.selectedTask !== null) {
      this.taskService.assignUserToTask(this.selectedUserId, this.selectedTask.id).subscribe(() => {
        alert('User assigned successfully!');
        this.selectedUserId = null;
        this.selectedTask = null;
        this.loadTasks();
      }, error => {
        console.error('Error assigning user:', error);
        alert('Failed to assign user.');
      });
    } else {
      alert('Please select a user and a task.');
    }
  }
}
