import axios from 'axios'

const state = () => ({
    filmModal: false,
    movieSearchList: null,
    
    genres: [],
    watchList: [],
    
})

const mutations = {
    /** sets the login modal to true to display */
    SHOW_FILM_MODAL (state) {
        state.filmModal = true
    },
    /** sets the login modal to false to hide */
    HIDE_FILM_MODAL (state) {
        state.filmModal = false
    },
    /** sets the movie search list to what was searched */
    SET_MOVIE_SEARCH (state, movies) {
        state.movieSearchList = movies
    },
    /** sets the list of genres available */
    SET_GENRES_LIST (state, genres) {
        state.genres = genres
    },
    /** sets the watch list to the list of added films */
    SET_WATCH_LIST (state, films) {
        state.watchList = films
    },
}

const actions = {
    async searchFilm(context, data) {
        /** search films api request */        
        const apiKey = process.env.VITE_TMDB_API_KEY
        
        console.log(apiKey)
        console.log("apiKey :", apiKey)
        
        return await axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${data.input}`, { headers: {"Content-Type": "application/json" } } )
            .then(response => {
                console.log(response)
                context.commit("SET_MOVIE_SEARCH", response.data.results)
            })
    },

    async getGenres(context, data) {
        /** get genres api request */
        const apiKey = process.env.VITE_TMDB_API_KEY

        return await axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, { headers: {"Content-Type": "application/json" } } )
            .then(response => {
                console.log("response asd: ", response.data.genres)
                context.commit("SET_GENRES_LIST", response.data.genres)
            })
            .catch(err => {
                console.log(err)
            })
    },

    async addFilm(context, data) {
        /** create film api request */
        const apiKey = process.env.VITE_TMDB_API_KEY
        const token = context.rootState.auth.token

        console.log("test :", context)
        
        return await axios
            .post('https://filmclubenv.herokuapp.com/api/v1/film/', { 
                id: data.id,
                addedBy: "poopypants",
                title: data.title,
                description: data.description,
                imdbRating: data.imdbRating,
                imgSRC: data.imgSRC,
                // genreIds: data.genreIds,
                // releaseData: data.releaseData,               
            }, 
            {
                headers: {
                    "Authorization": `Bearer ${token}` 
                },
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    },

    async getFilms (context, data) {
        /** get films api request */
        const apiKey = process.env.VITE_TMDB_API_KEY
        const token = context.rootState.auth.token

        return await axios
            .get('https://filmclubenv.herokuapp.com/api/v1/film/', {
                headers: { 
                    "Authorization": `Bearer ${token}` 
                }
            })
            .then(response => {
                console.log("films :", response.data.data)
                context.commit("SET_WATCH_LIST", response.data.data)
            })
            .catch(error => {
                console.log("error :", error)
            })

    }
 
}

const getters = {
    // getGenres(state) { // checks if there is a token that hasn't expired yet
    //     const token = state.genres

    //     return false
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
