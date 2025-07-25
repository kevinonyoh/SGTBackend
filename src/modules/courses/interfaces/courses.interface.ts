
export enum ICoursesLevel{
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Expert = "Expert"
}


export enum IQuizType{
    multiple_choice = "multiple_choice",
    true_false = "true_false",
    short_answer = "short_answer",
    theory = "theory"
}


export interface IQuestion{
    content: string;
    isCorrect: boolean;
    explanation?: string;
}




export interface IUserAnswers{
    questionId: string;
    answer: string;
}


export enum IQuestionType{
    past_question = "past_question",
    quick_question = "quick_question",
    general_question = "general_question"
}


export enum IDiet{
   may = 'may',
   november = 'november'
}