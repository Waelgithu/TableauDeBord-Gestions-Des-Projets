import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, Status } from 'src/app/models/project.model';
import { ListprojectsService } from 'src/app/services/projects/Add+List/listprojects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  project: Project | null = null;
  statusOptions = Object.values(Status);

  constructor(
    private projectsService: ListprojectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectsService.getProjectById(id).subscribe((data: Project) => {
      this.project = data;
    });
  }

  saveChanges(): void {
    if (this.project) {
      this.projectsService.updateProject(this.project.id, this.project).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
