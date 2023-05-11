import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  form!: FormGroup
  ingredients!: FormArray

  query!: string
  // recipes$!: Observable<Recipe[]>
  ingredientNames!: string[];
  recipesFound: boolean = false;
  recipes: Recipe[] = [];

  // For pagination of results
  pageSize = 5;
  currentPage: number = 0;

  constructor(private fb: FormBuilder, private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      ingredients: this.fb.array([
        this.fb.group({
          name: this.fb.control<string>('', [ Validators.required ])
        })
      ])
    })
    this.ingredients = this.form.get('ingredients') as FormArray // IMPT: initialize the ingredients so it can be used in ngFor loop 
  }

  // Find by complexSearch - included ingredients
  findRecipesByIncludedIng() {
    const ingredients = this.form.get('ingredients') as FormArray;
    const names = ingredients.controls.map(control => control.get('name')?.value) // fGet value of 'name' for each control
    this.query = names.join(',')
    this.ingredientNames = names
    console.info('query = ', this.query)
    // Manually subscribe to the Observable returned by service method
    this.recipeSvc.getRecipesCS(this.query).subscribe(
      (recipes => {
        this.recipes = recipes;
        this.recipesFound = recipes.length > 0; // Set recipesFound to true if recipes found
      })
    )
  }

  addIngredient(){
    this.ingredients.push(this.fb.group({
      name: this.fb.control<string>('', [ Validators.required ])
    }))
  }
  
  removeIngredient(idx: number){
    this.ingredients.removeAt(idx)
  }

  // Add this function to handle the page change event
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  
}


// Find by multiple ingredients
  // findRecipes() {
  //   const ingredients = this.form.get('ingredients') as FormArray;
  //   const names = ingredients.controls.map(control => control.get('name')?.value) // for each control, get value of 'name'
  //   this.query = names.join(',')
  //   this.ingredientNames = names
  //   console.info('query = ', this.query)
  //   this.recipes$ = this.recipeSvc.getRecipesByIng(this.query)
  // }


  // Find by complexSearch - single ingredient 
  // findRecipesComplexSearch() {
  //   this.query = this.form.value['name']
  //   console.info('query = ', this.query)
  //   this.recipes$ = this.recipeSvc.getRecipesCS(this.query)
  // }