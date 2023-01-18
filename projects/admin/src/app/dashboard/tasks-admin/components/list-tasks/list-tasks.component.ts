import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadline',
    'status',
    'actions',
  ];
  dataSource: any = [];
  tasksFilter!: FormGroup;
  timeOutId: any;
  page:any = 1
  filteration: any = {
    page:this.page,
    limit:10
  };

  total:any
  users: any = [
    { name: 'Ali', id: '63c52a0b1fc4f216a370ba88' },
    { name: 'Moahmed', id: '63c529261fc4f216a370ba81' },


  ];

  status: any = [
    { name: 'Complete' },
    { name: 'In-Prossing'},
  ];

  constructor(
    private service: TasksService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private toastor: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getAllTasks();
  }

  createform() {
    // this.tasksFilter = this.fb.group({
    //   title:[''],
    //   userId:[''],
    //   fromDate:[''],
    //   toDate:['']
    // })
  }
  mappingTasks(data: any) {
    let newTasks = data.map((item: any) => {
      return {
        ...item,
        user: item.userId.username,
      };
    });
    return newTasks;
  }

  updateTask(element: any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: element,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTasks();
      }
    });
  }
  selectData(event:any , type:any){

this.filteration[type] = moment(event.value).format('DD-MM-YYYY')
console.log(this.filteration  )
console.log(type), console.log(this.filteration['toDate'])
if(type=="toDate" && this.filteration['toDate'] !='Invalid date' )
{
  this.getAllTasks();
}

  }
  deleteTask(id: any) {

    this.service.deleteTask(id).subscribe(
      (res) => {

        this.toastor.success('Deleted Successfully');
        this.getAllTasks();
      },
      (error) => {
        console.log(error);
        this.toastor.error(error.error.massage);

      }
    );
  }
  search(event: any) {
    this.filteration['keyword'] = event.value;
    this.page =1
    this.filteration['page']=1
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }

  selectUser(event:any){
    this.page =1
    this.filteration['page']=1
    this.filteration['userId'] = event.value
    console.log(event)
    this.getAllTasks()
  }
  selectStatus(event:any){
    this.page =1
    this.filteration['page']=1
    this.filteration['status'] = event.value
    this.getAllTasks()

  }

  getAllTasks() {

    this.service.getAllTasks(this.filteration).subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource = this.mappingTasks(res.tasks);
        this.total = res.totalItems

      },
      (error) => {
        console.log(error);
        this.toastor.error(error.error.massage);
        
      }
    );
  }

  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTasks();
      }
    });
  }
  changePage(event:any){
    this.page =event
    this.filteration['page']=event
    this.getAllTasks()
  }
}
