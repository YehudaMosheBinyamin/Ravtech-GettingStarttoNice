class ValidationError extends Error{
    constructor(msg:string){
        super(msg);
    }
}
function stringFunc(a:any):any{
    try{
    if(!(typeof(a)==='string')){
    throw new ValidationError("msgfg");
    }}
    catch(err:any){
        console.log(err);
    }
}
stringFunc(3);
/** 
C:\Program Files\nodejs\node.exe .\dist\ExceptionHandling1.js 
Error: msgfg at stringFunc (c:\Users\danbe\Ravtech-GettingStarttoNice\ExceptionHandling1.ts:9:11) at Object.<anonymous> (c:\Users\danbe\Ravtech-GettingStarttoNice\ExceptionHandling1.ts:15:1) at Module._compile (c:\Users\danbe\Ravtech-GettingStarttoNice\lib\internal\modules\cjs\loader.js:1434:14) at Module._extensions..js (c:\Users\danbe\Ravtech-GettingStarttoNice\lib\internal\modules\cjs\loader.js:1518:10) at Module.load (c:\Users\danbe\Ravtech-GettingStarttoNice\lib\internal\modules\cjs\loader.js:1249:32) at Module._load (c:\Users\danbe\Ravtech-GettingStarttoNice\lib\internal\modules\cjs\loader.js:1065:12) at Function.executeUserEntryPoint [as runMain] (c:\Users\danbe\Ravtech-GettingStarttoNice\lib\internal\modules\run_main.js:158:12) at node:internal/main/run_main_module:30:49 {stack: 'Error: msgfg at stringFunc (C:\\Users\\da… at node:internal/main/run_main_module:30:49', message: 'msgfg'}
*/
