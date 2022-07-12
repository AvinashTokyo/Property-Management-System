import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

  addPropertyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.addPropertyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required],
    })
  }

  onAdd(){
    this.data = this.addPropertyForm.value;
    this.addPropertyForm.reset();
    this.dialogRef.close({
      event: 'close',
      data: this.data
    });
  }

}
