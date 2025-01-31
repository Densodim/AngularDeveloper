import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UploadComponent} from './components/upload/upload.component';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {dataFeature} from '../store/data.reducer';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {actions} from '../store/data.actions';
import {InputNumber} from 'primeng/inputnumber';
import {Card} from 'primeng/card';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadComponent, PieChartComponent, AsyncPipe, JsonPipe, BarChartComponent, TableModule, TagModule, InputNumber, Card, FormsModule,],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'AngularDeveloper';
  data$: Observable<any>;
  loading$: Observable<boolean>;
  minValue$: Observable<number>;
  minValue: number = 10;

  constructor(private store: Store<{ data: any }>) {
    this.data$ = this.store.select(dataFeature.selectData);
    this.loading$ = this.store.select(dataFeature.selectLoading);
    this.minValue$ = this.store.select(dataFeature.selectMinValue);
  }

  ngOnInit() {
    this.store.select(dataFeature.selectMinValue).subscribe((minValue) => {
      console.log('Текущее minValue:', minValue);
    });
  }

  updateMinValue() {
    this.store.dispatch(actions.setMinValue({ minValue: this.minValue }));
  }

}
