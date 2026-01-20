import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  private _patientsSignal = signal<Patient[]>([
    { id: "1", name: 'Marcus Fenix', infection: 15, status: 'estable' },
    { id: "2", name: 'Sarah Connor', infection: 85, status: 'critico' },
    { id: "3", name: 'Ellen Ripley', infection: 0, status: 'estable' }
  ])

  // private _patientsSubject: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([
  //   { id: "1", name: 'Marcus Fenix', infection: 15, status: 'estable' },
  //   { id: "2", name: 'Sarah Connor', infection: 85, status: 'critico' },
  //   { id: "3", name: 'Ellen Ripley', infection: 0, status: 'estable' }
  // ])

  // patients$ = this._patientsSubject.asObservable();

  patients = this._patientsSignal.asReadonly();

  // getPatients(): Observable<Patient[]> {
  //   return this._patientsSubject.asObservable();
  // }

  addPatient(name: string) {
    const newPatient: Patient = {
      id: Date.now().toString(),
      name,
      infection: 0,
      status: 'estable'
    }
    // const actualPacients = this._patientsSubject.value;
    // actualPacients.push(newPatient);
    // this._patientsSubject.next(actualPacients)
    // // this.patients.push(newPatient);
    this._patientsSignal.update(patients => [...patients, newPatient]);
  }

  deletePatient(id: string) {
    // this._patientsSubject.next(this._patientsSubject.value.filter(patient => patient.id !== id))
    this._patientsSignal.update(patients => patients.filter(patient => patient.id !== id));
  }

  curePatient(id: string) {
    this._patientsSignal.update(patients => {
      return patients.map(patient => {
        if (patient.id === id) {
          let newInfection = patient.infection - 10;
          if (newInfection < 0) newInfection = 0;
          let newStatus = 'estable';
          if (newInfection > 70) newStatus = 'critico';
          return { ...patient, infection: newInfection, status: newStatus } as Patient;
        }
        return patient;
      });
    });

    // const patients = this._patientsSubject.value;
    // const patient = patients.find(p => p.id === id);
    // if (patient) {
    //   patient.infection -= 10;
    //   if (patient.infection < 0) patient.infection = 0;
    //   if (patient.infection > 70) patient.status = 'critico';
    //   else patient.status = 'estable';
    //   this._patientsSubject.next(patients);
    // }
  }
}
