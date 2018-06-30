import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CarService } from './../../services/car-service.service';
import { ICar } from '../../models/ICar';
import { NotifService } from '../../services/notif-service.service';

@Component({
  selector: 'app-newcar',
  templateUrl: './newcar.component.html',
  styleUrls: ['./newcar.component.css']
})
export class NewcarComponent implements OnInit {
  complexForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private carService: CarService,
    private notifService: NotifService
  ) {
    // Here we are using the FormBuilder to build out our form.
    this.complexForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      name: [null, Validators.required],
      mark: [null, Validators.required],
      model: [null, Validators.required]
    });
  }
  ngOnInit() {}

  public newCar(model: ICar) {
    this.carService
      .addNewCar(model)
      .then(resp => {
        this.notifService.success('Insertion operation was well done');
      })
      .catch(exp => {
        this.notifService.error('Server Exception was raised');
      });
  }
}
