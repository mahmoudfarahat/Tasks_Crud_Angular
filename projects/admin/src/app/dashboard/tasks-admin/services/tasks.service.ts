import { environment } from './../../../../environments/environment.prod';
import { CreateTask } from './../context/DTOs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getAllTasks()
  {
    // let headers = new HttpHeaders()
    // headers= headers.append('Authorization', localStorage.getItem('token')!)
    // return this.http.get('https://crud-xke3.onrender.com/tasks/all-tasks',{headers})
      return this.http.get( environment.baseApi + '/all-tasks' )

  }
  createTask(model:any)
  {
    return this.http.post(environment.baseApi + '/add-task' , model)
  }
}
