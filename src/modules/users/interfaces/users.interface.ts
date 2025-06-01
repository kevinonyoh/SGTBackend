export enum  ICoursesInterest{
   ATS = "ATS",
   ICAN = "ICAN",
   Olevel= "Olevel",
   All_Courses =  "All_Courses"
}


export interface IUser {
   id: string;
   email: string;
   client: string;
}