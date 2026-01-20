import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientCard } from './patient-card/patient-card';
import { PatientService } from './services/patient-service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UpperCasePipe, PatientCard, FormsModule, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Forma tradicional de inyección de dependencias
  constructor(private patientService: PatientService) {
    // this.patients$ = this.patientService.getPatients();
    this.patients$ = this.patientService.patients$;

  }

  patients$: Observable<Patient[]>;
  name: string = '';

  
  addPatient() {
    this.patientService.addPatient(this.name);
    // this.patients = this.patientService.getPatients();
  }
}
