import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/model/role';
import { RoleService } from 'src/app/services/role.service';
import { LanguageApp } from 'src/app/variables/LenguageApp';
import swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  titleSingular : string = 'Rol';
  titlePlural : string = 'Roles';
  listModel : Role[] = [];
  dtOptions: any;
  iconText: string = 'fa-tag';

  constructor(private roleService : RoleService) { }

  ngOnInit(): void {
    this.get();
  }

  public get() : void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: LanguageApp.spanish_datatables,
      pageLength: 10,
    };

    this.roleService.get().subscribe( res => {
      this.listModel = res;
    });
  }
  
  public delete(role : Role) : void {
    this.roleService.delete(role.idRole).subscribe( response => {
      if (response.status == 200) {
        if (role.status > 0) {
          swal('Registro Deshabilitado', '', 'success');   
        } else {
          swal('Registro Habilitado', '', 'success');
        }
        this.get();
      } else {
        swal('Error', response.message, 'error');
      }
    });
  }
}
