// src/app/components/admin-user-list/admin-user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminUserListService } from '../../../services/users/AdminUserList/admin-user-list.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  users: User[] = [];

  constructor(private adminUserListService: AdminUserListService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminUserListService.getAllAccounts().subscribe(
      (data: User[]) => {
        this.users = data.filter(user => user.role !== 'ADMIN');
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  allowToWork(user: User): void {
    this.adminUserListService.allowAccountToWork(user.id).subscribe(
      () => {
        this.loadUsers(); // Refresh the list after updating
      },
      (error) => {
        console.error('Error allowing user to work', error);
      }
    );
  }

  blockUser(user: User): void {
    this.adminUserListService.blockAccount(user.id).subscribe(
      () => {
        this.loadUsers(); // Refresh the list after updating
      },
      (error) => {
        console.error('Error blocking user', error);
      }
    );
  }
}
