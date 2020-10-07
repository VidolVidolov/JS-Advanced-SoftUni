function Spy(target, method){
    let originalObjectFunction = target[method];
    let result = {count: 0};

    target[method] = function (){
        result.count++;
        return originalObjectFunction.apply(this, arguments);
    };
    return result;
}

