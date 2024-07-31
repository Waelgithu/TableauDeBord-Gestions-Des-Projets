import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { AdminUserListService } from 'src/app/services/users/AdminUserList/admin-user-list.service';
import { Task, User } from 'src/app/models/project.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: Task | null = null;
  users: User[] = [];
  filteredUsers: User[] = []; // Add filtered users array
  selectedUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TasksService,
    private userService: AdminUserListService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const taskId = Number(params.get('id'));
      this.loadTask(taskId);
      this.loadUsers();
    });
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe((data: Task) => {
      this.task = data;
    });
  }

  loadUsers(): void {
    this.userService.getAllAccounts().subscribe((users: User[]) => {
      this.users = users;
      this.filteredUsers = this.users.filter(user => user.role !== 'ADMIN'); // Filter out admin users
    });
  }

  assignUserToTask(): void {
    if (this.task && this.selectedUserId !== null) {
      this.taskService.assignUserToTask(this.selectedUserId, this.task.id).subscribe(() => {
        alert('User assigned to task successfully!');
        if (this.task) {
          this.loadTask(this.task.id); // Refresh task details
        }
      }, error => {
        alert('Failed to assign user to task.');
      });
    } else {
      alert('Please select a user.');
    }
  }

  goBack(): void {
    window.history.back();
  }
}
