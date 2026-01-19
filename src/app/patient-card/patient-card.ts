import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-patient-card',
  imports: [UpperCasePipe],
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.css',
})
export class PatientCard {
  @Input() patient !: Patient; 

  administrarCura(patient:Patient){}
   
  darDeBaja(id:string){}

}
