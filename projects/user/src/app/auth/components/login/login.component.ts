import { ToastrService } from 'ngx-toastr';
import { LoginService } from './../../../../../../admin/src/app/auth/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private loginService:LoginService, private router:Router ,private toaster :ToastrService) { }

  loginForm! : FormGroup
  ngOnInit(): void {
this.createForm()
  }

createForm(){
  this.loginForm = this.fb.group({
    email: ['', [Validators.required , Validators.email]],
    password:['', [Validators.required]],
    role:['user']
  })
}


login(){
this.loginService.login(this.loginForm.value).subscribe(a => {
  this.router.navigate(['/tasks'])
  this.toaster.success("Login Success","Success")
})
}
}
