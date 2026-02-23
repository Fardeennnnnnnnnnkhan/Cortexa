import { questionDifficulty } from "@/drizzle/schema"

export function formatQuestionDifficulty(difficulty : questionDifficulty){

    switch(difficulty){
        case 'easy':
            return 'Easy'
        case 'medium':
            return 'Medium'
        case 'hard':
            return 'Hard'   
        default:
            throw new Error(
                `Unknow Question difficulty : ${difficulty satisfies never}`
            )
    }
}   