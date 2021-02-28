import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private testSource = new BehaviorSubject<any>(null);

  currentTest = this.testSource.asObservable();

  constructor() {}

  saveCurrentTest(data) {
    this.testSource.next(data);
  }
}
