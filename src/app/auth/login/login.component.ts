import { Component, OnInit } from '@angular/core';
//import { Login } from '../login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  myGroup: FormGroup;
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  loading = false;
  
  constructor(
    private authService:AuthServiceService, 
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { 
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),//updateOn: 'blur'
      password: new FormControl('', [Validators.required])
    })
  }

  loginProcess() {
    this.loading = true;
    if(this.myGroup.valid) {
      this.authService.login(this.myGroup.value).subscribe(
        res => {
          if(res.status === "APPROVED"){
            this.tokenStorage.saveToken(res.token);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.loading = false;
            this.router.navigateByUrl('/admin');
          }else{
            this.errorMessage = 'Sorry! We get some error';
            this.isLoginFailed = true;
            this.loading = false;
          }
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.loading = false;
        }
      )
    }else {
      console.log('error');
    }
    
  }

}
