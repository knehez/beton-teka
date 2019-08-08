import { Component, OnInit } from '@angular/core';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search-experiment',
  templateUrl: './search-experiment.component.html',
  styleUrls: ['./search-experiment.component.css']
})
export class SearchExperimentComponent implements OnInit {

  experimentName = '';
  headColumns: any[];
  experiments = [];

  constructor(
    private experimentService: ExperimentService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    this.headColumns = [
      { field: 'id', header: 'Azonosító', hidden: false },
      { field: 'experimentName', header: 'Név', hidden: false },
      { field: 'cups', header: 'Mintaszám', hidden: false },
      { field: 'date', header: 'Dátum', hidden: false },
      { field: 'description', header: 'Leírás', hidden: false },
      { field: 'adds', header: 'Adalékok', hidden: false },
    ];
  }

  convertAdds(adds) {
    let str = '';
    for (const add of adds) {
      str += ` -- ${add.quantity} ${add.unit} ${add.name}`;
    }
    return str;
  }

  convertDate(date) {
    return new Date(date).toLocaleDateString('hu-HU');
  }

  searchExperiment() {

    this.experiments = [];

    this.experimentService.searchExperiment(this.experimentName).then(res => {

      const experiments = res['data'];

      for (const experiment of experiments) {
        experiment.adds = this.convertAdds(experiment.adds);
        experiment.date = this.convertDate(experiment.date);
      }
      this.experiments = experiments;
    })
      .catch(err => {
        if (err.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Sikertelen keresés',
            detail: 'A keresett névre nem található kísérlet.'
          });
        }
      });
  }
}
