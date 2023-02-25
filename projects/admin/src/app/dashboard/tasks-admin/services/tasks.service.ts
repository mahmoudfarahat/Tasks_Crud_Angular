import { environment } from './../../../../environments/environment.prod';
import { CreateTask } from './../context/DTOs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasks(filter:any) {
    // let headers = new HttpHeaders()
    // headers= headers.append('Authorization', localStorage.getItem('token')!)
    // return this.http.get('https://crud-xke3.onrender.com/tasks/all-tasks',{headers})

let params = new HttpParams()
Object.entries(filter).forEach(([key,value]:any) =>{
  if(value)
  {
    params = params.append(key,value )
  }

})

    return this.http.get(environment.baseApi + '/all-tasks' , {params});
  }
  createTask(model: any) {
    return this.http.post(environment.baseApi + '/add-task', model);
  }
  updateTask(model: any, id: any) {
    return this.http.put(environment.baseApi + '/edit-task/' + id, model);
  }
  deleteTask(id: any) {
    return this.http.delete(environment.baseApi + '/delete-task/' + id);
  }
}
