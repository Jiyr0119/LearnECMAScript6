const promise = new Promise(function(resolve, reject) {
    if ('1' == 1) {
        resolve('is then')
    } else {
        reject('is catch')
    }
})
promise.then(res => {
    console.log(res)
})

const getJSON = (url) => {
    const promise = new Promise(function(resolve, reject) {
        const handler = () => {
            if (client.readyState !== 4) {
                return;
            }
            if (client.status === 200) {
                resolve(client.response);
            } else {
                reject(new Error(client.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
        client.Header = {
            "token": '1994'
        }
        console.log(client)
    })
    return promise;
}
// getJSON("./posts.json").then(function(json) {
//     console.log('Contents: ', json);
// }).catch(error => {
//     console.error('出错了', error);
// });
getJSON("./posts.json").then(function(json) {
    console.log('Contents: ', json);
    return json.user;
}).then(function(res) {
    console.log('user is ', res);
}).catch(error => {
    console.error('出错了', error);
});