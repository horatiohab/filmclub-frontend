<template>
    <div class="flex pt-8">
        <div class="w-2/3">
            <div class="flex overflow-hidden bg-gray-800 h-80 rounded-xl mr-8 mb-8" v-for="film in watchList" :key="film.id">

                <img class="" :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2${film.imgSRC}`" alt="">

                <div>
                    <h1>{{ film.title }}</h1>
                    <p>{{ film.description }}</p>
                    
                    <div class="flex items-center">
                        <star-rating :width="film.imdbRating * 10 || 0" />
                        <p class="text-sm pl-3 pt-1.5">{{ film.imdbRating }} / 10</p>
                    </div>

                </div>



            </div>
        </div>


        <div class="w-1/3">
            <div class="bg-green-500 h-96 rounded-xl mb-5">

            </div>

            <!-- <div class="sticky top-20 bg-gray-400 h-10 w-2/3 rounded-xl grid place-items-center cursor-pointer"> -->
                <button @click="addFilmBtn" class="sticky top-20 bg-gray-400 h-10 w-2/3 rounded-xl grid place-items-center cursor-pointer" v-if="$store.getters['auth/isAuthenticated']">Add film to list</button>
            <!-- </div> -->
        </div>


        <!-- <div v-if="$store.getters['auth/isAuthenticated']">
            Is Logged In! :)
        </div>

        <div v-if="!$store.getters['auth/isAuthenticated']">
            Not Logged In! :(
        </div> -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                inputs: [
                    { type: 'email', name: 'email', placeholder: 'Email', validation: 'email', 'input-class': "w-full rounded p-2 bg-gray-600" },
                    { type: 'password', name: 'password', placeholder: 'Password', validation: 'required', 'input-class': "w-full rounded p-2 bg-gray-600" },
                    { type: 'submit', name: 'submit', label: 'Login', 'input-class': "w-full rounded-full p-2 bg-blue-900" },
                    { name: 1 },
                    { name: 2 },
                    { name: 3 },
                    { name: 4 },
                ],
            }
        },
        created () {
            this.$store.dispatch("film/getFilms");
        },
        computed: {
            watchList: {
                get() {
                    return this.$store.state.film.watchList
                }
            }
        },
        methods: {
            addFilmBtn() {
                this.$store.commit("film/SHOW_FILM_MODAL")
            }
        },
    }
</script>
