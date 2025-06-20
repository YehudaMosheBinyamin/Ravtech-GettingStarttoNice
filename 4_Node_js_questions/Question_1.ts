function divide(a:number,b:number){
if(b===0){
    throw new Error("0 divisor!");
}
else{
    return a/b;
}
}
try{
console.log(divide(5,0));
}
catch(err:any){
    console.log(err.message);
}

//Test 1: With 0 as divisor
//0 divisor!
//Test 2: With 5 as divisor:
//5


