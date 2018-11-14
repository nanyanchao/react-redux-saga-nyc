import { createStore,combineReducers,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ToSaga from "./toSagaAttribute"

class Saga{
    constructor(){
        this.models = null;
        this.store = null;
    }
    setModels(models){
        const toSaga = new ToSaga(models)
        this.models = toSaga.SagaAttribute;
        this.storeCreate();
    }
    storeCreate(){
        const sagaMiddleware = createSagaMiddleware() 
        this.store = createStore(
            combineReducers(this.models.Reducers),
            applyMiddleware(sagaMiddleware))
        sagaMiddleware.run(this.models.Effects)
    }
}

exports.saga = new Saga();