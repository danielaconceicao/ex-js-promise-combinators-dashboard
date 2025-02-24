//funcao wait que retorna uma promise resolvida apos um tempo
function wait(time){
    return new Promise(resolve => setTimeout(() => {
        console.log(`✅ Resolvida após ${time}ms`)
        resolve(time)
    }, time))
}


//clamamos promise.all() com tres chamadas para wait(), cada uma com um tempo diferente
async function runTasks(){
    console.log('⏳ Iniciando tarefas...')

    const results = await Promise.all([
        wait(2000),
        wait(1000),
        wait(3000)
    ]);

    console.log("🚀 Todas as tarefas concluídas!", results)
}

runTasks()