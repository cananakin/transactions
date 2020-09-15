import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  transId: any;
  transaction: any;
  constructor(
    private adminService: AdminService,
    private token: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { 
    this.route.params.subscribe(params => {
      this.transId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData () {
    this.adminService.transtion({transactionId: this.transId}).subscribe(
      res => {
        this.transaction = res;
      }, err => {
        if(err.error.status === 'DECLINED' && err.error.message === 'Token Expired'){
          this.token.signOut();
          this.router.navigateByUrl('/login');
        }
      }
    )
  }

  goBack () {
    this._location.back();
  }

}
