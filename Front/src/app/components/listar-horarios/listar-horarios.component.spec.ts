import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHorariosComponent } from './listar-horarios.component';

describe('ListarHorariosComponent', () => {
  let component: ListarHorariosComponent;
  let fixture: ComponentFixture<ListarHorariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarHorariosComponent]
    });
    fixture = TestBed.createComponent(ListarHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
