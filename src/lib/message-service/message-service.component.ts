import { Injectable } from "@angular/core"
import { MessageService } from "primeng/api"

@Injectable({
	providedIn: "root",
})
export class MessageServiceComponent {
	constructor(private messageService: MessageService) {}

	showError(value: string) {
		this.messageService.add({
			severity: "error",
			summary: "Error",
			detail: value,
		})
	}
	showSuccess(value: string) {
		this.messageService.add({
			severity: "success",
			summary: "Success",
			detail: value,
		})
	}
}
