import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FileSelectEvent, FileUploadModule } from "primeng/fileupload"
import { FileHistoryComponent } from "../file-history/file-history.component"
import { injectFileFeature } from "../../../store/file/file.reducer"
import { Observable } from "rxjs"
import { MessageServiceComponent } from "../../../lib/message-service/message-service.component"
import { injectDataFeature } from "../../../store/data/data.reducer"
import { toObservable } from "@angular/core/rxjs-interop"

@Component({
	selector: "Upload",
	imports: [CommonModule, FileUploadModule, FileHistoryComponent],
	templateUrl: "./upload.component.html",
	standalone: true,
	styleUrl: "./upload.component.less",
})
export class UploadComponent {
	readonly dataFeature = injectDataFeature()
	readonly fileFeature = injectFileFeature()

	selectedFileName$: Observable<string | null> = toObservable(
		this.fileFeature.selectFileFromHistory(),
	)
	selectedFileName: string | null = null

	constructor(private message: MessageServiceComponent) {
		// Подписываемся на изменения имени выбранного файла
		this.selectedFileName$.subscribe((fileName) => {
			this.selectedFileName = fileName
		})
	}

	onFileSelected(event: FileSelectEvent) {
		const file = event.files[0] // PrimeNG возвращает объект с массивом `files`
		if (!file) return

		if (file.type !== "application/json") {
			this.message.showError("The file should be in format JSON")
			return
		}
		if (file.size > 5 * 1024 * 1024) {
			this.message.showError("The file must not exceed 5MB.")
			return
		}
		this.dataFeature.uploadFile(file)
	}
}
