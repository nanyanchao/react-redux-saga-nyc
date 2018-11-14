npm install react-redux-saga-nyc --save 
import saga from "react-redux-saga-nyc" 
saga.setModels(models) 

ReactDOM.render(, document.getElementById('root')); 

见解与dva model设计 
models template

{ 
    namespace:"test", 
    state:{id:""},  
    Effects:{ 
        *test({payload},{call,put}) { 
            yield put({type:"testFun",payload}) 
        } 
    }, 
    Reducers:{ 
        testFun(state,{payload}){ 
            return {...state,...payload} 
        } 
    } 
}