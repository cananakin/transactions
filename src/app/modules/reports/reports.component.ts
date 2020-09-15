import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
 
export interface ColuomInfo {
  count:number;
  total: number;
  currency: string;
}

const ELEMENT_DATA: ColuomInfo[] = [];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  myGroup: FormGroup;
  length: number;
  loadingFilterButton: boolean = false;
  isLoading: boolean = false;

  displayedColumns: string[] = [
    'count', 
    'total', 
    'currency'
  ];

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  constructor(
    private adminService: AdminService,
    private token: TokenStorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData(null);
    this.myGroup = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      merchant: new FormControl(''),
      acquirer: new FormControl('')
    })
  }

  getData (params) {
    this.isLoading = true;
    this.adminService.transtionsReport(params).subscribe(
      res => {
        this.dataSource = res.data;
        this.length = res.data.length;
        this.isLoading = false;
        this.loadingFilterButton = false;
      }, err => {
        console.warn('err',err.error.message);
        if(err.error.status === 'DECLINED' && err.error.message === 'Token Expired'){
          this.token.signOut();
          this.router.navigateByUrl('/login');
        }else if(err.error.status === 'DECLINED'){
          this.openSnackBar(err.error.message, 'x');
          this.isLoading = false;
          this.loadingFilterButton = false;
        }
      }
    )
  }

  querySubmit () {
    if(this.myGroup.value.fromDate === "" && this.myGroup.value.toDate === ""  && this.myGroup.value.merchant === "" || this.myGroup.value.acquirer === null){
      this.openSnackBar('You must write at least one input!', 'x');
    }else{
      this.loadingFilterButton = true;
      this.getData(this.myGroup.value);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  
}
