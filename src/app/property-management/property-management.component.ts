import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { AddPropertyService } from '../add-property.service';
import { AddPropertyComponent } from '../add-property/add-property.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.scss'],
})
export class PropertyManagementComponent implements OnInit {
  sendValue!: string;
  dialogValue!: string;

  propertyData: any;

  displayedColumns: string[] = ['name', 'description', 'size', 'delete'];
  dataSource!: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private service: AddPropertyService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getPropertyData();
  }

  getPropertyData() {
    this.service
      .getProperty()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.propertyData = res;
          this.dataSource = res;
          console.log(this.propertyData, 'get Data from GET PROPERTY DATA');
        },
      });
  }

  addPropertyData(reqBody: any) {
    this.service
      .addProperty(reqBody)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log('Data Added Successfully', res);
          this.getPropertyData();
        },
        error: (err) => {
          console.log('Data Not Added', err);
        },
      });
  }

  onEdit(row: any) {
    console.log(row, 'rowwww');
    this.openDialog();
  }

  addProperty() {
    this.openDialog();
  }

  propertyID = '';
  deleteProperty(row: any) {
    this.openDeleteDialog();
    console.log(row, 'rowwww');
    this.propertyID = row._id;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      width: '500px',
      // data: {
      //   data: this.sendValue,
      // },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.dialogValue = result.data;
      this.addPropertyData(this.dialogValue);
      this.getPropertyData();
    });
  }

  deletePropertyService(id: any) {
    this.service
      .deleteProperty(id)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log('Deleted Successfully');
          this.getPropertyData();
        },
        error: (err) => {
          console.log('Error from delete', err);
        },
      });
  }

  isDelete: any = '';
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      // data: this.isDelete,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isDelete = result.data;
      if (this.isDelete == 'YES') {
        this.deletePropertyService(this.propertyID);
      }
    });
  }
}
