import { HttpClient } from '@angular/common/http';
import { Injectable, signal, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private URLBase = 'http://localhost:3000/patients';
  private _patiensSubject = new BehaviorSubject<Patient[]>([]);
  patients$ = this._patiensSubject.asObservable();

  private httpClient: HttpClient = inject(HttpClient);
  constructor() {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.httpClient.get<Patient[]>(this.URLBase).subscribe({
      next: (patients) => this._patiensSubject.next(patients),
      error: (error) => console.log('Error obteniendo pacientes: ', error)
    });
  }

  addPatient(name: string) {
    const newPatient = {
      id: Date.now().toString(),
      name,
      infection: 0
    }
    this.httpClient.post<Patient>(this.URLBase, newPatient)
      .subscribe({
        next: (patient) => {
          // this.fetchPatients(),
          const currentPatients = this._patiensSubject.getValue();
          this._patiensSubject.next([...currentPatients, patient]);
        },
        error: (error) => console.log('Error añadiendo paciente: ', error)
      });
  }

  deletePatient(id: string) {
    this.httpClient.delete<Patient>(`${this.URLBase}/${id}`)
      .subscribe({
        next: () => {
          // this.fetchPatients(),
          const currentPatients = this._patiensSubject.getValue();
          const updatedPatients = currentPatients.filter(patient => patient.id !== id);
          this._patiensSubject.next(updatedPatients);
        },
        error: (error) => console.log('Error eliminando paciente: ', error)
      });
  }

  curePatient(id: string) {
    const currentPatients = this._patiensSubject.getValue();
    const patientToCure = currentPatients.find(patient => patient.id === id);
    if (patientToCure) {
      const infectionLevel = patientToCure.infection;
      const curedInfectionLevel = infectionLevel - 10 < 0 ? 0 : infectionLevel - 10;
      const updatedPatient = { ...patientToCure, infection: curedInfectionLevel };
      this.httpClient.put<Patient>(`${this.URLBase}/${id}`, updatedPatient)
        .subscribe({
          next: (patient) => {
            // this.fetchPatients(),
            const updatedPatients = currentPatients.map(p => p.id === id ? patient : p);
            this._patiensSubject.next(updatedPatients);
          },
          error: (error) => console.log('Error curando paciente: ', error)
        });
    }
  }
}
