import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, Status } from 'src/app/models/project.model';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  task: Task = {
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
    private route: ActivatedRoute,
    private taskService: TasksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTask(taskId);
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe((data: Task) => {
      this.task = {
        ...data,
        startDate: new Date(data.startDate), // Ensure these are Date objects
        endDate: new Date(data.endDate)
      };
    });
  }

  updateTask(): void {
    const updatedTask = {
      ...this.task,
      startDate: this.task.startDate, // Send Date object directly
      endDate: this.task.endDate
    };
    this.taskService.updateTask(this.task.id, updatedTask).subscribe(() => {
      this.router.navigate(['/tasklist']);
    });
  }

  goBack(): void {
    this.router.navigate(['/tasklist']);
  }
}
