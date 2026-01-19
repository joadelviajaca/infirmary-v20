import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientCard } from './patient-card/patient-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UpperCasePipe, PatientCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  patients: Patient[] = [
    { id: "1", name: 'Marcus Fenix', infection: 15, status: 'estable' },
    { id: "2", name: 'Sarah Connor', infection: 85, status: 'critico' },
    { id: "3", name: 'Ellen Ripley', infection: 0, status: 'estable' }
  ];
  administrarCura(p: Patient) {
    if (p.infection > 0) p.infection -= 10;
    if (p.infection < 0) p.infection = 0;
    this.actualizarEstado(p);
  }
  darDeBaja(id: string) {
    this.patients = this.patients.filter(p => p.id !== id);
  }
  private actualizarEstado(p: Patient) {
    if (p.infection > 70) p.status = 'critico';
    else p.status = 'estable';
  }
}
