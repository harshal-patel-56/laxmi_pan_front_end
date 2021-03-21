<template>
    <div id="error" class="container-fluid h-100">
        <div class="page-center w-100 text-center">
            <p class="d-block text-danger mb-2" style="font-size: 30px">{{ getErrorMessage() }}</p>
            <button class="btn btn-primary" @click="refresh">Back to home</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error",
        methods: {
            refresh() {
                console.log("Go home")
                this.$router.replace('/')
            },
            getErrorMessage() {
                if (this.$route.params.error_code === 'SESSION_LOGGED_OUT') {
                    return "You are logged out! Try login again";
                } else if (this.$route.params.error_code === 'INVALID_ROLE') {
                    return "You are not authorized to access page"
                } else {
                    return "Something went wrong";
                }
            }
        }
    }
</script>

<style scoped>
    .page-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>