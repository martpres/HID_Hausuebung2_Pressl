import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';


@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.scss']
})
export class AddSensorComponent implements OnInit
{
  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService) { }
  public sensorenDataForm: any;
  public showAddTask: boolean = false;
  

  ngOnInit(): void 
  {
    this.sensorenDataForm = this.formBuilder.group
    ({
      name: ['' ],
      location: ['' ],
      active: [true],
      position:  ['OUTDOOR']
    });
  }

  async onSubmit() 
  {
    if(this.sensorenDataForm?.valid) 
    {
      console.log(this.sensorenDataForm.value);
      await this.backendService.addSensor(this.sensorenDataForm.value);

      this.sensorenDataForm.reset();
      //Tabelle neu Laden
    }else{

    }
  }

  toggleAddTask() 
  {
    this.showAddTask = !this.showAddTask;
  }
}
