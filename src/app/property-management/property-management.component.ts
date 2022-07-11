import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { AddPropertyService } from '../add-property.service';
import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.scss'],
})
export class PropertyManagementComponent implements AfterViewInit, OnInit {

  sendValue!: string;
  dialogValue!: string;

  propertyData: any;

  displayedColumns: string[] = [
    'name',
    'description',
    'size',
    'delete',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private service: AddPropertyService) {
    this.dataSource = new MatTableDataSource(this.propertyData);
  }
  ngOnInit(): void {
    this.getPropertyData();
  }

  getPropertyData(){
    this.service.getProperty()
    .pipe(first())
    .subscribe(
      {
        next: (res) => {
          // this.dataSource = new MatTableDataSource(this.propertyData);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          this.propertyData = res;
          console.log(this.propertyData, "get Data from GET PROPERTY DATA");
        }
      }
    )
  }

  addPropertyData(reqBody:any){
    this.service.addProperty(reqBody)
    .pipe(first())
    .subscribe( {
      next: (res) => {
        console.log("Data Added Successfully", res);

      },
      error: (err) => {
        console.log("Data Not Added" , err);

      }
    });

    this.getPropertyData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.getPropertyData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(row: any) {
    console.log(row, 'rowwww');
    this.openDialog();
  }

  addProperty() {
    this.openDialog();
  }

  deleteProperty(index:number){
    // console.log(index, 'rowwww');
    // this.propertyData.splice();
    // this.propertyData.filter((q:any, i:any) => index != i ?? q);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      width: '500px',
      data: {
        pageValue: this.sendValue,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dialogValue = result.data;
      this.addPropertyData(this.dialogValue);

    });
  }
}
