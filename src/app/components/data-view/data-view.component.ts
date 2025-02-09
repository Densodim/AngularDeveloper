import { Component, OnInit } from "@angular/core"
import { injectDataFeature } from "../../../store/data/data.reducer"
import { Observable } from "rxjs"
import { Card } from "primeng/card"
import { InputNumber } from "primeng/inputnumber"
import { TableModule } from "primeng/table"
import { AsyncPipe, NgClass } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { MessageServiceComponent } from "../../../lib/message-service/message-service.component"
import { DataField } from "../../../types/data.types"
import { toObservable } from "@angular/core/rxjs-interop"

@Component({
	selector: "app-data-view",
	imports: [Card, InputNumber, TableModule, AsyncPipe, FormsModule, NgClass],
	templateUrl: "./data-view.component.html",
	standalone: true,
	styleUrl: "./data-view.component.less",
})
export class DataViewComponent implements OnInit {
	readonly dataFeature = injectDataFeature()
	data$: Observable<any> = toObservable(this.dataFeature.selectData())
	minValue$: Observable<number> = toObservable(this.dataFeature.selectMinValue())
	minValue: number = 10
	sortBy: "category" | "value" = "category" // По умолчанию сортируем по категории
	sortDirection: number = 1

	constructor(private message: MessageServiceComponent) {}

	ngOnInit() {}

	updateMinValue() {
		this.dataFeature.setMinValue(this.minValue)
		this.message.showSuccess(`Change Min Value ${this.minValue}`)
	}

	sort(field: DataField) {
		// Если поле сортировки уже выбрано, меняем направление сортировки
		if (this.sortBy === field) {
			this.sortDirection = this.sortDirection === 1 ? -1 : 1
		} else {
			this.sortBy = field
			this.sortDirection = 1
		}
		// Передаем данные в стор для сортировки
		this.dataFeature.sortData(this.sortBy, this.sortDirection === 1 ? "asc" : "desc")
		this.message.showSuccess(`The data is successfully sorted by the field ${field}`)
	}
}
