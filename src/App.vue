<template>
    <router-view />
</template>

<script>
export default {
    created() {
        this.$store.dispatch("film/getGenres");
        this.$store.dispatch("auth/initAuth");
    }
}
</script>

<style lang="scss">
@import "src/assets/scss/main.scss";
</style>