import { Component, OnInit } from '@angular/core';
import { VaccinationService } from './vaccination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vaccination-report';
  reuiredData: any[] = [];

  constructor(public vaccinationService: VaccinationService) {}

  ngOnInit(): void {
    this.vaccinationService.getAllVaccinationRepot().subscribe(resp => {
      if (resp) {
        this.vaccinationService.totalReport = resp;
      }
    });
  }
}
