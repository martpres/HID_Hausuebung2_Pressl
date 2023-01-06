import { Component, OnInit } from '@angular/core';
import { Sensorendata } from 'src/app/Sensorendata';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { ChartData } from './chart-data';
import { Serie } from './serie';

@Component({
  selector: 'app-ngx-chart',
  templateUrl: './ngx-chart.component.html',
  styleUrls: ['./ngx-chart.component.scss']
})
export class NgxChartComponent implements OnInit {
  
  data:any[]= [];
  data2:any[]= [];

  isLoading: boolean=false

  constructor(private backendservice: BackendService, private storeservice: StoreService) { 
  }

  async ngOnInit() {
    this.isLoading=true
    await this.prepareComponent();
    this.isLoading=false;
  }


  private async prepareComponent(){
    await this.backendservice.getSensorenDaten();
    await this.backendservice.getSensoren();
    this.prepareDataForTemperature()
    this.prepareDataForHumidity();

  }



  private prepareDataForTemperature(){


    this.storeservice.sensoren.forEach(sensor=>{

      const onedata=new ChartData(sensor.name)

      this.getMeasurementsForSensor(sensor.id).forEach(sdata=>{
        onedata.series.push(new Serie(sdata.temperature, sdata.date))
      })

      this.data.push(onedata)
    
    });

  }

  
  private prepareDataForHumidity(){


    this.storeservice.sensoren.forEach(sensor=>{

      const onedata=new ChartData(sensor.name)

      this.getMeasurementsForSensor(sensor.id).forEach(sdata=>{
        onedata.series.push(new Serie(sdata.humidity, sdata.date))
      })

      this.data2.push(onedata)
    
    });

  }

  private getMeasurementsForSensor(sensorId: number):Sensorendata[]{
    return this.storeservice.sensorenDaten.filter(x=>x.sensor.id===sensorId);
  }

}
