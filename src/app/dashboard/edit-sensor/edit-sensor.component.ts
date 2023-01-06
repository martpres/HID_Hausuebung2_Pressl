import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { SensorComponent } from '../sensor/sensor.component';

@Component({
  selector: 'app-edit-sensor',
  templateUrl: './edit-sensor.component.html',
  styleUrls: ['./edit-sensor.component.scss']
})
export class EditSensorComponent implements OnInit 
{
  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService) { }
  public sensorEditForm: any;
  public showAddTask: boolean = false;
  

  ngOnInit(): void 
  {
    this.sensorEditForm = this.formBuilder.group
    ({
      id: [0, [ Validators.required ] ],
      name: ['', [ Validators.required ] ],
      location: ['', [ Validators.required ] ],
      active:  [true, [ Validators.required ] ],
      position:  ['OUTDOOR', [ Validators.required ] ]
    });
  }

  async onSubmit() 
  {
    if(this.sensorEditForm?.valid) 
    {
      
      await this.backendService.changeSensor(this.sensorEditForm.value.id,this.sensorEditForm.value);
      this.sensorEditForm.reset();
      //Tabelle neu Laden
    }
  }

  toggleAddTask() 
  {
    this.showAddTask = !this.showAddTask;
  }
}

