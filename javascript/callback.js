function sum(a,b){
    return a+b;
}

function sumWithMessage(clbk,msg){
    console.log("Hi",msg,"!");
    const result=clbk(20,30);
    console.log("Your Score is:",result);
    
}
sumWithMessage(sum,"Mr Someone");