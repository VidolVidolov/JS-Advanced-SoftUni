function validate(object) {

    let possibleMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let possibleUri = /^[\*[A-Za-z0-9.]+$/g;
    let possibleVersion = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    let possibleMessage = /^[^<>\\&'"]*$/g;

    if(object.method == undefined ||!possibleMethods.includes(object.method)){
        throw new Error('Invalid request header: Invalid Method');
    }
    if(object.uri == undefined || !object.uri.match(possibleUri)){
        throw new Error('Invalid request header: Invalid URI');
    }
    if(object.version == undefined ||!possibleVersion.includes(object.version)){
        throw new Error('Invalid request header: Invalid Version');
    }
    if(object.message == undefined ||!object.message.match(possibleMessage)){
        throw new Error('Invalid request header: Invalid Message');
    }

    return object;
}


console.log(validate({
    method: 'POST',
    version: 'HTTP/2.0',
    message: 'rm -rf /*'
}
  
))