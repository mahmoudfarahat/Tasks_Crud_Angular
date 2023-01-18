import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { CreateTask } from './../../context/DTOs';

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private service: TasksService,
    private toastor: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  users: any = [
    { name: 'Moahmed', id: '63c529261fc4f216a370ba81' },
    { name: 'Ali', id: '63c52a0b1fc4f216a370ba88' },
  ];

  fileName = '';
  newTaskForm!: FormGroup;
  formValues:any
  ngOnInit(): void {
    console.log(this.data);
    this.createForm();
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required, Validators.minLength(5)]],
      userId: [this.data?.userId?._id || '', Validators.required],
      image: [this.data?.image ||'', Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [this.data? new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '', Validators.required],
    });

this.formValues = this.newTaskForm.value

  }
  updateTask(){
    this.spinner.show();
    let model = this.prepareFormData();
    this.service.updateTask(model,this.data._id).subscribe(
      (res: any) => {
        console.log(res);
        this.toastor.success(res.massage, 'Success');
        this.spinner.hide();
        this.dialog.close(true);
      },
      (error) => {
        console.log(error);
        this.toastor.error(error.error.massage);
        this.spinner.hide();
      }
    );
  }
  createTask() {
    this.spinner.show();
    let model = this.prepareFormData();
    this.service.createTask(model).subscribe(
      (res: any) => {
        console.log(res);
        this.toastor.success(res.massage, 'Success');
        this.spinner.hide();
        this.dialog.close(true);
      },
      (error) => {
        console.log(error);
        this.toastor.error(error.error.massage);
        this.spinner.hide();
      }
    );
  }
  prepareFormData() {
    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(
          key,
          moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY')
        );
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }
  selectImage(event: any) {
    this.fileName = event.target.value;
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
    console.log(event);
  }

  close(){
    let hasChanges =false

    Object.keys(this.formValues).forEach((item ) =>{
        if(this.formValues[item]!== this.newTaskForm.value[item])
        {
          hasChanges =true
        }
    })
    console.log(hasChanges)
    if(hasChanges)
    {
      const dialogRef = this.matDialog.open(ConfirmationComponent, {
        width: '750px',

      });

      dialogRef.afterClosed().subscribe(result => {
        if(result) {

        }
      })
    }else{
      this.dialog.close();
    }
  }
}
