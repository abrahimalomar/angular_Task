import { Component, OnInit } from '@angular/core';
import { MenuFoldOutline, MenuUnfoldOutline, FileOutline, ProjectOutline, TagOutline, AppstoreOutline } from '@ant-design/icons-angular/icons';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent  {
  isCollapsed = false;
 

  constructor(private iconService: NzIconService,    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.iconService.addIcon(...[MenuFoldOutline, MenuUnfoldOutline,AppstoreOutline, ProjectOutline, TagOutline, FileOutline]);
  }

}
