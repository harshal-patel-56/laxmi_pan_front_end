<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">Transaction Status</p>
      <v-skeleton-loader
        v-if="loading"
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
      <p class="overline text-center" v-if="!invaidTxnId">By <b>{{ this.$store.getters.userData.name }}</b> |
        {{ month_names[new Date(txnInfo.txn_date).getMonth()] }} {{ new Date(txnInfo.txn_date).getDate() }},
        {{ new Date(txnInfo.txn_date).getFullYear() }}</p>
      <div class="row" v-if="invaidTxnId">
        <v-col md="12" sm="12" style="min-height: 200px" class="text-center">
          INVALID TRANSACTION ID : {{ txn_id }}
        </v-col>
      </div>
      <div class="row" v-if="!invaidTxnId">
        <v-col md="12" sm="12">
          <v-card
            class="mx-auto"
            max-width="700"
          >
            <v-list-item v-if="txnInfo.verified.toUpperCase() === 'SUCCESS'" two-line
                         style="background-color: rgba(56,255,56,0.6)">
              <v-list-item-content>
                <v-list-item-title class="headline">
                  Transaction ID
                </v-list-item-title>
                <v-list-item-subtitle v-model="txnInfo.txn_id"> &nbsp;{{ txnInfo.txn_id }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-else-if="txnInfo.verified.toUpperCase() === 'FAILED'" two-line
                         style="background-color: rgb(255,119,119)">
              <v-list-item-content>
                <v-list-item-title style="color: white" class="headline">
                  Transaction ID
                </v-list-item-title>
                <v-list-item-subtitle style="color: white" v-model="txnInfo.txn_id"> &nbsp;{{
                    txnInfo.txn_id
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-else two-line style="background-color: rgb(255,210,119)">
              <v-list-item-content>
                <v-list-item-title style="color: white" class="headline">
                  Transaction ID
                </v-list-item-title>
                <v-list-item-subtitle style="color: white" v-model="txnInfo.txn_id"> &nbsp;{{
                    txnInfo.txn_id
                  }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <v-row align="center">
                <v-col
                  class="display-1"
                  v-model="txnInfo.amount"
                >
                  ₹ {{ txnInfo.amount }}
                  <v-icon
                    class="mb-1"
                    size="25"
                    v-if="txnInfo.verified.toUpperCase() === 'SUCCESS'"
                    color="green"
                  >mdi-check-decagram
                  </v-icon>
                  <v-icon
                    class="mb-1"
                    size="25"
                    v-else-if="txnInfo.verified.toUpperCase() === 'FAILED'"
                    color="red"
                  >mdi-alert-decagram
                  </v-icon>
                  <v-icon
                    class="mb-1"
                    size="25"
                    v-else
                    color="orange"
                  >mdi-clock-alert
                  </v-icon>
                </v-col>
              </v-row>
            </v-card-text>

            <v-list-item>
              <v-list-item-title>
                Status
              </v-list-item-title>
              <v-list-item-subtitle>{{ txnInfo.verified }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider/>

            <v-list-item>
              <v-list-item-title>
                Bank ID
              </v-list-item-title>
              <v-list-item-subtitle>{{
                  txnInfo.bank_id !== '' ? txnInfo.bank_id.length : 'NOT AVAILABLE'
                }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-divider/>

            <v-list-item>
              <v-list-item-title>
                Card Number
              </v-list-item-title>
              <v-list-item-subtitle>{{
                  txnInfo.card_number !== '' ? txnInfo.card_number : 'NOT AVAILABLE'
                }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-divider/>

            <v-list-item>
              <v-list-item-title>
                Bank Name
              </v-list-item-title>
              <v-list-item-subtitle>{{ txnInfo.bank_name ? txnInfo.bank_name : 'NOT AVAILABLE' }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider/>

            <v-list-item>
              <v-list-item-title>
                ATOM Transaction ID
              </v-list-item-title>
              <v-list-item-subtitle>{{ txnInfo.atom_txn_id.toString().toUpperCase() }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider/>

            <v-list-item>
              <v-list-item-title>
                Transaction Date
              </v-list-item-title>
              <v-list-item-subtitle>{{ txnInfo.txn_date }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider/>
          </v-card>
        </v-col>
      </div>


    </v-container>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    txn_id: null,
    txnInfo: null,
    invaidTxnId: false,
    loading: true,
    rating: 4.5,
    item: 5,
    month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Lorem ipsum dolor?',
        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
          "\n",
      },
    ],
  }),
  async mounted() {
    this.txn_id = this.$route.params.txn_id
    this.loading = true
    await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
      const data = response.data
      this.logged_in = true
    }).catch(error => {
      this.$store.dispatch("logout")
    })
    await axios.get('/api/txnStatus', {
      params: {
        txnId: this.txn_id
      }
    }).then(response => {
      const data = response.data
      if (response.status === 200) {
        console.log(data)
        this.txnInfo = data.status
      }
    }).catch(error => {
      this.invaidTxnId = true
      if (error.response.status === 403) {
        this.$store.dispatch("logout")
      }
    })
    this.loading = false
  },
  methods: {
    async checkUserLoggedIn() {
      await axios.get('/api/checkLogin', {withCredentials: true}).then(response => {
        const data = response.data
        if (response.status === 200) {
          return true
        }
      }).catch(error => {
        return false
      })
    },
  }
}
</script>

<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: rgba(0, 0, 0, 1) !important;
}

.theme--light.v-list-item .v-list-item__action-text, .theme--light.v-list-item .v-list-item__subtitle {
  color: rgba(0, 0, 0, 0.85);
}
</style>
