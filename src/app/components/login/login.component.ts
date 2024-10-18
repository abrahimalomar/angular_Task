
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import {  NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { AuthService } from '../../service/auth.service';
import { user } from '../../modal/user';
import { LoginResponse } from '../../modal/LoginResponse';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [   
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_ICONS, useValue: [UserOutline, LockOutline] }
  ],
 
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private message: NzMessageService) {
  
  }
  ngOnInit(): void {
 
    this.initFormLogin();
    
  }

  
  initFormLogin(){
    this.loginForm = this.fb.group({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  submitForm(): void {

    console.log('data ',this.loginForm.value);
    const userInfo=this.loginForm.value as user
    this.authService.login(userInfo).subscribe({
      next:(response:LoginResponse)=>{
        console.log('res',response);
        // localStorage.setItem("token", response.token);
        // localStorage.setItem("refreshToken", response.refreshToken);
        this.message.success('login successfully')
        this.router.navigate(['/dashboard/tags'])
      },
      error:(error)=>{
        console.log('error',error);
        
      }
    })
  }


}
