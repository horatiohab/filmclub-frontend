<template>
    <nav class="*base* - fixed z-40 bg-gray-800 shadow-md flex *desktop* - sm:w-32 sm:top-16 sm:min-h-screen sm:flex-col sm:justify-start *mobile* - bottom-0 w-full flex-row justify-evenly h-16 items-center">

        <router-link v-for="link in links" :key="link.text" :to="link.to" class="sm:py-4 sm:border-b sm:border-gray-900 sm:w-full text-center divide-y divide-slate-700">
            <img class="h-8 mx-auto" :src="`src/assets/svg/${link.src}.svg`" alt="">
            <p class="hidden sm:block">{{ link.text }}</p>
        </router-link>
        
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                links: [
                    { text: 'Watch List', section: '#section-1', to: '/watch-list', src: 'ticket-solid', to: '/', id: '1' },
                    { text: 'Watched', section: '#section-2', to: '/watched', src: 'check-double-solid', to: '/watched', id: '2' },
                    { text: 'Profile', section: '#section-3', to: '/profile', src: 'user-solid', to: '/profile', id: '3' },
                ],
            }
        },        
    }

</script>

<style lang="scss" scoped>

    
    img {        
        filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(219deg) brightness(105%) contrast(102%) opacity(45%);
    }

    .router-link-exact-active {
        background: #111827;

        img {
            filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(6493%) hue-rotate(61deg) brightness(128%) contrast(75%);
        }
        p {
            color: #dfdfdf
        }
    }

</style>