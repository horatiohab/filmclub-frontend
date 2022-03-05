<template>
    <section class="fixed inset-0 z-50 w-screen h-screen" @click="hideModal">
        <div class="grid h-full place-content-center bg-black bg-opacity-30" id="hideLogin">
            <div class="bg-gray-800 shadow-md px-20 py-10 rounded-lg" id="loginCard">
                <h3 class="pb-3 text-2xl">Sign In</h3>
                <FormKit type="form" name="submit" submit-label="Login" label-class="w-full rounded-full p-2 bg-blue-900" :actions="false" @submit="onSubmit">

                    <div class="my-6 sm:w-80" v-for="input in inputs" :key="input.name">
                        <FormKit          
                            message-class="absolute text-red-600 text-sm"                                     
                            v-bind="input"
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
                inputs: [
                    { type: 'email', name: 'email', placeholder: 'Email', validation: 'email', 'input-class': "w-full rounded p-2 bg-gray-600" },
                    { type: 'password', name: 'password', placeholder: 'Password', validation: 'required', 'input-class': "w-full rounded p-2 bg-gray-600" },
                    { type: 'submit', name: 'submit', label: 'Login', 'input-class': "w-full rounded-full p-2 bg-blue-900" },
                ],
            }
        },        
        methods: {
            async onSubmit(data) {
                console.log(data)
                await this.$store
                    .dispatch("auth/authenticateUser", {
                        email: data.email,
                        password: data.password
                    })
                    .then(response => {
                        console.log("test response:", response)
                        this.$store.commit("auth/HIDE_LOGIN_MODAL")
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    
            },
            hideModal(target) {
                if (target.srcElement.id === "hideLogin") {
                    this.$store.commit("auth/HIDE_LOGIN_MODAL")
                }
            }
        },
    }

</script>

<style lang="scss" scoped>

</style>