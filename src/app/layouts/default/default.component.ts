import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  
  sidebarOpen = true;
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { 
    if (!this.tokenStorage.getToken()) {
      //this.router.navigateByUrl('/login');
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    
  }

  sidebarToggler() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
