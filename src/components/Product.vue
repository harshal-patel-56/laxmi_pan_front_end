<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel hide-delimiters :show-arrows="false">
            <v-carousel-item
              :src="require('../assets/img/home/main_bg.jpg')"
            >
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
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <div class="pl-6">
            <p class="display-1 mb-0">Paan</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">₹ 30.00
                <!--del style="" class="subtitle-1 font-weight-thin">$80.00</del!--></p>
              <v-spacer></v-spacer>
              <v-rating v-model="rating" class="" background-color="warning lighten-3"
                        color="warning" dense></v-rating>
              <span class="body-2	font-weight-thin"> 25 REVIEWS</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              Information will be added soon
            </p>
            <!--            <p class="title">SIZE</p>-->
            <!--            <v-radio-group v-model="row" row>-->
            <!--              <v-radio label="XS" value="XS"></v-radio>-->
            <!--              <v-radio label="S" value="s"></v-radio>-->
            <!--              <v-radio label="M" value="m"></v-radio>-->
            <!--              <v-radio label="L" value="l"></v-radio>-->
            <!--              <v-radio label="XL" value="xl"></v-radio>-->
            <!--            </v-radio-group>-->
            <!--            <p class="title">ITEMS</p>-->

            <!--            <v-text-field-->
            <!--                outlined-->
            <!--                style="width:100px"-->
            <!--                :value="1"-->
            <!--                dense-->
            <!--            ></v-text-field>-->
            <v-btn class="primary white--text" outlined tile dense>
              <v-icon>mdi-cart</v-icon>
              ADD TO CART
            </v-btn>
            <v-btn class="ml-4" outlined tile>ADD TO WISHLIST</v-btn>

          </div>

        </div>
      </div>

    </v-container>

  </div>
</template>
<script>
export default {
  data: () => ({
    rating: 4.5,
    breadcrums: [
      {
        text: 'Home',
        disabled: false,
        href: 'home',
      },
      {
        text: 'Shop',
        disabled: false,
        href: 'shop',
      },
    ],
    item: 5,
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Lorem ipsum dolor?',
        subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
          "\n",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Lorem ipsum dolor',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Lorem ipsum dolor',
        subtitle: ""
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Lorem ipsum dolor',
        subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      },
    ],
  }),
}
</script>
