import { ErrorInterceptor } from './interceptor/error.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:LoaderInterceptor,
    multi:true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
  }
  ]
})
export class CoreModule { }
