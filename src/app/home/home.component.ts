import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
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
  notify: boolean;
  allResults: Test[] = [];
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  submitKangaForm(form: NgForm) {
    const { kanga1Start, kanga1Speed, kanga2Start, kanga2Speed } = form.value;

    this.result = this.calculateJumps(
      kanga1Start,
      kanga1Speed,
      kanga2Start,
      kanga2Speed
    );

    const payload: Test = {
      id: 100,
      date: new Date(),
      result: this.result[0],
      jumps: this.result[1],
      field: [kanga1Start, kanga1Speed, kanga2Start, kanga2Speed],
    };

    // To simulate data transfer for when app is hosted
    this.allResults.push(payload);
    this.dataService.saveCurrentTest(this.allResults);
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
    }, 5000);

    // Post request with json server
    this.apiService.postTest(payload).subscribe(
      (data) => {
        if (data !== null) {
          this.notify = true;
          setTimeout(() => {
            this.notify = false;
          }, 5000);
        }
      },
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
      }, 5000);
      return ['NO', jumps];
    } else if (jumps > 0 && Number.isInteger(jumps)) {
      return ['YES', jumps];
    } else {
      return ['NO', jumps];
    }
  }
}
