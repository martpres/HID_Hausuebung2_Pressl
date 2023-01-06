import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import { ConsoleReporter } from 'jasmine';
import { delay, of } from 'rxjs';
import { SensorPosition } from 'src/app/Sensor';
import { Sensorendata } from 'src/app/Sensorendata';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component
({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})

export class SensorsDataComponent implements OnInit 
{
  public columnsToDisplay: string[] = ['sensor', 'name', 'location', 'active', 'position', 'datum', 'temperature', 'humidity', 'delete','edit','save'];
  public isLoading = false;
  public dataSource: any;
  public edit:Boolean = false;
  public aktID = 0;

  @ViewChild('paginator') paginator: MatPaginator | undefined;

  constructor(private backendService: BackendService, public storeService: StoreService) { }


  async ngOnInit() {
    this.setDataSource();
  }

  async setDataSource() {
    this.isLoading = true;

    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten();

    of(this.storeService.sensorenDaten).pipe(delay(1000))
    .subscribe(data => {
      this.isLoading = false; 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  async deleteSensordata(id: number) {
    await this.backendService.deleteSensorsDaten(id);
    window.location.reload();
  }

  async updateSensordata(item: any, type:string){
    console.log(item);

    let inputValue = (document.getElementById(type+item.id) as HTMLInputElement).value;
    switch(type){
        case 'datum':
          item.date = inputValue;
          break;
        case 'temperature':
          item.temperature = inputValue;
          break;
        case 'humidity':
        item.humidity = inputValue;
        break;
    }
    console.log(inputValue);
    await this.backendService.changeSensorsDaten(item.id, item);
   

  }
  public get SensorPosition() {return SensorPosition; }
}
