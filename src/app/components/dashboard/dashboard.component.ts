import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
     NzLayoutModule,
    CommonModule,
    FormsModule,
    NzLayoutModule,
    RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
