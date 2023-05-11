import { Component, OnInit } from '@angular/core';
import { RecipeDetails } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  recipeDetails!: RecipeDetails
  param$!: Subscription
  recipeId: string = "";
  recipeTitle: string = "";

  constructor(private recipeSvc: RecipeService, private activatedRoute: ActivatedRoute, 
              private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.param$ = this.activatedRoute.params.subscribe(
      (params)=> {
        this.recipeId = params['id'];
        console.log("RecipeID: " + this.recipeId);
      }
    )

    this.recipeSvc.getRecipeDetails(this.recipeId).subscribe(
      rd => {
        this.recipeDetails = rd;
        console.log('Details: ' + rd);
      }
    );
  }

  getInstructions(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.recipeDetails.instructions);
  }

}
