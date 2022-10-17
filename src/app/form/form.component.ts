import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '../Utilities/booking';
import { ApiConsumerService } from 'src/app/services/config.service';
import { Movie } from '../Utilities/movie';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  booking = new Booking
  allbookings: any =[]
  selected : any = []

  numbers: Array<number> = []
  showIndex:number=0
  idx: number=0
  isShown: boolean = false ;
  success: boolean = false;
  allKeys = Object.keys(localStorage); // hidden by default

  toggleShow() {
    this.booking = new Booking
    this.isShown = ! this.isShown;
  }
  constructor(private service: ApiConsumerService,private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.selected = state
    console.log(this.selected,state)
    if(state==undefined)
    {
      this.router.navigate(['']);
    }
  }
  ConfirmSeats(){
    if(this.booking.Tickets>0)
    {
      this.booking.movieid = this.selected.id
      this.booking.Showtime = this.selected.Showtime[this.idx]
      this.booking.MovieName = this.selected.MovieName
      //deducting tickets
      this.booking.TicketsIndx = this.idx;
      this.selected.Tickets[this.idx]-=this.booking.Tickets;

      //pushing data into local storage
      this.allbookings = JSON.parse(localStorage.getItem('booking') || '[]')
      this.allbookings.push(this.booking)
      localStorage.setItem('booking',JSON.stringify(this.allbookings)) //overwriting local storage


      this.numbers = Array(this.booking.Tickets).fill(0).map((x,i)=>i);
      console.log(this.booking)
      this.success = true;
      this.editHandler(this.selected) //editing api data
      console.log(this.numbers)
    }
  }
  checkSeats()
  {
    if(this.booking.Tickets>this.selected.Tickets[this.idx])
    {
      this.booking.Tickets = this.selected.Tickets[this.idx]
    }
  }
  setIndex(i:number){
    this.showIndex=i;
    this.booking.Showtime = this.selected.Showtime[i]
    console.log(this.showIndex,this.booking.Showtime)
  }
  editHandler(movie:Movie) {
      this.service.editUser(movie).subscribe((data: Movie) => {
        if (data) {
          console.log(data);
        }
      });
  }
  bookagain()
  {
    this.toggleShow()
    this.success=false;
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  ngOnInit(): void {
  }

}
