const eseguiTask = (durata) => {
    return new Promise((resolve, reject) => {
        if(!durata){
            reject('Non hai fornito una durata');
        }else{
            setTimeout(() => {
                resolve('Task effettuata');
            }, durata)
        }
    });
}

(async () =>{
    try{
        const tempo = await Promise.all([
            eseguiTask(2000),
            eseguiTask(2000),
            eseguiTask(2000)
        ]);
        console.log(tempo)
    }catch(err){console.error(err)}
})();