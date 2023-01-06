import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
@Component({
  selector: 'app-delete-sensor',
  templateUrl: './delete-sensor.component.html',
  styleUrls: ['./delete-sensor.component.scss']
})
export class DeleteSensorComponent implements OnInit 
{
  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService) { }
  public sensorenDelete: any;
  public showAddTask: boolean = false;
  

  ngOnInit(): void 
  {
    this.sensorenDelete = this.formBuilder.group
    ({
      id: [0, [ Validators.required ] ]
     
    });
  }

  async onSubmit() 
  {
    if(this.sensorenDelete?.valid) 
    {
      await this.backendService.deleteSensor(this.sensorenDelete.value.id);
      this.sensorenDelete.reset();
      //Tabelle neu Laden
    }
  }

  toggleAddTask() 
  {
    this.showAddTask = !this.showAddTask;
  }
}

