import {Component, OnInit} from '@angular/core';
import {actions} from '../../../store/data.actions';
import {dataFeature} from '../../../store/data.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Card} from 'primeng/card';
import {InputNumber} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {AsyncPipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-data-view',
  imports: [
    Card,
    InputNumber,
    TableModule,
    AsyncPipe,
    FormsModule,
    NgClass
  ],
  templateUrl: './data-view.component.html',
  standalone: true,
  styleUrl: './data-view.component.less'
})
export class DataViewComponent implements OnInit {
  data$: Observable<any>;
  loading$: Observable<boolean>;
  minValue$: Observable<number>;
  minValue: number = 10;
  sortBy: 'category' | 'value' = 'category';  // По умолчанию сортируем по категории
  sortDirection: number = 1;  // 1 — по возрастанию, -1 — по убыванию

  constructor(private store: Store<{ data: any }>) {
    this.data$ = this.store.select(dataFeature.selectData);
    this.loading$ = this.store.select(dataFeature.selectLoading);
    this.minValue$ = this.store.select(dataFeature.selectMinValue);
  }

  ngOnInit() {}

  updateMinValue() {
    this.store.dispatch(actions.setMinValue({minValue: this.minValue}));
  }

  sort(field: 'category' | 'value') {
    // Если поле сортировки уже выбрано, меняем направление сортировки
    if (this.sortBy === field) {
      this.sortDirection = this.sortDirection === 1 ? -1 : 1;
    } else {
      this.sortBy = field;
      this.sortDirection = 1; // По умолчанию сортируем по возрастанию
    }
    // Передаем данные в стор для сортировки
    this.store.dispatch(actions.sortData({field: this.sortBy, direction: this.sortDirection === 1 ? 'asc' : 'desc'}));

  }

}
