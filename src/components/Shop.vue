<template>
  <div>
    <v-container>
      <div class="row">
        <v-dialog
          v-if="!logged_in"
          v-model="loginRequiredDialog"
          persistent
          max-width="400px"
        >
          <v-card>
            <v-card-title class="text-center justify-center">
              <v-row>
                <v-col cols="12">
                  <v-icon color="primary" size="30">mdi-lock</v-icon>
                </v-col>
                <v-col cols="12">
                  <span class="headline">Login Required</span>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              Please login to continue further.
            </v-card-text>
            <v-card-actions class="justify-content-center text-center">
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                outlined
                @click="loginRequiredDialog = false"
              >
                OKAY
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div
          class="col-md-12 col-sm-12 col-xs-12"
        >

          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Variety of {{ products.length }} products</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="select"
                :items="options"
                style="margin-bottom: -20px;"
                outlined
                @change="sortProducts(select)"
                dense></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <div class="row text-center" v-if="products.length === 0">
            <div class="col-12 my-10" style="height: 300px">NO PRODUCTS AVAILABLE</div>
          </div>
          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" :key="pro.id" v-for="pro in products">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16/9"
                    height="200px"
                    :src="pro.src"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn v-if="hover" @click="addProductToCart(pro.id)" class="" outlined>ADD TO CART</v-btn>
                      </div>

                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div><a href="/product/1" style="text-decoration: none">{{ pro.name }}</a></div>
                    <div>₹ {{ pro.price }}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div class="row" style="font-family: 'Courier New'">

            <v-snackbar
              v-model="snackbar"
            >
              {{ snackbarText }}

                <v-btn
                  color="red"
                  text
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
            </v-snackbar>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}
</style>
<script>
import axios from "axios";

export default {
  data: () => ({
    range: [0, 10000],
    logged_in: false,
    loginRequiredDialog: false,
    totalProductsCount: 25,
    select: 'Popularity',
    options: [
      'Default',
      'Popularity',
      'Price: Low to High',
      'Price: High to Low',
    ],
    page: 1,
    snackbar: false,
    snackbarText: "",
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
    min: 0,
    max: 10000,
    items: [
      {
        id: 2,
        name: 'Shoes',
        children: [
          {id: 2, name: 'Casuals'},
          {id: 3, name: 'Formals'},
          {id: 4, name: 'Sneakers'},
        ],
      },
      {
        id: 1,
        name: 'Clothing',
        children: [
          {id: 5, name: 'Shirts'},
          {id: 6, name: 'Tops'},
          {id: 7, name: 'Tunics'},
          {id: 8, name: 'Bodysuit'},
        ],
      }
    ],
    shoppingCart: [],
    products: []
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
            popularity: x.popularity,
            src: require('../assets/img/shop/1.jpg')
          })
        })
        this.sortProducts("Price: Low to High")
        // this.products = []
      } else {
        // this.products = []
      }
    }).catch(error => {
      this.products = []
    })

    if (this.$store.getters.authStatus === true) {
      // console.log(prod)
      await axios.get("/api/cart", {withCredentials: true}).then(response => {
        const data = response.data
        // console.log(data)
        if (data.message === "SUCCESS") {
          const cart = data.cart.products
          // console.log(data)
          cart.forEach(x => {
            const y = this.products.find(z => z.id === x.prod_id);
            if (y) {
              this.shoppingCart.push(y)
            }
          })
          this.updateCartCount(this.shoppingCart.length)
          console.log(this.shoppingCart)
        }
      }).catch(error => {
        console.log(error.response)
        this.snackbar = true
        this.snackbarText = "You have been logged out. Login again!"
        this.$emit("changeUserLoginStatus", false)
      })
      // console.log(this.shoppingCart)
    }

  },

  async created() {

  },

  methods: {
    async addProductToCart(productId) {
      if (this.$store.getters.authStatus === true) {
        const prod = this.products.find(prod => prod.id === productId)
        // console.log(prod)
        if (prod) {
          if (this.shoppingCart.find(x => x.id === productId) == null) {
            const cartObj = {
              email: this.$store.getters.userData.email,
              product: {
                prod_id: prod.id,
                units: 1.00
              }
            }
            await axios.post("/api/cart", cartObj, {withCredentials: true}).then(response => {
              const data = response.data
              console.log(data)
              this.shoppingCart.push(prod);
              this.updateCartCount(this.shoppingCart.length)
            }).catch(error => {
              console.log(error.response)
            })
            // console.log(this.shoppingCart)
          } else {
            this.snackbar = true
            this.snackbarText = "Product is already in the cart!!!"
            console.log("PRODUCT ALREADY IN SHOPPING CART!")
          }
        }
      } else {
        this.loginRequiredDialog = true
      }

    },
    sortProducts(select) {
      if (select === "Popularity") {
        this.products.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1)
      }
      if (select === "Price: Low to High") {
        this.products.sort((a, b) => (a.price > b.price) ? 1 : -1)
      }
      if (select === "Price: High to Low") {
        this.products.sort((a, b) => (a.price > b.price) ? -1 : 1)
      }
    },
    logoutUser(status) {
      this.$emit("changeUserLoginStatus", status)
    },
    updateCartCount(count) {
      this.$emit("changeCartCount", count)
    },
    getProdById(prodId) {
      this.products.forEach(x => {
        if (x.id === prodId) return x
      })
    }
  }
}
</script>
