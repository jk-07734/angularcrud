import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Associate } from '../../_shared/associate';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { associateModel } from '../../../model/associate';
import { v4 as uuidv4 } from 'uuid';
import { toast, NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-add',
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add implements OnInit, OnDestroy {
  _form!: FormGroup;
  dialogdata: any;
  title = 'Add Associate';
  isadd = true;
  constructor(private service: Associate, private builder: FormBuilder,
    private ref: MatDialogRef<Add>, @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    this._form = this.builder.group({
      // id: this.builder.control({ disabled: true, value: 0 }),
      name: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2)])),
      department: this.builder.control('', Validators.required),
      salary: this.builder.control(0, Validators.required),
      status: this.builder.control(true),
    })
    if (this.dialogdata && this.dialogdata.id != null) {
      this.title = 'Edit Associate';
      this.isadd = false;
      this._form.patchValue({
        name: this.dialogdata.name,
        department: this.dialogdata.department,
        salary: this.dialogdata.salary,
        status: this.dialogdata.status
      });
    }
  }
  ngOnDestroy(): void {

  }
  close() {
    this.ref.close();
  }
  save() {
    if (this._form.valid) {
      let raw = this._form.getRawValue();
      let _data: associateModel = {
        // id: raw.id as string,
        id: this.isadd ? uuidv4().split('-')[0] : this.dialogdata.id,
        name: raw.name as string,
        department: raw.department as string,
        salary: raw.salary as number,
        status: raw.status as boolean
      }
      if (this.isadd) {
        this.service.Create(_data).subscribe(item => {
          // alert('Saved.')
          toast.dismiss();
          toast.success('Added succesfully');
          this.close();
        })
      } else {
        this.service.Update(_data).subscribe(item => {
          // alert('Updated.')
          toast.dismiss();
          toast.success('Changes saved successfully.');
          this.close();
        })
      }
    }
  }
}
