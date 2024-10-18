import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './service/loading.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,
    NzSpinModule,
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'angularTask';
  // constructor(public loadingService: LoadingService) {}
  isLoading = false;  
  private loadingSubscription!: Subscription;

  constructor(public loadingService: LoadingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe(
    {
      next:(loading)=>{
          this.isLoading = loading;
          this.cdr.detectChanges();
      },
      error:(error)=>{
        console.log('error',error);
        
      }
    }
    );
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
  
}