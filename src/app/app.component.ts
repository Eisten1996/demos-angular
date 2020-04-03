import { Component, OnInit } from "@angular/core";
import { fromEvent } from "rxjs";
import { map, buffer, debounceTime, filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "rxjsClicks";

  clickMostrar = 0;

  ngOnInit(): void {
    const boton = document.getElementById("clickDouble");
    const botonPres = fromEvent(boton, "click");

    const buffe = botonPres.pipe(debounceTime(2000));

    const obs = botonPres.pipe(
      buffer(buffe),
      map(list => {
        console.log(list);
        return list.length;
      }),
      filter(x => x >= 2)
    );

    obs.subscribe(() => {
      this.clickMostrar += 1;
    });
  }
}
