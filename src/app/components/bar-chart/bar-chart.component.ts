import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core"
import { Observable } from "rxjs"
import { injectDataFeature } from "../../../store/data/data.reducer"
import * as d3 from "d3"
import { DataActionType } from "../../../types/data.types"
import { toObservable } from "@angular/core/rxjs-interop"

@Component({
	selector: "app-bar-chart",
	imports: [],
	templateUrl: "./bar-chart.component.html",
	standalone: true,
	styleUrl: "./bar-chart.component.less",
})
export class BarChartComponent implements AfterViewInit {
	@ViewChild("chartContainer", { static: false }) chartContainer!: ElementRef
	readonly dataFeature = injectDataFeature()
	feature$: Observable<DataActionType[]> = toObservable(this.dataFeature.selectData())

	private svg: any
	private width = 500
	private height = 400
	private margin = { top: 20, right: 30, bottom: 40, left: 50 }

	constructor() {}

	ngAfterViewInit(): void {
		this.feature$.subscribe((data) => {
			if (this.chartContainer?.nativeElement && data.length > 0) {
				this.createChart(data)
			}
		})
	}

	private createChart(data: DataActionType[]): void {
		const element = this.chartContainer.nativeElement

		// Очищаем контейнер перед отрисовкой
		d3.select(element).selectAll("*").remove()

		// Создаем SVG
		this.svg = d3
			.select(element)
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height)

		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.category))
			.range([this.margin.left, this.width - this.margin.right])
			.padding(0.2)

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.value) || 0])
			.nice()
			.range([this.height - this.margin.bottom, this.margin.top])

		const xAxis = d3.axisBottom(x)
		const yAxis = d3.axisLeft(y)

		// Добавляем ось X
		this.svg
			.append("g")
			.attr("transform", `translate(0,${this.height - this.margin.bottom})`)
			.call(xAxis)

		// Добавляем ось Y
		this.svg.append("g").attr("transform", `translate(${this.margin.left},0)`).call(yAxis)

		// Добавляем столбцы
		this.svg
			.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: DataActionType) => x(d.category)!)
			.attr("y", (d: DataActionType) => y(d.value))
			.attr("width", x.bandwidth())
			.attr("height", (d: DataActionType) => this.height - this.margin.bottom - y(d.value))
			.attr("fill", "steelblue")
			.style("opacity", 0.8)
			.on("mouseover", (event: MouseEvent, d: DataActionType): void => {
				const target = event.currentTarget as HTMLElement
				d3.select(target).style("opacity", 1)
				d3.select(".tooltip")
					.style("left", event.pageX + "px")
					.style("top", event.pageY - 30 + "px")
					.style("display", "block")
					.text(`${d.category}: ${d.value}`)
			})
			.on("mouseout", (event: MouseEvent) => {
				const target = event.currentTarget as HTMLElement
				d3.select(target).style("opacity", 0.7)
				d3.select(".tooltip").style("display", "none")
			})
	}
}
