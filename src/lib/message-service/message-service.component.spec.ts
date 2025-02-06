import { TestBed } from "@angular/core/testing";
import { MessageService } from "primeng/api";
import { MessageServiceComponent } from "./message-service.component";

describe("MessageServiceComponent", () => {
  let service: MessageServiceComponent;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    // Создаем мок для MessageService
    messageServiceSpy = jasmine.createSpyObj("MessageService", ["add"]);

    TestBed.configureTestingModule({
      providers: [
        MessageServiceComponent,
        { provide: MessageService, useValue: messageServiceSpy }, // Передаем мок
      ],
    });

    service = TestBed.inject(MessageServiceComponent);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call showError and use MessageService", () => {
    const errorMessage = "Test Error";
    service.showError(errorMessage);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: "error",
      summary: "Error",
      detail: errorMessage,
    });
  });

  it("should call showSuccess and use MessageService", () => {
    const successMessage = "Test Success";
    service.showSuccess(successMessage);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: "success",
      summary: "Success",
      detail: successMessage,
    });
  });
});
