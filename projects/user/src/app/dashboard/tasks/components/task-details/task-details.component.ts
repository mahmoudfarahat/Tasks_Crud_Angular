import { ToastrService } from 'ngx-toastr';
 import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
taskId:any
taskDetails:any
  constructor(private route:ActivatedRoute, private tasksService:TasksService,
    private toastr:ToastrService, private router:Router) {
this.route.paramMap.subscribe((res:any) => {
  this.taskId =res.params['id']
})

  }
  ngOnInit(): void {
    this.getTasksDetails()
  }

  getTasksDetails(){
this.tasksService.tasksDetails(this.taskId).subscribe((res:any) => {
  this.taskDetails =res.tasks
  console.log(res)
})
  }
  complete( ){
    const MODEL = {
      id:this.taskId
    }
this.tasksService.completeTasks(MODEL).subscribe(res =>{
  this.router.navigate(['/tasks'])
  this.toastr.success('Task Complete Successfully','success')
})
  }
}
