import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListprojectsService } from 'src/app/services/projects/Add+List/listprojects.service';
import { AdminUserListService } from 'src/app/services/users/AdminUserList/admin-user-list.service';
import { Project, User } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ListprojectsService,
    private userService: AdminUserListService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = Number(params.get('id'));
      this.loadProject(projectId);
      this.loadUsers();
    });
  }

  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe((data: Project) => {
      this.project = data;
    });
  }

  loadUsers(): void {
    this.userService.getAllAccounts().subscribe((users: User[]) => {
      this.users = users;
      this.filteredUsers = this.users.filter(user => 
        user.role !== 'DEVELOPER' && user.role !== 'TESTER' && user.role !== 'DESIGNER'
      );
    });
  }

  assignUserToProject(): void {
    if (this.project && this.selectedUserId !== null) {
      this.projectService.assignUserToProject(this.selectedUserId, this.project.id).subscribe(() => {
        alert('User assigned to project successfully!');
        if (this.project) {
          this.loadProject(this.project.id); // Refresh project details
        }
      }, error => {
        alert('Failed to assign user to project.');
      });
    } else {
      alert('Please select a user.');
    }
  }

  goBack(): void {
    window.history.back();
  }
}
