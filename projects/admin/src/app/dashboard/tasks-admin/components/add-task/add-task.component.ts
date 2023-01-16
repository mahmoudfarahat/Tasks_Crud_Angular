import { ToastrService } from 'ngx-toastr';
import { CreateTask } from './../../context/DTOs';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {


  constructor(private fb:FormBuilder , public dialog: MatDialogRef<AddTaskComponent> , public matDialog:MatDialog,
    private service:TasksService, private toastor: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  users:any = [
    {name:"Moahmed" , id:'63c529261fc4f216a370ba81'},
    {name:"Ali" , id:'63c52a0b1fc4f216a370ba88'},

  ]
  fileName =""
  newTaskForm!: FormGroup;
  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.newTaskForm = this.fb.group({
      title:['',Validators.required , Validators.minLength(5)],
      userId:['',Validators.required],
      image:['',Validators.required],
    description:['',Validators.required],
    deadline:['',Validators.required],
    })
  }

  createTask()
  {
    this.spinner.show();
   let model = this.prepareFormData();
// let formData = new FormData();
// formData.append('title',this.newTaskForm.value['title'])
// formData.append('userId',this.newTaskForm.value['userId'])
// formData.append('image',this.newTaskForm.value['image'])
// formData.append('description',this.newTaskForm.value['description'])
// formData.append('deadline',this.newTaskForm.value['deadline'])

  this.service.createTask(model).subscribe((res:any) => {
    console.log(res)
this.toastor.success(res.massage,"Success")
this.spinner.hide();
this.dialog.close(true);
  }, error => {
    console.log(error)
    this.toastor.error(error.error.massage)
this.spinner.hide();

    })
  }
prepareFormData(){

  let formData = new FormData()
  Object.entries(this.newTaskForm.value).forEach(([key,value] :any) =>{
    if(key =='deadline')
    {
      formData.append(key,moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY'))
    }else{
      formData.append(key,value)
    }

  })

  return formData;
}
  selectImage(event : any)
{
  this.fileName =event.target.value
  this.newTaskForm.get('image')?.setValue(event.target.files[0])
  console.log(event)
}
}
