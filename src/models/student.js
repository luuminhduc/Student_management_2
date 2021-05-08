export default class Student{
    constructor(name,className,english,math,literature,uid,id) {
        this.name = name;
        this.className = className;
        this.english = english;
        this.math = math;
        this.literature = literature;
        this.uid = uid;
        this.id = id;
    }
    getAverage() {
        return ((this.math + this.english + this.literature) / 3).toFixed(2);
    }
    getEvaluation() {
        const average = ((this.math + this.english + this.literature) / 3).toFixed(2);
        let result;
        result = {status :  "Terrible", color:"red"};;

       if(average > 3) result = {status :  "Bad", color:"yellow"};
       if(average > 5) result = {status : "Average", color:"violet"};
       if(average > 6.5) result = {status :  "Good", color:"blue"};
       if(average > 8) result = {status :  "Excellent", color:"green"};


       return result;
    }
}