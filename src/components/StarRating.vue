<template>
    <div class="flex">
        <div class="relative  text-2xl self-start">                                    
            <div class="absolute overflow-hidden" id="starRating" :style="`width: ${width}%`">
                <span class="text-yellow-400">★★★★★★★★★★</span>
            </div>
            <span class="block">★★★★★★★★★★</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['width']
    }
</script>

<style lang="scss" scoped>

</style>