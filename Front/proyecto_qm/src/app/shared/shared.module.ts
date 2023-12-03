import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderHomeComponent } from './header-home/header-home.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderHomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderHomeComponent
  ]
  
})
export class SharedModule { }
