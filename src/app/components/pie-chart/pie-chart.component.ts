import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {dataFeature} from '../../../store/data.reducer';


interface onInit {
  category: string;
  value: number;
}

interface DataItem {
  category: string;
  value: number;
}

@Component({
  selector: 'app-pie-chart',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './pie-chart.component.html',
  standalone: true,
  styleUrl: './pie-chart.component.less'
})

export class PieChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer', {static: false}) chartContainer!: ElementRef;
  feature$: Observable<any>;

  private svg: any;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2;


  constructor(private store: Store<{ data: any }>) {
    this.feature$ = this.store.select(dataFeature.selectData);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.feature$.subscribe(data => {
      // console.log(' Данные из Store:', data);
      // console.log(' chartContainer:', this.chartContainer); // Проверяем, что он существует
      if (this.chartContainer && data.length > 0) {
        this.createChart(data);
      }
    });
  }


  private createChart(data: { category: string; value: number }[]): void {

    console.log('createChart', data);
    d3.select(this.chartContainer.nativeElement).selectAll('*').remove();

    this.svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const pie = d3.pie<{ category: string; value: number }>().value(d => d.value);
    const data_ready = pie(data);

    const arc = d3.arc<any>().innerRadius(0).outerRadius(this.radius);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    this.svg
      .selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any, i: any) => color(i.toString()))
      .style('opacity', 0.7)
      .on('mouseover', (event: MouseEvent, d: any): any => {
        const target = event.currentTarget as HTMLElement;
        d3.select(target).style('opacity', 1);
        d3.select('.tooltip')
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 30 + 'px')
          .style('display', 'block')
          .text(`${d.data.category}: ${d.data.value}`);
      })
      .on('mouseout', (event: MouseEvent) => {
        const target = event.currentTarget as HTMLElement;
        d3.select(target).style('opacity', 0.7);
        d3.select('.tooltip').style('display', 'none');
      });
  }
}
