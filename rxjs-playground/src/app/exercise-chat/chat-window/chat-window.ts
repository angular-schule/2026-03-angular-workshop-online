import { Component, signal, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'rxw-chat-window',
  templateUrl: './chat-window.html',
  styles: [],
  imports: [ReactiveFormsModule]
})
export class ChatWindow {

  readonly name = input<string>();
  readonly send = output<string>();
  readonly leave = output();

  form = new FormGroup({
    message: new FormControl('', { nonNullable: true })
  });

  readonly online = signal(true);

  sendMessage() {
    this.send.emit(this.form.controls.message.value);
    this.form.reset({ message: '' });
  }

  leaveChat() {
    this.online.set(false);
    this.leave.emit();
  }

}
