import { Component, OnInit } from '@angular/core';
import { ExperimentService } from 'src/app/_services/experiment.service';

@Component({
  selector: 'app-search-experiment',
  templateUrl: './search-experiment.component.html',
  styleUrls: ['./search-experiment.component.css']
})
export class SearchExperimentComponent implements OnInit {

  experimentId: string;
  headColumns: any[];
  searchedExperiment = [];

  constructor(
    private experimentService: ExperimentService
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

  convertDate (date) {
    return new Date(date).toLocaleDateString('hu-HU');
  }

  searchExperiment() {
    this.experimentService.searchExperiment(this.experimentId).then(res => {

      const experiments = [];
      experiments.push(res);

      for (const experiment of experiments) {
        experiment.adds = this.convertAdds(experiment.adds);
        experiment.date = this.convertDate(experiment.date);
      }
      this.searchedExperiment = experiments;
    });
  }
}
