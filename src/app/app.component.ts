import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HACKATHON';
  data: any = [];
  url = "https://api.myjson.com/bins/huzbg";
  flagCsharp: boolean = false;
  cSharpQue: any;
  flagMvc: boolean = false;
  mvcQue: any;
  flagAngular: boolean = false;
  AngularQue: any;
  textbox = 1;
  currentQuestion = {};
  results = [];
  suggetionQ = [];
  total: number;
  totalPercantage = 0;
  show: boolean = false;
  constructor(private httpclient: HttpClient) {

  }
  ngOnInit() {
    this.httpclient.get(this.url).subscribe(res => {
      this.data = res;
      this.cSharpQue = this.data.filter(x => x.TOPIC === "C#");
      this.mvcQue = this.data.filter(x => x.TOPIC === "WEBAPI");
      this.AngularQue = this.data.filter(x => x.TOPIC === "ANGULAR");
    });
  }
  language(lang: any) {
    if (lang === "C#") {
      this.flagCsharp = true;
      this.currentQuestion = this.cSharpQue.filter(x => x.LEVEL == this.textbox && x.ASKED === 0)[0];
    }
    if (lang === "WEBAPI") {
      this.flagMvc = true;
      this.currentQuestion = this.mvcQue.filter(x => x.LEVEL == this.textbox && x.ASKED === 0)[0];

    }
    if (lang === "ANGULAR") {
      this.flagAngular = true;
      this.currentQuestion = this.AngularQue.filter(x => x.LEVEL == this.textbox && x.ASKED === 0)[0];

    }
  }

  rating(level) {
    this.currentQuestion['ASKED'] = 1;
    this.textbox = level;
    this.language(this.currentQuestion['TOPIC']);
    var obj = { Question: '', Topic: '', Rating: 0, SUGGESTION: '', Level: 0 };
    obj.Question = this.currentQuestion['QUESTION'];
    obj.Topic = this.currentQuestion['TOPIC'];
    obj.Level = this.currentQuestion['LEVEL'];
    obj.Rating = 0;

    this.results.push(obj);
    console.log(this.results);
  }
  complete() {
    this.total = 0;
    this.results.forEach((element, index) => {
      this.total = this.total + parseInt(element.Rating);
      if (index === (this.results.length - 1)) {
        this.totalPercantage = this.total / (this.results.length * 5);
        this.show = true;
      }
    });
  }
  closeModal(){
    if(this.show){
      this.show =!this.show;
    }
  }
}
