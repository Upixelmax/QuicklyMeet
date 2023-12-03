import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { HeaderHomeSolicitanteComponent } from './header-home-solicitante/header-home-solicitante.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderHomeComponent,
    HeaderHomeSolicitanteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderHomeComponent,
    HeaderHomeSolicitanteComponent
  ]
  
})
export class SharedModule { }
