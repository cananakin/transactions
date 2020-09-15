import { OnInit, Component, ViewChild, AfterViewInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface ColuomInfo {
  fxMerchantOriginalAmount: any;
  fxMerchantOriginalCurrency: string;
  customerInfoNumber: string;
  customerInfoEmail: string;
  customerInfoBillingFirstName: string;
  customerInfoBillingLastName: string;
  merchantId:number;
  merchantName: string;
  ipnReceived: number;
  transactionMerchantReferenceNo: string;
  transactionMerchantStatus: string;
  transactionMerchantOperation:string;
  transactionMerchantMessage: string;
  transactionMerchantCreated_at: string,
  transactionMerchantTransactionId: string;
  acquirerId: number;
  acquirerName: string;
  acquirerCode: string;
  acquirerType: string;
  refundable: boolean;
}

const ELEMENT_DATA: ColuomInfo[] = [];

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TransactionsComponent implements OnInit {
  myGroup: FormGroup;
  per_page: number;
  length: number;
  current_page: number;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  nextPage: boolean = false;
  previousPage: boolean = false;
  
  loadingFilterButton: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = [
    'fxMerchantOriginalAmount', 
    'fxMerchantOriginalCurrency', 
    'customerInfoNumber', 
    'customerInfoEmail',
    'customerInfoBillingFirstName',
    'customerInfoBillingLastName',
    'merchantId',
    'merchantName',
    'ipnReceived',
    'transactionMerchantReferenceNo',
    'transactionMerchantStatus',
    'transactionMerchantOperation',
    'transactionMerchantMessage',
    'transactionMerchantCreated_at',
    'transactionMerchantTransactionId',
    'acquirerId',
    'acquirerName',
    'acquirerCode',
    'acquirerType',
    'refundable',
    'star'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private adminService: AdminService,
    private token: TokenStorageService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getData(null);
    this.myGroup = new FormGroup({
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
      status: new FormControl(''),
      operation: new FormControl(''),
      merchantId: new FormControl(''),
      acquirerId: new FormControl(''),
      paymentMethod: new FormControl(''),
      errorCode: new FormControl(''),
      filterField: new FormControl(''),
      filterValue: new FormControl('')
    })
  }

  getData (params) {
    this.isLoading = true;
    
    if(params !== null && params?.operation !== "" && params.operation.length !== 1){
      params.operation = params.operation.split();
      console.log(params.operation.length)
    }
    this.adminService.transtionList(params).subscribe(
      res => {
        if(res?.status === 'DECLINED'){
          this.openSnackBar(res.message, 'x');
        }else{
          this.per_page = res.per_page;
          this.current_page = res.current_page;
          this.next_page_url = res.next_page_url;
          this.prev_page_url = res.prev_page_url;
          this.from = res.from;
          this.to = res.to;
          this.dataSource = res.data;
          this.length = res.data.length;
          
          if(res.next_page_url !== null) {
            this.nextPage = true;
          }
          if(res.prev_page_url !== null) {
            this.previousPage = true;
          }
        }
        
        this.loadingFilterButton = false;
        this.isLoading = false;
      }, err => {
        if(err.error.status === 'DECLINED' && err.error.message === 'Token Expired'){
          this.token.signOut();
          this.router.navigateByUrl('/login');
        }else{
          this.openSnackBar(err.error.message, 'x');
          console.log(err.error.message);
          this.loadingFilterButton = false;
          this.isLoading = false;
        }
      }
    )
  }

  querySubmit () {
    if(this.myGroup.value.fromDate === "" && this.myGroup.value.toDate === "" && this.myGroup.value.status === ""
        && this.myGroup.value.operation === "" && this.myGroup.value.merchantId === "" && this.myGroup.value.acquirerId === ""
        && this.myGroup.value.paymentMethod === "" && this.myGroup.value.errorCode === "" && this.myGroup.value.filterField === ""
        && this.myGroup.value.filterValue === "" ){
        this.openSnackBar('You must write at least one input!', 'x');
    }else{
      this.loadingFilterButton = true;
      this.getData(this.myGroup.value);
    }
  }

  nextPageHandle () {
    const page = this.current_page + 1;
    this.getData({...this.myGroup.value, page: page });
  }
  
  previousPageHandle () {
    const page = this.current_page - 1;
    this.getData({...this.myGroup.value, page: page });
  }

  detailTransaction (id) {
    console.log(id);
    this.router.navigateByUrl('/admin/transaction/' + id);
  }
  
  clientTransaction (id) {
    console.log(id);
    this.router.navigateByUrl('/admin/client/' + id);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
