import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../form/form.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  data: Student[] = JSON.parse(localStorage.getItem('formdata')as any);
  i: number;

  //table
  displayedColumns = [
    'name',
    'gender',
    'hobbie',
    'cars',
    'add',
    'date',
    'action',
  ];
  id: any;

  //paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Student>(
    JSON.parse(localStorage.getItem('formdata') as any)
  );

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    // this.data = this.data.slice();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.route.params.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    
  }

  delete(id){
    for(let i=0; i < this.data.length;i++){
      if(this.data[i].id==id){
    this.data.splice(i,1);
    localStorage.setItem('formdata',JSON.stringify(this.data));
   this.data = this.data.slice();
  }
}
 }


  edit(id: any) {
    this.router.navigate(['/form', id]);
    JSON.parse(localStorage.getItem('formdata') as any);
  }

  view(subAry: any) {
    this.dialog.open(DialogComponent, {
      data: subAry,
    });
  }
  //searchBar
  search() {
    let searchobj = JSON.parse(localStorage.getItem('formdata') as any);
    let i = searchobj.findIndex((x: { id: any }) => x.id === this.id);

    if (this.id == '') {
      this.ngOnInit();
    } else {
      this.data = this.data.filter((res) => {
        return res.id.toLocaleString().match(this.id.toLocaleLowerCase());
      });
    }
  }
}
