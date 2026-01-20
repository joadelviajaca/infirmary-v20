import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  private _patientsSubject: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([
    { id: "1", name: 'Marcus Fenix', infection: 15, status: 'estable' },
    { id: "2", name: 'Sarah Connor', infection: 85, status: 'critico' },
    { id: "3", name: 'Ellen Ripley', infection: 0, status: 'estable' }
  ])

  patients$ = this._patientsSubject.asObservable();


  getPatients(): Observable<Patient[]> {
    return this._patientsSubject.asObservable();
  }

  addPatient(name: string) {
    const newPatient: Patient = {
      id: Date.now().toString(),
      name,
      infection: 0,
      status: 'estable'
    }
    const actualPacients = this._patientsSubject.value;
    actualPacients.push(newPatient);
    this._patientsSubject.next(actualPacients)
    // this.patients.push(newPatient);
  }

  deletePatient(id: string) {
    this._patientsSubject.next(this._patientsSubject.value.filter(patient => patient.id !== id))
  }
}
