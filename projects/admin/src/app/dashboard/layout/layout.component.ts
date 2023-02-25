import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  lang:any ='en'
  constructor(private translate:TranslateService, private router:Router) {
    this.lang = this.translate.currentLang
   }

  ngOnInit(): void {
  }
  changeLanguage(){
 if(this.lang == 'en'){
  localStorage.setItem('language','ar')
 }else{
  localStorage.setItem('language','en')
 }
 window.location.reload();

  }

  logout(){
this.router.navigate(['/login'])
localStorage.removeItem('token')
  }
}
