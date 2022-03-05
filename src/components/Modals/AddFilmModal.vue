<template>
    <section class="fixed inset-0 z-50 w-screen h-screen" @click="hideModal">
        <div class="grid h-full place-content-center bg-black bg-opacity-30" id="hideModal">
            <div class="bg-gray-800 shadow-md px-20 py-10 rounded-lg" id="loginCard">
                <h3 class="pb-3 text-2xl">Add Film</h3>

                    <FormKit type="form" name="submit" submit-label="Login" label-class="w-full rounded-full p-2 bg-blue-900" :actions="false" @submit="onSubmit">
                        <div class="relative my-6 sm:w-80">
                            <input type="search" class="w-full rounded p-2 bg-gray-600" placeholder="Search films..." v-model="search" v-debounce:300ms="searchMovie" />
                            <!-- <FormKit 
                                @input="searchMovie"
                                input-class="w-full rounded p-2 bg-gray-600"
                                type="search"
                                placeholder="Search films..."
                            /> -->

                            <div class="absolute z-50 w-full max-h-96 bg-gray-700 rounded mt-1 overflow-y-scroll" v-if="showDropDown === true">
                                <div class="flex items-center hover:bg-gray-600 border-b border-gray-600 cursor-pointer" v-for="(result, index) in movieSearchList" :key="result.id" @click="selectMovie(index)">
                                    <img class="h-16" :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2${result.poster_path}`" alt="">
                                    <div class="ml-5">
                                        <p class="text-white">{{ result.title }}</p>
                                        <p v-if="result.release_date" class="text-gray-400">{{ result.release_date.split("-")[0]}}</p>
                                    </div>                                
                                </div>
                            </div>

                            



                            <div class="relative my-5 text-white">
                                <!-- <div> -->
                                    <!-- <div class="absolute bg-gradient-to-b from-transparent via-gray-800-1/2 to-gray-800 w-full h-full"></div> -->
                                    <img class="w-full rounded" :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2${selectedMovie.imgSRC}`" alt="">
                                    
                                    

                                    <div class="absolute px-3 pt-36 right-0 bottom-0 w-full ml-5 bg-gradient-to-t from-gray-800 via-gray-800-1/2 to-transparent" v-if="selectedMovie.id">
                                        <h2 class="text-xl">{{ selectedMovie.title }}</h2>                               
                                        
                                        

                                        <div class="flex flex-wrap w-full text-sm py-1">
                                            <p>{{ selectedMovie.releaseData.split("-")[0] }}</p> 
                                            <span class="mx-2">|</span>
                                            <p class="mr-1" v-for="genre in selectedMovie.genreIds" :key="genre.id">{{ genres.find(item => item.id == genre).name }}</p>
                                            <!-- <span class="mx-2">|</span> -->
                                        </div>
                                        <p class="text-xs">{{ selectedMovie.description }}</p>

                                        <div class="flex items-center">
                                            <star-rating :width="this.selectedMovie.imdbRating * 10 || 0" />
                                            <p class="text-sm pl-3 pt-1.5">{{ selectedMovie.imdbRating }} / 10</p>
                                        </div>
                                        
                                    </div>

                                                                    

                                <!-- </div> -->
                                <!-- <div class="pl-5"> -->
                                    <!-- <p>{{ selectedMovie.description }}</p> -->
                                <!-- </div> -->                                
                            </div>

                            <FormKit 
                                type="submit" 
                                name="submit"
                                label="Add"
                                input-class="w-full rounded-full p-2 bg-blue-900"
                            />

                        </div>
                    </FormKit>

            </div>
            
        </div>
    </section>
</template>

<script>

    export default {
        data() {
            return {
                movieSearchList: [],
                showDropDown: false,
                selectedMovie: {},
                genres: this.$store.state.film.genres,
                // starRating: 0,
            }
        },
        methods: {
            async searchMovie(event) {
                console.log("event :", this.search)
                
                await this.$store
                    .dispatch("film/searchFilm", {
                        input: this.search
                    })
                    .then(response => {
                        console.log("test response:", response)
                        this.movieSearchList = this.$store.state.film.movieSearchList
                        console.log("movies search list", this.movieSearchList[0].title)
                        this.showDropDown = true
                    })
                    .catch(err => {
                        console.log(err)
                    })

            },
            hideModal(target) {
                if (target.srcElement.id === "hideModal") {
                    this.$store.commit("film/HIDE_FILM_MODAL")
                }
            },
            selectMovie(i) {
                const params = { 
                    id: this.movieSearchList[i].id,
                    title: this.movieSearchList[i].title,
                    description: this.movieSearchList[i].overview,
                    imdbRating: this.movieSearchList[i].vote_average,
                    imgSRC: this.movieSearchList[i].poster_path,
                    genreIds: this.movieSearchList[i].genre_ids,
                    releaseData: this.movieSearchList[i].release_date,            
                }

                this.selectedMovie = params
                this.showDropDown = false

                console.log(params)



                // this.fetchGenres();

            },
            async onSubmit() {

                console.log(this.selectedMovie)
                await this.$store
                    .dispatch('film/addFilm', {
                        id: this.selectedMovie.id,
                        title: this.selectedMovie.title,
                        description: this.selectedMovie.description,
                        imdbRating: this.selectedMovie.imdbRating,
                        imgSRC: this.selectedMovie.imgSRC,
                        genreIds: this.selectedMovie.genreIds,
                        releaseData: this.selectedMovie.releaseData,
                    })
            }
            // async fetchGenres() {
            //     await this.$store
            //         .dispatch("film/getGenres")
            //         .then(response => {
            //             console.log("genres response:", response)
            //             // genres = response
                        
            //         })
            // }
        },
    }

</script>

<style lang="scss" scoped>


</style>