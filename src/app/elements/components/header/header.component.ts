import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  signOut () {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/login');
  }

}
