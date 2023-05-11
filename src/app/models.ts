export interface Recipe {
    id: number
    title: string
    image: string
}

export interface RecipeDetails {
    id: number
    title: string
    readyInMinutes: number
    image: string
    instructions: string
}