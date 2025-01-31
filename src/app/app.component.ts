import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UploadComponent} from './components/upload/upload.component';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {PieChartComponent} from './components/pie-chart/pie-chart.component';
import {dataFeature} from '../store/data.reducer';
import {BarChartComponent} from './components/bar-chart/bar-chart.component';
import {DataViewComponent} from './components/data-view/data-view.component';
import {actions} from '../store/data.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadComponent, PieChartComponent, AsyncPipe, JsonPipe, BarChartComponent,  DataViewComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  title = 'AngularDeveloper';
  data$: Observable<any>;

  constructor(private store: Store<{ data: any }>) {
    this.data$ = this.store.select(dataFeature.selectData);
  }

  ngOnInit() {

    const sampleData: any = [
      {category: 'B', value: 5},
      {category: 'A', value: 20},
      {category: 'C', value: 0},
      {category: 'D', value: 15},
      {category: 'R', value: 50},
      {category: 'Y', value: 30}
    ];

    this.store.dispatch(actions.setData({data: sampleData})); //time data

    this.store.select(dataFeature.selectMinValue).subscribe((minValue) => {
      console.log('Текущее minValue:', minValue);
    });
  }
}
