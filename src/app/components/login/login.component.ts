
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import {  NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline, EyeInvisibleOutline, EyeOutline } from '@ant-design/icons-angular/icons';
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
  isPasswordVisible = false;
  isLoading:boolean=false;
  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private message: NzMessageService,
    private iconService: NzIconService) {
      this.iconService.addIcon(UserOutline, LockOutline,EyeOutline, EyeInvisibleOutline);
  }
 
  ngOnInit(): void {
 
    this.initFormLogin();
    
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  initFormLogin(){
    this.loginForm = this.fb.group({
      UserName: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  login(): void {
    if (this.authService.isLoggedIn() && !this.authService.isTokenExpired()) {
      this.message.warning("already loggIn")
      this.router.navigate(['/dashboard']);
    }else{
      console.log('data ',this.loginForm.value);
      const userInfo=this.loginForm.value as user
      this.isLoading=true;
      console.log('isLoading',this.isLoading);
      
      this.authService.login(userInfo).subscribe({
        next:(response:LoginResponse)=>{
          console.log('res',response);
          // localStorage.setItem("token", response.token);
          // localStorage.setItem("refreshToken", response.refreshToken);
          this.isLoading=false;
          this.message.success('login successfully')
          this.router.navigate(['/dashboard/tags'])
        },
        error:(error)=>{
          this.isLoading=false;
          console.log('error',error);
          
        }
      })
    }
   
  }
}