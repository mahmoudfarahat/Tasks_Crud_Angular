import { CreateTask } from './../../../../../../admin/src/app/dashboard/tasks-admin/context/DTOs';
 import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CreateAccount } from '../../context/Dtos';
import { LoginService } from '../../services/login.service';
import { group } from '@angular/animations';
import { ParseSourceFile } from '@angular/compiler';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder , private service: LoginService) { }

  registerForm!:FormGroup
  ngOnInit(): void {
    this.createForm()
  }

 createForm(){
  this.registerForm = this.fb.group({
    email : ['',[Validators.required, Validators.email]],
    password : ['',Validators.required],
    username : ['',Validators.required],
    confirmPassword : ['',Validators.required],
    role : ['user'],

  }, {validators:this.checkPassword})
 }

 createAccount(){
  const MODEL:CreateAccount =  {
    email:this.registerForm.value['email'],
    role:'user',
    username:this.registerForm.value['username'],
    password:this.registerForm.value['password'],

  }

  this.service.createUser(MODEL).subscribe(res => {
    console.log(res)
  })
  console.log(this.registerForm)
 }


 checkPassword:Validators = (group:AbstractControl):ValidationErrors | null => {
let password =  group.get("password")?.value
let confirmPassword =  group.get("confirmPassword")?.value
return  password ===  confirmPassword ?  null :{notSame :true}

 }
}
