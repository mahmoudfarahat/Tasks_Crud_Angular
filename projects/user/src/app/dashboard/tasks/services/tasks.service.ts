import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getUserTasks(userId:string,tasksParams:any){
    let params = new HttpParams()
Object.entries(tasksParams).forEach(([key,value]:any) =>{
  if(value)
  {
    params = params.append(key,value )
  }

})
    return this.http.get(environment.baseApi+ '/user-tasks/'+ userId , {params})
  }
}
