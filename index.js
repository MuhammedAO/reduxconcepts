const redux = require('redux')
//the  Redux store  holds the state tree. The only way to change the data in the store is to call dispatch() on it.
const createStore = redux.createStore
const combineReducers = redux.combineReducers
//Redux provides a method called combineReducers to combine multiple reducers into a single reducer which can then be passed to the createStore method


//Actions are what allow us to interact with the store
//in it's basic form an action is just a js {} that must have a property of 'type' which describes the kind of action that we want to carry out.
//but we cannot update the store directly with an action. we need to dispatch that action to the reducer which in turn updates the store for us.
//You can think of the actions as the structure and reducers as the behavior that acts on a given structure.
//Also, actions creators are function that return an action.

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICE_CREAM'

function buyCake() {
  return {
    type: BUY_CAKE
  }
}

function iceCream() {
  return {
    type: BUY_ICECREAM
  }
}



// const initialState = {
//   numOfCakes: 35,
//   numOfIceCreams: 40
// }

const initalCakeState = {
  numOfCakes: 35
}
const initalIceCreamState = {
  numOfIceCreams: 40
}




//basically, reducers are functions that accepts currentState and action as args and returns the new/updated state of an application
//reducers specifies how the app's store changes in response to the action sent to the store.
//A function that returns the next state tree, given the current state tree and the action to handle.
//your reducer should not mutate ur state. always remember to spread


// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE: return {
//       ...state,
//       numOfCakes: state.numOfCakes - 1
//     }
//     case BUY_ICECREAM: return {
//       ...state,
//       numOfIceCreams: state.numOfIceCreams - 1
//     }

//     default: return state
//   }
// }

const cakeReducer = (state = initalCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

const iceCreamReducer = (state = initalIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
    }

    default: return state
  }
}


//Redux Store
//You only have one store for your entire application

//The Redux store holds your application state
//Allows access to the state via getState() which our app can use to get access to the state it holds
//Allows state to be updated via dispatch(action) which allows update to the application state.
//Allows you register listeners through subcribe(listener). the subcribe method accepts a fn as its parameter which is executed anytime the state in the redux store changes
//handles unregistering of listeners via the function returned by the subscribe(listener)

// There should only be a single store in your app. To specify how different parts of the state tree respond to actions, you may combine several reducers into a single reducer function by using combineReducers.

//the convention in redux is to call the combination of your reducers as the rootReducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

const store = createStore(rootReducer)
// const store = createStore(reducer)

//createStore accepts a parameter which is the reducer fn which holds the initialState of the application.
//this is required for the store to make the state transitions based on the actions recieved
console.log('initial State', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(iceCream())
store.dispatch(iceCream())
unsubscribe()

