import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AdminUserListService } from 'src/app/services/users/AdminUserList/admin-user-list.service';

@Component({
  selector: 'app-waiting-for-acceptance',
  templateUrl: './waiting-for-acceptance.component.html',
  styleUrls: ['./waiting-for-acceptance.component.css']
})
export class WaitingForAcceptanceComponent implements OnInit {
  adminUsers: User[] = [];

  constructor(private adminUserListService: AdminUserListService) { }

  ngOnInit(): void {
    this.adminUserListService.getAdminUsers().subscribe((admins) => {
      this.adminUsers = admins;
    });
  }
}
