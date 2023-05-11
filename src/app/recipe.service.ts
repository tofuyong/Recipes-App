import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, raceWith } from 'rxjs';
import { Recipe, RecipeDetails } from './models';
import { API_KEY, API_URL_COMPLEX_SEARCH, API_URL_FIND_BY_INGREDIENTS, API_URL_RECIPE_DETAILS } from './constants';

@Injectable()
export class RecipeService {

    constructor (private http: HttpClient ) { }

    // Find by complexSearch - single ingredient
    // GET: https://api.spoonacular.com/recipes/complexSearch?query=strawberry&apiKey=
    // Find by complexSearch - strictly included ingredients only
    // GET: https://api.spoonacular.com/recipes/complexSearch?includeIngredients=strawberry,banana&apiKey=
    getRecipesCS(query:string): Observable<Recipe[]> {
        const params = new HttpParams()
            .set('includeIngredients', query)
            .set('number', 100)
            .set('apiKey', API_KEY)
        return this.http.get<Recipe[]>(API_URL_COMPLEX_SEARCH, { params })
            .pipe(
                map((r: any) => r['results'] as any[]),
                map((ar: any[]) => {
                    return ar.map((deets: any) => {
                        return {
                            id: deets['id'],
                            title: deets['title'],
                            image: deets['image']
                        } as Recipe
                    })
                })
            )
    }

    // Find by multiple ingredients
    // GET: https://api.spoonacular.com/recipes/findByIngredients?ingredients=apple,flour&apiKey=
    getRecipesByIng(query:string): Observable<Recipe[]>  {
        const params = new HttpParams()
            .set('ingredients', query)
            .set('number', 8)
            .set('apiKey', API_KEY)
        return this.http.get<Recipe[]>(API_URL_FIND_BY_INGREDIENTS, { params })
            .pipe(
                map((r: any)  => 
                    r.map((deets:any) => {
                        return{ 
                            id: deets['id'],
                            title: deets['title'],
                            image: deets['image']
                        } as Recipe
                    })
                )
            )
    }


    // Find Recipe Details
    // GET: https://api.spoonacular.com/recipes/{id}/information?apiKey=c9e945b30fe341ba838ed76d7f1f0366
    getRecipeDetails(id: string): Observable<RecipeDetails> {
        const url = `${API_URL_RECIPE_DETAILS}/${id}/information?apiKey=${API_KEY}`;
        return this.http.get<RecipeDetails>(url)
            .pipe(
                map((r:any) => {
                    return {
                        title: r['title'],
                        readyInMinutes: r['readyInMinutes'],
                        image: r['image'],
                        instructions: r['instructions'],
                        // analyzedInstructions: r['analyzedInstructions']
                    } as RecipeDetails
                })
            )
    }

}