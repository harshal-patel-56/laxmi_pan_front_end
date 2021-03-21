<template>
  <div id="login">
    <v-container>
      <v-row class="justify-content-md-center mt-4">
        <v-col col md="6">
          <v-card header="Admin login"
                  header-bg-variant="primary"
                  header-text-variant="white">
            <v-card-text>
              <v-form @submit="onSubmit" class="mt-3">
                <div class="form-group text-left">
                  <v-label class="font-weight-bold" for="username">Username</v-label>
                  <v-text-field
                    type="text"
                    name="username"
                    id="username"
                    class="mt-1"
                    outlined
                    dense
                    required
                    hide-details
                    placeholder="Username"
                    v-model="username"></v-text-field>
                </div>

                <div class="form-group text-left">
                  <v-label class="font-weight-bold" for="password">Password</v-label>
                  <v-text-field
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    name="password"
                    id="password"
                    class="mt-1"
                    outlined
                    dense
                    required
                    hide-details
                    placeholder="Password"
                    v-model="password"
                    @click:append="show = !show"></v-text-field>
                </div>

                <div class="d-flex justify-content-center">
                  <button class="btn btn-primary" :disabled="acceptableSubmission">Login</button>
                </div>

              </v-form>
              <p class="text-danger text-center mt-3 mb-0 h5" v-if="error!==''">{{ errorMessage }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    // import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                error: ''
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault();
                const credentials = {
                    role: 'admin',
                    username: this.username,
                    password: this.password,
                };
                let self = this;
                // this.$store.dispatch('login', credentials).then((res) => {
                //     if (this.$store.state.auth.error != null) {
                //         self.error = this.$store.state.auth.error;
                //     }
                // });
            },
            changeUserRole(role) {
                this.userType = role;
            }
        },
        computed: {
            // ...mapGetters(['userData']),
            acceptableSubmission() {
                return !(this.username.length >= 0 && this.password.length >= 0)
            },
            errorMessage() {
                if (this.error === 'INVALID_ID')
                    return "Invalid username";
                else if (this.error === 'INVALID_PASSWORD')
                    return "Invalid password"
                else
                    return "An error occurred during login. Try after some time."
            }
        }
    }
</script>

<style scoped>
    .card-body{
        padding: 6px 18px 18px 18px;
    }
    /*.card {*/
    /*    border: 0;*/
    /*    border-radius: 10px;*/
    /*    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.15)*/
    /*}*/

    /*.card .card-header {*/
    /*    border-radius: 10px 10px 0 0;*/
    /*}*/

    .user-tab {
        margin: 0;
        position: relative;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        display: inline-block;
    }

    .user-tab.active {
        border-bottom: 0.14rem solid #007bff;
    }

    .user-tab.inactive {
        color: #cccccc;
    }

    .user-tab:hover {
        cursor: pointer;
    }

    .underlineHover:after {
        position: absolute;
        display: block;
        left: 50%;
        bottom: -0.14rem;
        width: 0px;
        height: 0.1rem;
        background-color: #007bff;
        content: "";
        transition: width 0.3s ease 0s, left 0.3s ease 0s;
    }

    .underlineHover:hover {
        color: #2c3e50;
    }

    .underlineHover:hover:after {
        width: 100%;
        left: 0;
    }
</style>
