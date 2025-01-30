import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UploadComponent} from './components/upload/upload.component';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {dataFeature} from '../store/data.reducer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadComponent,  PieChartComponent, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'AngularDeveloper';
  data$:Observable<any>;

  constructor(private store: Store<{data:any}>) {
    this.data$ = this.store.select(dataFeature.selectData);
  }
}
