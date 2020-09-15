import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { 
    if (this.tokenStorage.getToken()) {
      this.router.navigateByUrl('admin');
    }
  }

  ngOnInit(): void {
  }

}
