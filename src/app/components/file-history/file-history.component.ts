import { AfterViewInit, Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { injectFileFeature } from "../../../store/file/file.reducer"
import { TableModule } from "primeng/table"
import { AsyncPipe } from "@angular/common"
import { Button } from "primeng/button"
import { MessageServiceComponent } from "../../../lib/message-service/message-service.component"
import { toObservable } from "@angular/core/rxjs-interop"

@Component({
	selector: "app-file-history",
	imports: [TableModule, AsyncPipe, Button],
	templateUrl: "./file-history.component.html",
	standalone: true,
	styleUrl: "./file-history.component.less",
})
export class FileHistoryComponent implements OnInit, AfterViewInit {
	readonly fileFeature = injectFileFeature()
	fileHistory$: Observable<any> = toObservable(this.fileFeature.selectHistory())
	selectedFile$: Observable<string | null> = toObservable(this.fileFeature.selectFileFromHistory())

	constructor(private message: MessageServiceComponent) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {}

	selectFile(fileName: string) {
		this.fileFeature.FileFromHistory(fileName)
		this.message.showSuccess("File Selected successfully.")
	}
}
