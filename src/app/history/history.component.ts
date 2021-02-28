import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Test } from '../shared/models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  tests: Test[] = [];
  trigger: number;
  notify: boolean;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllTests();
  }

  getAllTests() {
    this.apiService.getTests().subscribe(
      (data) => {
        this.tests = data.body;
      },
      (error) => {
        window.confirm(error);
      }
    );
  }

  // Triggers the delete option for the table entries
  triggerDelete(id: number) {
    if (this.trigger === id) {
      this.trigger = 0;
    } else {
      this.trigger = id;
    }
  }

  deleteTest(id: number, index: number) {
    if (window.confirm(`Are you sure you want to delete entry ${index + 1}`)) {
      this.apiService.delete(id).subscribe(
        (data) => {
          if (data) {
            this.notify = true;
            setTimeout(() => {
              this.notify = false;
            }, 5000);
          }
          this.getAllTests();
        },
        (error) => {
          window.confirm(error);
        }
      );
    }
  }
}
