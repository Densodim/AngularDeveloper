import { Component, OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { UploadComponent } from "./components/upload/upload.component"
import { Observable } from "rxjs"
import { Store } from "@ngrx/store"
import { PieChartComponent } from "./components/pie-chart/pie-chart.component"
import { selectDataState } from "../store/data/data.reducer"
import { BarChartComponent } from "./components/bar-chart/bar-chart.component"
import { DataViewComponent } from "./components/data-view/data-view.component"
import { Toast } from "primeng/toast"
import { StateDataType } from "../types/data.types"

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    UploadComponent,
    PieChartComponent,
    BarChartComponent,
    DataViewComponent,
    Toast,
  ],
  templateUrl: "./app.component.html",
  standalone: true,
  styleUrl: "./app.component.less",
})
export class AppComponent implements OnInit {
  title = "AngularDeveloper"
  data$: Observable<StateDataType>

  constructor(private store: Store<{ data: StateDataType }>) {
    this.data$ = this.store.select(selectDataState)
  }

  ngOnInit() {}
}
