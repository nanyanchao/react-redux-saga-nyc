import { put,call,take,select,all,takeEvery,cancel } from 'redux-saga/effects'

export default class ToSagaAttribute{
    constructor(models){
        this.models = models;
        this.SagaAttribute = null;
        if(!models){
            throw new Error("Setting models,please")
        }
        this.toAttribute();
    }
    createTake(type,effect){
        const myTake=function*(){
            yield takeEvery(type,function*(action){
                yield * effect(action,{put,call,take,select,all,takeEvery,cancel})
            })
        }
        return myTake
    }
    callReducer(reducer,type){
        if(type in reducer){
            return reducer[type]
        }else{
            return (state)=>{return state}
        }
    }
    toAttribute(){
        let reducerObj ={}
        let effectArr = []
        let namespaceObj = {}
        for(let key in this.models){
            let {namespace,Reducers,Effects,state={}} = this.models[key];
            if(namespace in reducerObj){
                throw new Error(`There are namespace ${namespace} repeated existence in ${reducerObj[namespace]}`)
            }
            namespaceObj[namespace] = key;
            reducerObj[namespace] = (newState,action)=>{
                return this.callReducer(Reducers,action.type)({...state,...newState},action)
            }
    
            for(let k in Effects){
                let actineType = `${namespace}/${k}`
                effectArr.push(this.createTake(actineType,Effects[k])());
            }
            
        }
        this.SagaAttribute = {
            Effects:function*(){
                yield all(effectArr)
            },
            Reducers:reducerObj,
        }
    }
}

