import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{
  

  title = 'TestTaskForIntership';
  passwordForm: FormGroup;
  

  constructor(private fb: FormBuilder) {}
    
  ngOnInit() {
    this.passwordForm = this.fb.group({
        password: ['', Validators.required],
    });
  }
  
  

}
