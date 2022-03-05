<template>
    <header class="fixed z-50 flex justify-between items-center bg-gray-800 h-16 w-screen shadow-md px-10">
        <div>
            Logo and stuff
        </div>

        <button class="cursor-pointer" @click="onLoginClick" v-if="!$store.getters['auth/isAuthenticated']">
            Log in
        </button>

        <button class="cursor-pointer" @click="onLogoutClick" v-if="$store.getters['auth/isAuthenticated']">
            Log out
        </button>

    </header>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            onLoginClick() {
                this.$store.commit("auth/SHOW_LOGIN_MODAL")
            },
            onLogoutClick() {
                this.$store.dispatch("auth/logout")
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>