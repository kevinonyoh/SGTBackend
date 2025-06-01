
export enum ICoursesLevel{
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Expert = "Expert"
}


export enum IQuizType{
    multiple_choice = "multiple_choice",
    true_false = "true_false",
    short_answer = "short_answer"
}


export interface IQuestion{
    content: string;
    isCorrect: boolean;
    explanation?: string;
}