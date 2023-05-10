import { Component } from '@angular/core';

import { Participant } from 'src/app/model/participant.model';
import { Center } from 'src/app/model/center.model';
import { HttpDataService } from 'src/app/service/http-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  participant!: Participant;
  center!: Center;
  
  constructor(private httpDbService: HttpDataService) { }

  ngOnInit() {
    this.showParticipant();
  }

  showParticipant() {
    this.httpDbService.getParticipants().subscribe((db: any) => {
      this.participant = db.find((data: Participant) => data.ranking === 1);
      this.httpDbService.getMarathonCenter(this.participant.centerId).subscribe((db: any) => {
        this.center = db;
      });
    });
  }
}
