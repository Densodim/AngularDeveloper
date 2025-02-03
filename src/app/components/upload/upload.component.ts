import {Component} from "@angular/core"
import {CommonModule} from "@angular/common"
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload"
import {FileHistoryComponent} from "../file-history/file-history.component"
import {injectFileFeature} from "../../../store/file/file.reducer"
import {Observable} from "rxjs"
import {MessageServiceComponent} from "../../../lib/message-service/message-service.component"
import {FileHistory} from "../../../types/file.types"
import {injectDataFeature} from "../../../store/data/data.reducer"
import {toObservable} from "@angular/core/rxjs-interop"

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
      this.message.showError("Файл должен быть в формате JSON")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      this.message.showError("Файл не должен превышать 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      try {
        if (typeof reader.result === "string") {
          const jsonData = JSON.parse(reader.result)

          this.message.showSuccess("File uploaded successfully.")

          const fileHistory: FileHistory = {
            fileName: file.name,
            uploadDate: new Date(),
            jsonDate: jsonData,
          }

          this.selectedFileName = file.name

          this.dataFeature.setData(jsonData)
          this.fileFeature.addFileToHistory(fileHistory)
        }
      } catch (error) {
        this.message.showError("Error JSON")
      }
    }

    reader.readAsText(file)
  }
}
