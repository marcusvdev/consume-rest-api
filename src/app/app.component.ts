import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string;
  car = {} as Car;
  cars: Car[];

  constructor(private carService: CarService) {}
  
  ngOnInit() {
    this.getCars();
    this.title = "Simple Car CRUD";
  }

  saveCar(form: NgForm) {
    if (this.car.id !== undefined) {
      this.carService.updateCar(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.carService.saveCar(this.car).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getCars() {
    this.carService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
   }

  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(() => {
      this.getCars();
    });
  }

  editCar(car: Car) {
    this.car = { ...car };
  }

  cleanForm(form: NgForm) {
    this.getCars();
    form.resetForm();
    this.car = {} as Car;
  }

}