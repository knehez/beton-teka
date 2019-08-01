import { Component, OnInit } from '@angular/core';
import { ExperimentService } from 'src/app/_services/experiment.service';
import { Experiment } from 'src/backend/entities/experiment';
import { months } from 'moment';

@Component({
  selector: 'app-search-experiment',
  templateUrl: './search-experiment.component.html',
  styleUrls: ['./search-experiment.component.css']
})
export class SearchExperimentComponent implements OnInit {

  experimentId: String;
  headColumns: any[];
  searchedExperiment = [];

  constructor(
    private experimentService: ExperimentService
  ) { }

  ngOnInit() {

    this.headColumns = [
      { field: 'id', header: 'Id', hidden: false },
      { field: 'experimentName', header: 'Név', hidden: false },
      { field: 'cups', header: 'Mintaszám', hidden: false },
      { field: 'date', header: 'Dátum', hidden: false },
      { field: 'description', header: 'Leírás', hidden: false },
      { field: 'adds', header: 'Adalékok', hidden: false },
    ];
  }

  searchExperiment() {
    this.experimentService.searchExperiment(this.experimentId).then(res => {
      console.log(res);
      const arr = [];
      arr.push(res);
      for (const experiment of arr) {
        experiment.adds = this.convertAdds(experiment.adds);
        experiment.date = new Date(experiment.date).toLocaleDateString('hu-HU', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
      this.searchedExperiment = arr;
    });
  }

  convertAdds(adds) {
    let str = '';
    for (const add of adds) {
      str += ` -- ${add.quantity} ${add.unit} ${add.name}`;
    }
    return str;
  }
}
