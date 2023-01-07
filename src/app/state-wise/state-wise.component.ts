import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, CellClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { VaccinationService } from '../vaccination.service';

export interface ReportData {
  district: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  tested: number;
}

@Component({
  selector: 'app-state-wise',
  templateUrl: './state-wise.component.html',
  styleUrls: ['./state-wise.component.scss']
})
export class StateWiseComponent implements OnInit {

  stateLookup: { desc: string, code: string }[] = [];
  totalStateData: ReportData[] = [];
  dataSource!: MatTableDataSource<ReportData>;
  displayedColumns = ['district', 'confirmed', 'recovered', 'deaths', 'tested'];
  state = new FormControl('');
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  statePoupulations = 0;
  // chart var
  public options: any;
  graphDataArray: any[] = [];

  constructor(public vaccinationService: VaccinationService, private http: HttpClient) {

    this.options = {
      autoSize: true,
      title: { text: 'Vaccination Report District wise' },

      data: this.graphDataArray,
      series: [
        {
          type: 'scatter',
          xKey: 'vaccinated1',
          yKey: 'vaccinated2',
          strokeWidth: 0,
          showInLegend: false,
          tooltip: {
            renderer: (params: any) => {
              const inputVal = params.yValue;
              return `
              <div class="ag-chart-tooltip-district">${this.getDistrict(params.xValue, params.yValue)}</div>
              <div class="ag-chart-tooltip-dose">Dose 1: ${params.xValue} %</div>
              <div class="ag-chart-tooltip-dose">Dose 2: ${params.yValue} %</div>
              `
            },
          }
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Vaccination % Dose 1',
          },
          label: {
            formatter: (params: any) => {
              return `${params.value}%`
            },
          }
        },
        {
          type: 'number',
          position: 'bottom',
          title: {
            text: 'Vaccination % Dose 2',
          },
          label: {
            formatter: (params: any) => {
              return `${params.value}%`
            },
          }
        },
      ],
    };
   }

  ngOnInit(): void {
    this.formatStateLookup();
  }

  formatStateLookup() {
    const keys: string[] = Object.keys(this.vaccinationService.totalStates);
    this.stateLookup = [];
    keys.forEach(el => {
      this.stateLookup.push({ desc: this.vaccinationService.totalStates[el], code: el })
    })

  }

  onStateChange() {
    const selectedState = this.state?.value;
    const selectedStateData = this.vaccinationService.totalReport[selectedState];
    this.totalStateData = [];
    this.statePoupulations = selectedStateData?.meta?.population;
    this.graphDataArray = [];
    const districts = Object.keys(selectedStateData?.districts);
    districts?.forEach(district => {
      const selectedDistrict = selectedStateData?.districts[district];
      const data: ReportData = {
        district: district,
        confirmed: selectedDistrict?.total?.confirmed || 0,
        recovered: selectedDistrict?.total?.recovered || 0,
        deaths: selectedDistrict?.total?.deceased || 0,
        tested: selectedDistrict?.total?.tested || 0
      }
      this.totalStateData.push(data);

      const grapData = {
        district: district,
        vaccinated1: this.getPercentage(selectedDistrict?.total?.vaccinated1, selectedDistrict?.meta?.population) || 0,
        vaccinated2: this.getPercentage(selectedDistrict?.total?.vaccinated2, selectedDistrict?.meta?.population) || 0
      }
      this.graphDataArray.push(grapData);
    })
    this.dataSource = new MatTableDataSource(this.totalStateData);
    this.dataSource.sort = this.sort;

    const option = {...this.options};
    option.data = this.graphDataArray;
    this.options = option;
  }

  getDistrict(dose1: number, dose2: number) {
    return this.graphDataArray.find(el => el.vaccinated1 == dose1 && el.vaccinated2 == dose2)?.district;
  }

  getPercentage(value: number, total: number) {
    return value && total ? Number(((value * 100)/total).toFixed(2)) : 0;
  }
}
