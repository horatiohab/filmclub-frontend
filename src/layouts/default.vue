<template>
    <main class="">
        <app-header />
        <side-nav />
        <div class="sm:pl-32 pl-0 pt-16">
            <div class="container mx-auto px-10">
                <router-view />
            </div>            
            
            <login-modal v-if="$store.state.auth.loginModal" />
            <add-film-modal v-if="$store.state.film.filmModal" />
        </div> 
    </main>
</template>

<script>
// export default {
//     mounted () {
//         // console.log("env", process.env.VITE_TMDB_API_KEY);
//         /** gets all the genres */
//         this.$store 
//             .dispatch("film/getGenres")
//             .then(response => {
//                 console.log("genres response:", response)
//                 console.log("some stuff", this.$store.state.film.genres)

//             })
//             .catch(err => {
//                 console.log("err", err)
//             })
//     },
// }
</script>