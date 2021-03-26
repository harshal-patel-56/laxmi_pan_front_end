<template>
  <v-app id="inspire">
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title
        style="width: 350px"
      >
        <a href="/" class="white--text" style="text-decoration: none">
          <v-avatar style="margin-right: 10px" :size="35">
            <v-img :src="info.src" v-model="info.name">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-avatar>
          {{ info.name }}</a>
      </v-toolbar-title>
      <v-spacer/>
      <v-menu open-on-click offset-y v-if="logged_in">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card
          class="mx-auto"
          outlined
        >

          <v-list-item :key="1" class="px-3">
            <v-list-item-title>{{ this.$store.getters.userData.email }}</v-list-item-title>
          </v-list-item>
          <v-divider
            horizontal
          ></v-divider>
          <router-link to="/history"  style="text-decoration: none">
            <v-list-item :key="2" class="px-3">
              <v-list-item-title>Order History</v-list-item-title>
            </v-list-item>
          </router-link>
          <v-divider
            horizontal
          ></v-divider>
          <v-list-item :key="2" class="px-3" @click="logout">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>

        </v-card>
      </v-menu>
      <v-dialog
        v-if="!logged_in"
        v-model="login_dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            v-bind="attrs"
            v-on="on"
            class="mx-2"
          >
            LOG IN
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-center justify-center">
            <v-row>
              <v-col cols="12">
                <v-icon color="primary" size="30">mdi-lock</v-icon>
              </v-col>
              <v-col cols="12">
                <span class="headline">Login</span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row style="font-family: 'Courier New';">
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      type="email"
                      v-model="loginInfoObject.email"
                      :rules="[
                        v => !!v || 'E-mail required',
                        v => /^[a-z0-9](?!.*\.\.|.*\._)[a-z0-9._-]+[a-z0-9]@[a-z][a-z0-9]+(\.[a-z]{2,3}){1,2}$/.test(v) || 'Incorrect email format.',
                      ]"
                      dense
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :type="loginInfoObject.show ? 'text' : 'password'"
                      :append-icon="loginInfoObject.show ? 'mdi-eye' : 'mdi-eye-off'"
                      label="Password"
                      solo
                      dense
                      v-model="loginInfoObject.password"
                      :rules="[
                        v => !!v || 'Password required',
                        v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v) || 'Password must contain minimum eight characters, at least one letter, one number and one special character from @$!%*#?&',
                      ]"
                      required
                      @click:append="loginInfoObject.show = !loginInfoObject.show"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" v-if="loginInfoObject.loginError">
                    <v-alert type="error">
                      {{ loginInfoObject.loginError }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-content-center text-center">
            <v-spacer></v-spacer>
            <v-btn
              color="warning"
              outlined
              @click="login_dialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              outlined
              @click="login()"
              :disabled="validateLogin"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-if="!logged_in"
        v-model="signup_dialog"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">

          <v-btn
            outlined
            v-bind="attrs"
            v-on="on"
            class="mx-2"
          >
            Sign Up
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-center justify-center">
            <v-row>
              <v-col cols="12">
                <v-icon color="primary" size="30">mdi-account-circle</v-icon>
              </v-col>
              <v-col cols="12">
                <span class="headline">SIGN UP</span>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form>
                <v-row style="font-family: 'Courier New';">
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      type="email"
                      v-model="signupInfoObject.email"
                      :rules="[
                        v => !!v || 'E-mail required',
                        v => /^[a-z0-9](?!.*\.\.|.*\._)[a-z0-9._-]+[a-z0-9]@[a-z][a-z0-9]+(\.[a-z]{2,3}){1,2}$/.test(v) || 'Incorrect email format.',
                      ]"
                      dense
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Full Name"
                      type="text"
                      v-model="signupInfoObject.name"
                      :rules="[v => !!v || 'Full Name required']"
                      dense
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Contact"
                      prefix="+91 "
                      type="text"
                      v-model="signupInfoObject.contact"
                      :rules="[
                        v => !!v || 'Password required',
                        v => /^[0-9]{10}$/.test(v) || 'Contact number should be 10 digits long',
                      ]"
                      dense
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :type="signupInfoObject.show ? 'text' : 'password'"
                      :append-icon="signupInfoObject.show ? 'mdi-eye' : 'mdi-eye-off'"
                      label="Password"
                      solo
                      dense
                      @click:append="signupInfoObject.show = !signupInfoObject.show"
                      v-model="signupInfoObject.password"
                      :rules="[
                        v => !!v || 'Password required',
                        v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v) || 'Password must contain minimum eight characters, at least one letter, one number and one special character from @$!%*#?&',
                      ]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" v-if="signupInfoObject.signUpInfo">
                    <v-alert type="info">
                      {{ signupInfoObject.signUpInfo }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-content-center text-center">
            <v-spacer></v-spacer>
            <v-btn
              color="warning"
              outlined
              @click="signup_dialog = false;resetSignupObject()"
            >
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              outlined
              @click="signUp()"
              :disabled="validateSignup"
            >
              Sign Up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <router-link to="/cart">
        <v-btn icon>
          <v-badge
            :content="cartCount"
            :value="cartCount"
            color="green"
            overlap
          >
            <v-icon color="white">mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-content>
      <v-bottom-navigation
        :value="activeBtn"
        color="primary"
        horizontal
      >
        <router-link to="/" class="v-btn">
          <span>Home</span>
        </router-link>
        <router-link to="/shop" class="v-btn">
          <span>Shop</span>
        </router-link>
      </v-bottom-navigation>
    </v-content>
    <router-view @changeCartCount="changeCartCount" @changeUserLoginStatus="changeUserLoginStatus"/>
    <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="secondary white--text"
      >
        <v-container fluid>
          <v-row>
            <v-col sm="12" md="4">
              <v-list-item three-line>
                <v-list-item-icon class="align-center">
                  <v-icon class="mx-4 white--text" size="32px">mdi-map-marker-radius-outline</v-icon>
                </v-list-item-icon>
                <v-divider vertical style="border-color: white"></v-divider>
                <v-list-item-content class="px-5">
                  <v-list-item-title class="white--text">Location</v-list-item-title>
                  <v-list-item-subtitle class="white--text">
                    Patel Society, Mota Bazaar,Vallabh Vidyanagar, Anand, Gujarat 388120
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col sm="12" md="4">
              <v-list-item three-line>
                <v-list-item-icon class="align-center">
                  <v-icon class="mx-4 white--text" size="32px">mdi-clock-outline</v-icon>
                </v-list-item-icon>
                <v-divider vertical style="border-color: white"></v-divider>
                <v-list-item-content class="px-5">
                  <v-list-item-title class="white--text">Open Hours</v-list-item-title>
                  <v-list-item-subtitle class="white--text">
                    Monday - Sunday<br/>07:30 - 24:00
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col sm="12" md="4">
              <v-list-item>
                <v-list-item-icon class="align-center">
                  <v-icon class="mx-4 white--text" size="32px">mdi-phone-outline</v-icon>
                </v-list-item-icon>
                <v-divider vertical style="border-color: white"></v-divider>
                <v-list-item-content class="px-5">
                  <v-list-item-title class="white--text">Call</v-list-item-title>
                  <v-list-item-subtitle class="white--text">
                    97372 27521 <br/> 70485 07948
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>

        <!--        <v-card-text class="white&#45;&#45;text text-center pt-0">-->
        <!--          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent-->
        <!--          ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet-->
        <!--          dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum-->
        <!--          ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci-->
        <!--          varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.-->
        <!--        </v-card-text>-->

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          {{ new Date().getFullYear() }} — &copy; <strong>Laxmi Pan</strong>. All rights reserved.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import axios from "axios";
import {router} from "../main";

export default {
  data() {
    return {
      isLoading: false,
      logged_in: false,
      signup_dialog: false,
      cartCount: 0,
      role: 'user',
      loginInfoObject: {
        email: '',
        password: '',
        loginError: '',
        show: false,
      },
      signupInfoObject: {
        email: '',
        name: '',
        contact: '',
        password: '',
        signUpInfo: '',
        show: false,
      },
      login_dialog: false,
      info: {
        id: 1,
        name: 'Laxmi Pan',
        address: 'Isckon Rd, Vallabh Vidhyanagar, Mota Bazar, 388120.',
        src: require('../assets/img/logo.png')
      },
      activeBtn: 1,
    }
  },
  async mounted() {
    console.log(this.$store.getters.authStatus)
    if (this.$store.getters.authStatus === true) {
      this.logged_in = true
      await axios.get("/api/cart", {withCredentials: true}).then(response => {
        const data = response.data
        console.log(data)
        if (data.message === "SUCCESS") {
          const products = data.cart.products
          this.changeCartCount(products.length)
          // console.log(this.shoppingCart)
        }
      }).catch(error => {
        console.log(error.response)
      })
    }
    // this.cartCount = this.getCartCount()
    this.role = 'user'
  },
  methods: {
    getCartCount() {
      return 4
    },
    changeUserLoginStatus(status) {
      this.logged_in = status
    },
    changeCartCount(count) {
      this.cartCount = count
    },
    async login() {
      // console.log(this.loginInfoObject)
      this.isLoading = true
      const credentials = {
        role: this.role,
        email: this.loginInfoObject.email.trim(),
        password: this.loginInfoObject.password.trim(),
      };

      await axios.post("/api/login", credentials, {withCredentials: true})
        .then(response => {
          console.log(response.data);
          const data = response.data;
          if (data['message'] === "SUCCESS") {
            console.log(data['userData']);
            localStorage.setItem('userData', JSON.stringify(data['userData']));
            this.$store.commit('setUserData', data['userData']);
            this.login_dialog = false
            this.loginInfoObject = {
              email: '',
              password: '',
              loginError: ''
            }
            this.logged_in = true
            this.$router.go(0)
          }
        })
        .catch(error => {
          console.log(error.response);
          this.loginInfoObject.loginError = error.response.data['message']
          this.$store.commit('setError', error.response.data['message']);
        });
      this.isLoading = false
      // let self = this;
      // this.$store.dispatch('login', credentials).then((res) => {
      //   if (this.$store.state.auth.error != null) {
      //     self.error = this.$store.state.auth.error;
      //   }
      // });

    },

    async logout() {
      this.isLoading = true
      await axios.post("/api/logout", {}, {withCredentials: true}).then(response => {
        console.log(response.data);
        const data = response.data;
        if (data['message'] === "SUCCESS") {
          localStorage.removeItem('userData');
          this.$store.commit('removeUserData');
          this.logged_in = false
          this.$store.dispatch("logout")
        }
      }).catch(error => {
        console.log("error");
        console.log(error);
      });
      this.isLoading = false
    },

    async signUp() {
      // console.log(this.signupInfoObject)

      this.isLoading = true
      const userDetails = {
        email: this.signupInfoObject.email.trim(),
        name: this.signupInfoObject.name.trim(),
        contact: this.signupInfoObject.contact.trim(),
        password: this.signupInfoObject.password.trim(),
      };

      await axios.post("/api/users", userDetails, {withCredentials: true})
        .then(response => {
          console.log(response.data);
          const data = response.data;
          if (data['message'] === "SUCCESS") {
            console.log(data['m_id']);
            this.signupInfoObject.signUpInfo = "Created account successfully"
          }
        })
        .catch(error => {
          console.log(error.response);
          this.signupInfoObject.signUpInfo = error.response.data['message']
          this.$store.commit('setError', error.response.data['message']);
        });
      this.isLoading = false
    },
    resetSignupObject() {

      this.signupInfoObject = {
        email: '',
        name: '',
        contact: '',
        password: '',
        signUpInfo: '',
        show: false,
      }
    }
  },
  computed: {
    validateLogin() {
      return (
        this.loginInfoObject.email.trim() === ''
        || !/^[a-z0-9](?!.*\.\.|.*\._)[a-z0-9._-]+[a-z0-9]@[a-z][a-z0-9]+(\.[a-z]{2,3}){1,2}$/.test(this.loginInfoObject.email)
        || this.loginInfoObject.password.trim() === ''
        || this.loginInfoObject.password.trim().length < 8
        || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(this.loginInfoObject.password)
      )
    },
    validateSignup() {
      return (
        this.signupInfoObject.email.trim() === ''
        || !/^[a-z0-9](?!.*\.\.|.*\._)[a-z0-9._-]+[a-z0-9]@[a-z][a-z0-9]+(\.[a-z]{2,3}){1,2}$/.test(this.signupInfoObject.email)
        || this.signupInfoObject.password.trim() === ''
        || this.signupInfoObject.password.trim().length < 8
        || this.signupInfoObject.contact.trim() === '' || !/^[0-9]{10}$/.test(this.signupInfoObject.contact)
      )
    }
  }
}
</script>
<style>
.v-dialog > .v-card > .v-card__subtitle, .v-dialog > .v-card > .v-card__text {
  padding: 0 24px;
}

.v-alert {
  margin-bottom: 0;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  transition: background-color 5000s ease-in-out 0s;
}
</style>
