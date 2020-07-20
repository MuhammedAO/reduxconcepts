const redux = require('redux')
const createStore = redux.createStore
//the redux lib provides a fn called applyMiddleware() which is used to apply middleware
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
    
  }
}
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload:error
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

//Middleware is the suggested way to extend functionality in redux
//it provides a 3rd party extension point between dispatching an action and the moment it reaches the reducer
//you can use middleware for a lot of things including performing asynchronous tasks

//How to make an Api Call when working with redux
//Async action creators

//there are two very popular middleware libraries that allow for side effects and asynchronous actions: Redux Thunk and Redux Saga.

//Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store’s dispatch method, which is then used to dispatch regular synchronous actions inside the body of the function once the asynchronous operations have completed.

//The most common use-case for Redux Thunk is for communicating asynchronously with an external API to retrieve or save data. Redux Thunk makes it easy to dispatch actions that follow the lifecycle of a request to an external API.

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest())
    axios.get('https://jsonplaceholder.typicode.com/users')
   .then(response => { 
     const users = response.data.map(user => user.id)
     dispatch(fetchUsersSuccess(users))
   })
   .catch(error => {
    dispatch(fetchUsersFailure(error.message))
   })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())
