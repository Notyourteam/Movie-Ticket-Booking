import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiConsumerService } from 'src/app/services/config.service';
import { Movie } from 'src/app/Utilities/movie';
import {ToastrService} from 'ngx-toastr'
const Booking_schema = [
  {
    key: 'Name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'MovieName',
    type: 'text',
    label: 'Movie Name',
  },
  {
    key: 'Showtime',
    type: 'text',
    label: 'Show Time',
  },
  {
    key: 'phno',
    type: 'text',
    label: 'Phone no.',
  },
  {
    key: 'Tickets',
    type: 'number',
    label: 'Seats',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  Error :boolean = false
  movies: Movie[] = [];
  displayedColumns: string[] = Booking_schema.map((col) => col.key);
  dataSource = new MatTableDataSource();
  columnsSchema: any = Booking_schema;

  nameFilter = new FormControl('');
  MovieNameFilter = new FormControl('');
  ShowtimeFilter = new FormControl('');
  phnoFilter = new FormControl('');
  filterValues = {
    Name: '',
    MovieName: '',
    Showtime: '',
    phno: ''
  };
  constructor(private service: ApiConsumerService,public toastr: ToastrService) {
    this.dataSource.data = JSON.parse(localStorage.getItem('booking') || '[]')
    this.dataSource.filterPredicate = this.createFilter(); //filter method
  }
  ngOnInit(): void {
    this.getAllMovie();
    //search
    this.nameFilter.valueChanges
    .subscribe(
      name => {
        this.filterValues.Name = name || '';
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  this.MovieNameFilter.valueChanges
    .subscribe(
      MovieName => {
        this.filterValues.MovieName = MovieName||'';
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  this.ShowtimeFilter.valueChanges
    .subscribe(
      Showtime => {
        this.filterValues.Showtime = Showtime||'';
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  this.phnoFilter.valueChanges
    .subscribe(
      phno => {
        this.filterValues.phno = phno||'';
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }
  getAllMovie() {
    this.service.getAllMovieDetail().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }
  confirm(edit:any)
  {
    let originalData = JSON.parse(localStorage.getItem('booking') || '[]')
    console.log(edit.movieid)
    this.movies = this.movies.map((movie,i)=>{
      if(movie.id == edit.movieid)
      {
        //console.log(movie.Tickets[edit.TicketsIndx], originalData[i].Tickets,edit.Tickets)
        console.log(edit,movie.Showtime)
        let idx = movie.Showtime.indexOf(edit.Showtime)
        let temp = movie.Tickets[edit.TicketsIndx]
        if(edit.TicketsIndx == idx)
        {
          temp =movie.Tickets[edit.TicketsIndx]-(edit.Tickets - originalData[i].Tickets)
        }
        else
        {
          movie.Tickets[edit.TicketsIndx] += originalData[i].Tickets
          edit.TicketsIndx = idx
          temp =movie.Tickets[edit.TicketsIndx]- edit.Tickets
        }
        if(edit.Tickets!=0 && temp>=0 && edit.Name.length>=4 && edit.phno.length==10)
        {
          movie.Tickets[edit.TicketsIndx] = temp
          console.log("edited successfully")
          console.log(movie.Tickets[edit.TicketsIndx], originalData[i].Tickets,edit.Tickets)
          this.editHandler(movie)
        }
        else{
          this.Error = true
          console.log("Input Error",edit.Tickets,temp,edit.Name,edit.phno)
        }
      }
      return movie
    })
    if(!this.Error)
      localStorage.setItem('booking',JSON.stringify(this.dataSource.data))
    else
    {
      this.showError()
      this.toastr.error()
      this.dataSource.data = originalData
      this.Error = false
    }
  }
  editHandler(movie:Movie) {
    this.service.editUser(movie).subscribe((data: Movie) => {
      if (data) {
        console.log(data);
      }
    });
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:string): boolean {
      let searchTerms = JSON.parse(filter);
      console.log(data,searchTerms)
      return data.Name.toLowerCase().indexOf(searchTerms.Name) !== -1
        && data.MovieName.toString().toLowerCase().indexOf(searchTerms.MovieName) !== -1
        && data.Showtime.toString().toLowerCase().indexOf(searchTerms.Showtime) !== -1
        && data.phno.toString().toLowerCase().indexOf(searchTerms.phno) !== -1;
    }
    return filterFunction;
  }
  showError(){
    alert("invalid input")
    this.toastr.error('everything is broken', 'Major Error', {
   timeOut: 3000,
 });
   }
}
