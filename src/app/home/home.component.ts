import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Kangaroo, Test } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  model: Kangaroo = {};
  result: [string, number]; // Tuple to store result
  warn: boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  submitKangaForm(form: NgForm) {
    /* if(Object.values(form.value).some(value => value < 0)) {
  form.valid 
} */

    const { kanga1Start, kanga1Speed, kanga2Start, kanga2Speed } = form.value;

    this.result = this.calculateJumps(
      kanga1Start,
      kanga1Speed,
      kanga2Start,
      kanga2Speed
    );

    const payload: Test = {
      date: new Date(),
      result: this.result[0],
      jumps: this.result[1],
      field: [kanga1Start, kanga1Speed, kanga2Start, kanga2Speed],
    };

    this.apiService.postTest(payload).subscribe(
      (data) => {},
      (error) => {
        window.confirm(error);
      }
    );
    form.resetForm();
  }

  // Calculate number of jumps
  calculateJumps(
    kanga1Start: number,
    kanga1Speed: number,
    kanga2Start: number,
    kanga2Speed: number
  ): [string, number] {
    const jumps: number =
      (kanga2Start - kanga1Start) / (kanga1Speed - kanga2Speed);

    // Based on the constraint, 0<= kanga1Start < kanga2Start <= 10000
    if (kanga2Start < kanga1Start) {
      this.warn = true;
      setTimeout(() => {
        this.warn = false;
      }, 4000);
      return ['NO', jumps];
    } else if (jumps > 0 && Number.isInteger(jumps)) {
      return ['YES', jumps];
    } else {
      return ['NO', jumps];
    }
  }
}
