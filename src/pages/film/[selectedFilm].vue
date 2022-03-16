<template>
    <div>
        test film pageee
        {{ $attrs.selectedFilm }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        created () {
            console.log("this", this)
        },
    }
</script>

<style lang="scss" scoped>

</style>