<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">ITEM</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="shoppingCart.length === 0">
                <td colspan="4" class="text-center">NO PRODUCTS IN THE CART.
                  <router-link to="/shop">SHOP HERE</router-link>
                </td>
              </tr>
              <tr v-else :key="prod.id" v-for="prod in shoppingCart">
                <td>
                  <v-list-item
                    :key="prod.id"
                    @click=""
                  >
                    <v-list-item-avatar>
                      <v-img :src="prod.src">
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
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ prod.name }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </td>
                <td>₹{{ prod.price }}</td>
                <td>
                  <v-text-field
                    class="pt-10"
                    label="Outlined"
                    style="width: 80px;"
                    single-line
                    outlined
                    dense
                    :rules="quantityRules"
                    min="1"
                    max="1000"
                    v-model="prod.quantity"
                    @error="prod.quantity = 0"
                    @change="updateUserCart"
                    :loading="updatingCart"
                    :disabled="updatingCart"
                    type="number"
                  ></v-text-field>
                </td>
                <td v-bind:id="prod.id" v-model="shoppingCart">₹{{ Number(prod.price) * Number(prod.quantity) }}</td>
                <td>
                  <v-icon
                    small
                    @click="deleteItem(prod)"
                  >
                    mdi-delete
                  </v-icon>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">Shipping and additional costs are calculated based on values you have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Order Subtotal</td>
                <td class="text-right" style="width: 50px;" v-model="shoppingCart">₹{{ getFinalTotal() }}</td>
              </tr>
              <tr>
                <td>Shipping Charges</td>
                <td class="text-right" style="width: 50px;">₹0.00</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td class="text-right" style="width: 50px;">₹0.00</td>
              </tr>
              <tr>
                <td>Total</td>
                <td class="text-right" style="width: 50px;" v-model="shoppingCart"><b>₹{{ getFinalTotal() }}</b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn v-model="shoppingCart" :class="(getFinalTotal() !== 0) ? 'primary white--text mt-5' : 'grey white--text mt-5'" :disabled="getFinalTotal === 0" outlined @click="proceedToPay">PROCEED TO PAY</v-btn>
          </div>
        </v-col>
      </v-row>
      <div class="row" style="font-family: 'Courier New'">

        <v-snackbar
          v-model="snackbar"
        >
          {{ snackbarText }}

          <v-btn
            :color="snackbarColor"
            text
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </div>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import {router} from "../main";

export default {
  data: () => ({
    rating: 4.5,
    editedIndex: -1,
    updatingCart: false,
    editedItem: {
      id: null,
      name: '',
      price: '',
      quantity: null,
      src: null
    },
    snackbar: false,
    snackbarText: "",
    snackbarColor: "green",
    quantityRules: [
      v => !!v || 'Required',
      v => v >= 1 || 'Quantity should be above 0',
      v => v <= 1000 || 'Quantity should not be above 1000',
    ],
    shoppingCart: [],
    products: [],
    breadcrums: [
      {
        text: 'Home',
        disabled: false,
        href: '/',
      },
      {
        text: 'Shop',
        disabled: false,
        href: 'shop',
      },
    ],
    finalTotal: 0,
  }),
  async mounted() {
    this.logged_in = this.$store.getters.authStatus
    this.loginRequiredDialog = false
    await axios.get(
      '/api/products',
      {withCredentials: true}
    ).then(response => {
      const data = response.data
      console.log(data)
      if (data['message'] === "SUCCESS") {
        const prods = data['products']
        this.products = []
        prods.forEach(x => {
          this.products.push({
            id: x['_id'],
            name: x.name,
            price: x.price,
            quantity: 1,
            popularity: x.popularity,
            src: require('../assets/img/shop/1.jpg')
          })
        })
        // this.products = []
      } else {
        // this.products = []
      }
    }).catch(error => {
      this.products = []
    })
    console.log(this.products)

    if (this.$store.getters.authStatus === true) {
      // console.log(prod)
      await axios.get("/api/cart", {withCredentials: true}).then(response => {
        const data = response.data
        console.log(data)
        if (data.message === "SUCCESS") {
          const cart = data.cart.products
          console.log(data)
          cart.forEach(x => {
            var y = this.products.find(z => z.id === x.prod_id);
            // console.log(y)
            if (y) {
              y.quantity = x.units
              this.shoppingCart.push(y)
            }
          })
          this.updateCartCount(this.shoppingCart.length)
          console.log(this.shoppingCart)
        }
      }).catch(error => {
        console.log(error.response)
        this.$store.dispatch("logout")
      })
      // console.log(this.shoppingCart)
    }

  },
  methods: {
    async deleteItem(item) {
      await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
        const data = response.data
      }).catch(error => {
        this.$store.dispatch("logout")
      })
      const updatedList = this.shoppingCart.filter(x => x.id !== item.id)
      var updatedProducts = []
      updatedList.forEach(x => {
        updatedProducts.push({
          prod_id: x.id,
          units: x.quantity
        })
      })
      const updated = {
        email: this.$store.getters.userData.email,
        products: updatedProducts
      }
      await axios.request({
        method: "PUT",
        url: '/api/cart',
        headers: {'Content-Type': 'application/json'},
        data: updated
      }).then(response => {
        const data = response.data;
        console.log(response.status)
        if (response.status === 200) {
          // console.log("[UPDATE]")
          this.shoppingCart = this.shoppingCart.filter(x => x.id !== item.id)
          this.snackbarColor = "red"
          this.snackbarText = "Item removed from cart"
          this.snackbar = true
        } else if (response.status === 204) {
          this.snackbarColor = "blue"
          this.snackbarText = "No change in cart..."
          this.snackbar = true
        }
      }).catch(error => {
        const response = error.response
        if (response.status === 409) {
          // alert(response['data'])
          // this.showInfoToast('Error', 'An error occurred', 'danger')
          this.$store.dispatch("logout")
        }
      })
      this.updateCartCount(this.shoppingCart.length)
    },

    getFinalTotal() {
      let finalTotal = 0;

      this.shoppingCart.forEach(x => {
        finalTotal += x.price * x.quantity
      })
      this.finalTotal = finalTotal
      return finalTotal
    },

    updateCartCount(count) {
      this.$emit("changeCartCount", count)
    },

    async updateUserCart() {
      await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
        const data = response.data
      }).catch(error => {
        this.$store.dispatch("logout")
      })
      console.log(this.shoppingCart)
      this.updatingCart = true
      var updatedProducts = []
      this.shoppingCart.forEach(x => {
        updatedProducts.push({
          prod_id: x.id,
          units: Number(x.quantity)
        })
      })
      const updated = {
        email: this.$store.getters.userData.email,
        products: updatedProducts
      }
      await axios.request({
        method: "PUT",
        url: '/api/cart',
        headers: {'Content-Type': 'application/json'},
        data: updated
      }).then(response => {
        const data = response.data;
        console.log(response.status)
        if (response.status === 200) {
          // console.log("[UPDATE]")
          this.snackbarColor = "green"
          this.snackbarText = "Cart Updated"
          this.snackbar = true
        } else if (response.status === 204) {
          this.snackbarColor = "blue"
          this.snackbarText = "No change in cart..."
          this.snackbar = true
          this.$router.go(0)
        }
      }).catch(error => {
        const response = error.response
        console.log(response)
        this.$store.dispatch("logout")
      })
      this.updateCartCount(this.shoppingCart.length)
      this.updatingCart = false
    },

    async checkUserLoggedIn() {
      await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
        const data = response.data
        return true
      }).catch(error => {
        return false
      })
    },

    async proceedToPay() {
      await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
        const data = response.data

      }).catch(error => {
        this.$store.dispatch("logout")
      })
      this.updatingCart = true
      const txn = {
        amount: this.getFinalTotal()
      }
      await axios.request({
        method: "POST",
        url: '/api/txnRequest',
        headers: {'Content-Type': 'application/json'},
        data: txn
      }).then(response => {
        const data = response.data
        if (response.status === 200) {
          // console.log(data.url)
          window.location.href = data.url
        }
      }).catch(error => {
        router.go(0)
      })
    }


  }
}
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled, .theme--light.v-btn.v-btn--disabled .v-btn__loading, .theme--light.v-btn.v-btn--disabled .v-icon {
  color: rgb(255, 255, 255) !important;
}
</style>

