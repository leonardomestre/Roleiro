import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-messagebox',
  standalone: true,
  imports: [],
  templateUrl: './messagebox.component.html',
  styleUrl: './messagebox.component.scss'
})
export class MessageboxComponent {

  title = input<string>()
  message = input<string>()
  close = output()

  sendEvent(){
    this.close.emit()
  }
  
}
