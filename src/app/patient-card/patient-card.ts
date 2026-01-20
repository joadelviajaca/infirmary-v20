import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-patient-card',
  imports: [UpperCasePipe],
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.css',
})
export class PatientCard {
  @Input() patient !: Patient; 
  @Output() onDarDeBaja : EventEmitter<string> = new EventEmitter<string>();
  @Output() onAdministrarCura : EventEmitter<Patient> = new EventEmitter<Patient>();

  get color():string{
    return this.patient.infection > 50 ? 'red' : 'lime';
  }

  administrarCura(patient:Patient){
    this.onAdministrarCura.emit(patient);
  }
   
  darDeBaja(id:string){
    this.onDarDeBaja.emit(id);
  }

}
