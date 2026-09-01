function test1(cb){
    setTimeout(()=>{
        console.log("Test1");
        cb();
    },2000);
}
function test2(cb){
    setTimeout(()=>{
        console.log("test2");
        cb();
    },1000);
}
function test3(cb){
    setTimeout(()=>{
        console.log("test3");
        cb();
    },100);
}
function test4(cb){
    setTimeout(()=>{
        console.log("test4");
        cb();
    },3000);
}
test1(()=>{
    test2(()=>{
        test3(()=>{
            test4();
        });
    });
})
