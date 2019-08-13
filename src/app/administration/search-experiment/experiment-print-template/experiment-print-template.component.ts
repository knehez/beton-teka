import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-experiment-print-template',
  templateUrl: './experiment-print-template.component.html',
  styleUrls: ['./experiment-print-template.component.css']
})
export class ExperimentPrintTemplateComponent {

  @Input() experimentsToPrint: any[];

}
