import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl,FormGroup,FormBuilder,FormArray,Validators, FormArrayName } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Student, Subject } from './form.model';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

 
  editid!: number;
  // sendValue: any;
  // marksValue: any;
  // dialogValue: any;
  // maxValue: any;
  data=new Student();

  constructor(private _snackBar: MatSnackBar,private router:Router,private activatedroute : ActivatedRoute,
    private formBuilder: FormBuilder,private dialog:MatDialog)    { 
    this.activatedroute.params.subscribe((data : any )=> {
      if(data && data.id)
      {
        this.editid=Number(data.id)
      }
    });
    // this.myform = this.formBuilder.group({
    //   website: this.formBuilder.array([], [Validators.required])
    // })
  }
 
  //myform!: FormGroup;
//checkbox
  checkboxJson=[{
    id:1,
    label:'Reading',
    checked:false
},
{
  id:2,
  label:'dancing',
  checked:false
},
{
  id:3,
  label:'playing',
  checked:false
},
{
  id:4,
  label:'Singing',
  checked:false
},
];


  
// openDialog() : void{
//   const dialogRef = this.dialog.open(DialogComponent,{
//     width : '250px',
//     backdropClass : 'custom-dialog-backdrop-class',
//     panelClass : 'custom-dialog-panel-class',
//     data: { pageValue : this.sendValue, dotValue: this.marksValue}
//   })
//   dialogRef.afterClosed().subscribe(result =>{
//     this.dialogValue = result.data;
//     this.maxValue= result.data;
//   });
//    this.dialog.open(DialogComponent)
// }
              //add subject     Reactive Forms

// admin=this.formBuilder.group({
//   subject:new FormControl('',[Validators.required]),
//   marks:new FormControl('',[Validators.required])
// });
// company=this.formBuilder.group({
//   admins:this.formBuilder.array([])

// })
//  get admins(){
//   return this.company.controls["admins"] as FormArray;
//  }
 addsubject(){
  //this.admins.push(this.admin)
  this.data.subAry.push(new Subject())
 }
 deletesubject(i:number){
  //this.admins.removeAt(this.admin)
  // this.data.subAry.pop()
  this.data.subAry.splice(i,1)
 }


//snackBar
 openSnackBar() {
   this._snackBar.open("saved succesfully!..");
 }

//save data
sdata(){

  //edit
  if(this.editid){
    let editobject=JSON.parse(localStorage.getItem('formdata')as any);

    //checkbox
    const selected=this.checkboxJson.filter(p=>p.checked).map(x=>x.label);
    this.data.hobbie=selected.join(',')

    let i=editobject.findIndex((x: {id:any;})=>x.id === this.editid);
    editobject[i]=this.data;
    localStorage.setItem("formdata",JSON.stringify(editobject))
 
  }  
  else{
        //checkbox
  const selected=this.checkboxJson.filter(p=>p.checked).map(x=>x.label);
  console.log(selected)


    let jsonarray=JSON.parse(localStorage.getItem('formdata')as any);
    if(!jsonarray){
      jsonarray=[];
    }
   random :   this.data.id=Math.floor(Math.random()*100)
    this.data.hobbie=selected.join(',')//checkbox value save in localstorage
    jsonarray.push(this.data);
    let x = localStorage.setItem('formdata',JSON.stringify(jsonarray));
    console.log(x)
  }
  //console.log(this.myform.value);
}

showdata(){
  this.router.navigate(['/list']);
}

//index find
  ngOnInit(): void {
    if(this.editid){
      let jsonarray=JSON.parse(localStorage.getItem('formdata')as any);
      if(jsonarray){
     let object=jsonarray.find((x:{ id:number})=>x.id==this.editid)
          if(object){
           this.data=object
         }
       }
      }
  }

}
