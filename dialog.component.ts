import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Student,Subject } from '../form/form.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  // formsubject: any;
  // formmarks: any;
myprop!:string;

  constructor(private dialog:MatDialog,
     @Inject(MAT_DIALOG_DATA)public data:any) { 
    }


  //data: Student[];




  ngOnInit(): void {
   console.log(this.data)
  }


}
