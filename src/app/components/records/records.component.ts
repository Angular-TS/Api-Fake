import { Component, ViewChild } from '@angular/core';

import { HttpDataService } from 'src/app/service/http-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Participant } from 'src/app/model/participant.model';
import { Center } from 'src/app/model/center.model';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent {

  displayedColumns = ['id', 'firstName', 'lastName', 'centerId', 'ranking', 'recordTime'];
  dataSource = new MatTableDataSource<Participant>();

  participants: any[] = [];
  centers: any[] = [];
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private participantService: HttpDataService) { }

  ngOnInit(): void {
    let count = 0;
    this.participantService.getParticipants().subscribe((data: any) => {
      count = data.length;
      for (let i = 1; i <= count; i++) {
        this.participantService.getParticipantsByCenterId(i).subscribe((result: any) => {
          this.participants.push(...result);
          this.dataSource.data = this.participants;
        });
      }
      this.participantService.getCenters().subscribe(
        (centers: any) => {
          centers.forEach((center: Center) => {
            this.centers[center.id] = center.name;
          });
        },
        error => console.log(error)
      );
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}