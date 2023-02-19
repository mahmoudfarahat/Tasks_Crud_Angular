import { AuthInterceptor } from './../../../../admin/src/app/core/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { ErrorInterceptor } from './interceptor/error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      useClass:LoaderInterceptor,
      provide:HTTP_INTERCEPTORS,
      multi:true
    },
    {
      useClass:ErrorInterceptor,
      provide:HTTP_INTERCEPTORS,
      multi:true
    },
    {
      useClass:AuthInterceptor,
      provide:HTTP_INTERCEPTORS,
      multi:true
    },
  ]

})
export class CoreModule { }
