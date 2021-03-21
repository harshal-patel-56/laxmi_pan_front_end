<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">Order History</p>
      <v-row class="justify-center">
        <v-skeleton-loader
          v-if="loading"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-row>
      <v-row class="justify-center" v-if="orders.length === 0">
        <v-col md="6" sm="12">
          <v-card
            class="mx-auto"
            min-width="400"
            min-height="400"
          >
            <v-card-subtitle class="justify-center text-center">
              NO ORDER HISTORY AVAILABLE.
              <router-link to="/shop"><span>SHOP NOW</span></router-link>
            </v-card-subtitle>


          </v-card>
        </v-col>
      </v-row>

      <v-row class="justify-center" v-if="orders.length > 0" v-for="order in orders" :key="order['_id']">
        <v-col md="6" sm="12">
          <v-card
            :key="order['_id']"
            class="mx-auto"
            min-width="400"
          >
            <v-card-title>
              Order ID
            </v-card-title>

            <router-link :to="'/txns/' + order['_id']" style="padding: 0">
              <v-card-subtitle>
                {{ order['_id'] }}
              </v-card-subtitle>
            </router-link>
            <v-divider/>
            <v-card-text>
              <v-list-item dense>
                <v-list-item-title>
                  Status
                </v-list-item-title>
                <v-list-item-subtitle v-if="order.status === 'SUCCESS'" style="color: green">
                  {{ order.status }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else-if="order.status === 'FAILED'" style="color: red">
                  {{ order.status }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else style="color: orange">
                  {{ order.status }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-divider/>
              <v-list-item dense>
                <v-list-item-title>
                  Date
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ month_names[new Date(order['date']).getMonth()] }} {{ new Date(order['date']).getDate() }},
                  {{ new Date(order['date']).getFullYear() }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-divider/>
              <v-list-item dense>
                <v-list-item-title>
                  Time
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ new Date(order['date']).toLocaleTimeString().replaceAll(":", " : ") }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-divider/>
              <v-list-item dense>
                <v-list-item-title>
                  Amount
                </v-list-item-title>
                <v-list-item-subtitle> ₹ {{
                    '100'
                  }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-divider/>
            </v-card-text>
            <v-card-actions
              @click="order.showCart = !order.showCart"
            >
              <v-btn
                color="orange lighten-2"
                text
              >
                SHOW CART
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                icon
              >
                <v-icon>{{ order.showCart ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="order.showCart">
                <v-divider></v-divider>

                <v-card-text>
                  <v-list-item dense v-for="item in order.cart" :key="item.prod_id">
                    <v-list-item-title>
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle> Quantity : {{ item.units }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle> Total Price : ₹ {{ Number(item.price) * Number(item.units) }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-card-text>
                <v-card-actions>
                  <router-link :to="'/txns/' + order['_id']" style="text-decoration: none">
                    <v-btn
                      color="green lighten-2"
                      text
                    >
                      VIEW TRANSACTION
                    </v-btn>
                  </router-link>
                </v-card-actions>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    products: [],
    orders: [],
    show: false
  }),
  async mounted() {
    this.logged_in = this.$store.getters.authStatus
    this.loading = true
    await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
      const data = response.data
      this.logged_in = true
    }).catch(error => {
      this.$store.dispatch("logout")
    })
    await axios.get(
      '/api/products',
      {withCredentials: true}
    ).then(response => {
      const data = response.data
      // console.log(data)
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
      this.$store.dispatch("logout")
    })
    // console.log(this.products)

    if (this.$store.getters.authStatus === true) {
      // console.log(prod)
      await axios.get("/api/history", {withCredentials: true}).then(response => {
        const data = response.data
        // console.log(data)
        if (data.message === "SUCCESS") {
          var history = data.history
          // console.log(history)
          history.forEach(x => {
            var cart = x.cart
            cart.forEach(prod => {
              var y = this.products.find(z => z.id === prod.prod_id);
              if (y) {
                prod.name = y.name
                prod.price = y.price
              }
            })
            x.showCart = false
          })
          this.orders = history
          // console.log(history)
        }
      }).catch(error => {
        console.log(error.response)
        this.orders = []
        this.$store.dispatch("logout")
      })
      // console.log(this.shoppingCart)
    }
    this.loading = false
  },
  methods: {
    async checkUserLoggedIn() {
      await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
        const data = response.data
        return true
      }).catch(error => {
        return false
      })
    },
    updateCartCount(count) {
      this.$emit("changeCartCount", count)
    },

  }
}
</script>
