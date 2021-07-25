import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { call, takeEvery, put } from '@redux-saga/core/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_MOVIE', fetchMovieDetail);
    yield takeEvery('GET_GENRES', fetchGenres);
    yield takeEvery('ADD_MOVIE', addMovie)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }       
}

function* fetchMovieDetail(action) {
    // get a single movie detail from DB
    try {
        const movieDetail = yield axios.get(`/api/movie/${action.payload}`);
        console.log('getting movie:', movieDetail.data);
        yield put({type: 'SET_MOVIE_DETAIL', payload: movieDetail.data})
    } catch (err) {
        console.log('get movie detail error', err);
    }
}

function* fetchGenres(){
    // Get all genres from DB
    try{
        const genres = yield axios.get('/api/genre');
        yield put({type:'SET_GENRES', payload: genres.data});
    } catch (err) {
        console.log('get genres error', err);
    }
}

function* addMovie(action){
    // Add new movie input to DB
    try{
        yield call(axios.post, '/api/movie', action.payload);
        yield put({type: 'FETCH_MOVIES'});
    } catch (err) {
        console.log('error adding new movie', err);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        case 'SET_MOVIE_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
