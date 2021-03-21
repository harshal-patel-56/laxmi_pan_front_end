<template>
  <div>
    <v-carousel hide-delimiters :show-arrows="false">
      <v-carousel-item
        :src="require('../assets/img/home/main_bg.jpg')"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only paper">
            <v-sheet
              color="rgb(0, 172, 193, 0.7)"
              elevation="1"
              class="px-4 py-2"
            >
              <strong class="px-4 py-2">LAXMI PAN</strong>
            </v-sheet>
          </div>
          <br/>
        </v-row>
      </v-carousel-item>

    </v-carousel>
    <div class="pl-4 pr-4 row">
      <div
        class="col-12"
      >
        <v-card class="mx-0">
          <v-container fluid>
            <v-row no-gutters>
              <!--              <v-col sm="12" md="8" style="font-family: 'Courier New'">-->
              <v-col sm="12" md="8" style="font-family: 'Courier New'">
                <v-card-title style="font-size: 2rem; word-break: break-word"><strong>Laxmi Pan & Mukhvas</strong>
                </v-card-title>
                <!--                <v-card-text style="font-weight: 500; font-size: 1rem">-->
                <v-card-text style="font-size: 1.15rem">
                  <p>Situated near the ISKCON Mandir Vallabh Vidyanagar, Delivering the Best Quality PAN and Mukhvas
                    for more than 13 Years!!</p>

                  <p>One difference between india and rest of the world and pop come the reply… <strong>Paan</strong>.
                  </p>

                  <p class="hidden-sm-and-down">Much as we hate to see paan stains in public places, chewing paan after
                    dinner is one indulgence
                    exclusive to the country. While Muchchand Paan is the most popular personality in the paan making
                    fraternity, Vidyanagar has a number of families serving the sweet tooth of people on the lookout
                    for an after mint post meal time. Paan Chewing is a habit developed in the vedic ages. The sages
                    would give therapeutic medicines to regulate digestion and bowel movement by wrapping the medicine
                    herbs in a betel leaf. Slowly, people found Supari and catechus (Kattha), herbs that provided
                    relief from cough, sore throat and mouth ulcers, to be good after meal accompaniment. Paan became
                    a piece de resistance at the Nawabi courts where paan lovers would order for gold and silver cases
                    to hold paan…</p>

                </v-card-text>
              </v-col>
              <v-col sm="12" md="4">
                <v-img
                  :src="require('../assets/img/home/shop_image.jpg')"
                  class="white--text align-center"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="auto"
                >
                  <h1 class="text-center font-size"></h1>
                </v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </div>
    <div class="pl-4 pr-4 row">
      <div
        class="col-12 text-center"
      >
        <div style="font-family: 'Courier New'; font-size: 3rem">
          Our Specials
        </div>
      </div>
    </div>
    <div class="pl-4 pr-4 row">
      <div
        class="col-md-6 col-sm-6 col-xs-12"
      >
        <v-card>

          <v-img
            :src="require('../assets/img/home/specials_1.png')"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">Chocolate Pan</h1>
            <div class="text-center">
              <v-btn to="/shop" class="white--text " outlined>SHOP NOW</v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
      <div
        class="col-md-6 col-sm-6 col-xs-12"
      >
        <v-card>
          <v-img
            :src="require('../assets/img/home/specials_2.png')"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">Ice-cream Pan</h1>
            <div class="text-center">
              <v-btn href="/shop" class="white--text" outlined>SHOP NOW</v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
<!--    <div class="pl-4 pr-4 row">-->
<!--      <div-->
<!--        class="col-md-4 col-sm-4 col-xs-12"-->
<!--      >-->
<!--        <v-card outlined>-->
<!--          <v-img-->
<!--            :src="require('../assets/img/home/deal2.jpg')"-->
<!--            class="white&#45;&#45;text align-center"-->
<!--            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"-->
<!--            height="300px"-->
<!--          >-->
<!--            <h1 class="text-center font-size">Lorem & Ipsum</h1>-->
<!--            <div class="text-center mt-2">-->
<!--              <v-btn class="white&#45;&#45;text caption" href="/shop" text>SHOP NOW-->
<!--                <v-icon class="white&#45;&#45;text caption">mdi-arrow-right</v-icon>-->
<!--              </v-btn>-->
<!--            </div>-->
<!--          </v-img>-->
<!--        </v-card>-->
<!--      </div>-->
<!--      <div-->
<!--        class="col-md-4 col-sm-4 col-xs-12"-->
<!--      >-->
<!--        <v-card outlined>-->
<!--          <v-img-->
<!--            :src="require('../assets/img/home/deal3.jpg')"-->
<!--            class="white&#45;&#45;text align-center"-->
<!--            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"-->
<!--            height="300px"-->
<!--          >-->
<!--            <h1 class="text-center font-size">Lorem & Ipsum</h1>-->
<!--            <div class="text-center mt-2">-->
<!--              <v-btn class="white&#45;&#45;text caption" href="/shop" text>SHOP NOW-->
<!--                <v-icon class="white&#45;&#45;text caption">mdi-arrow-right</v-icon>-->
<!--              </v-btn>-->
<!--            </div>-->
<!--          </v-img>-->
<!--        </v-card>-->
<!--      </div>-->
<!--      <div-->
<!--        class="col-md-4 col-sm-4 col-xs-12"-->
<!--      >-->
<!--        <v-card outlined>-->
<!--          <v-img-->
<!--            :src="require('../assets/img/home/deal4.jpg')"-->
<!--            class="white&#45;&#45;text align-center"-->
<!--            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"-->
<!--            height="300px"-->
<!--          >-->
<!--            <h1 class="text-center font-size">Lorem & Ipsum</h1>-->
<!--            <div class="text-center mt-2">-->
<!--              <v-btn class="white&#45;&#45;text caption" href="/shop" text>SHOP NOW-->
<!--                <v-icon class="white&#45;&#45;text caption">mdi-arrow-right</v-icon>-->
<!--              </v-btn>-->
<!--            </div>-->
<!--          </v-img>-->
<!--        </v-card>-->
<!--      </div>-->
<!--    </div>-->
<!--    <v-container>-->
<!--      <v-row no-gutters>-->
<!--        <v-col :cols="12">-->
<!--          <v-card-text-->
<!--            class=""-->
<!--            tile-->
<!--            outlined-->
<!--          >-->
<!--            <v-card-title class="subheading ">Deals of the Day</v-card-title>-->
<!--            <v-divider></v-divider>-->
<!--            <div class="row">-->
<!--              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center">-->
<!--                <v-hover-->
<!--                  v-slot:default="{ hover }"-->
<!--                  open-delay="200"-->
<!--                >-->
<!--                  <v-card-->
<!--                    :elevation="hover ? 16 : 2"-->
<!--                  >-->
<!--                    <v-img-->
<!--                      class="white&#45;&#45;text align-end"-->
<!--                      height="200px"-->
<!--                      :src="require('../assets/img/home/main_bg.jpg')"-->
<!--                    >-->
<!--                      <v-card-title>Bags & Purses</v-card-title>-->
<!--                    </v-img>-->

<!--                    <v-card-text class="text&#45;&#45;primary text-center">-->
<!--                      <div>Upto 60% + Extra 10%</div>-->
<!--                      <div>Baggit, Zara, Fossil</div>-->
<!--                    </v-card-text>-->

<!--                    <div class="text-center">-->
<!--                      <v-btn-->
<!--                        href="/shop"-->
<!--                        class="ma-2"-->
<!--                        outlined-->
<!--                        color="info"-->
<!--                      >-->
<!--                        Explore-->
<!--                      </v-btn>-->
<!--                    </div>-->
<!--                  </v-card>-->
<!--                </v-hover>-->
<!--              </div>-->
<!--              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center">-->
<!--                <v-hover-->
<!--                  v-slot:default="{ hover }"-->
<!--                  open-delay="200"-->
<!--                >-->
<!--                  <v-card-->
<!--                    :elevation="hover ? 16 : 2"-->
<!--                  >-->
<!--                    <v-img-->
<!--                      class="white&#45;&#45;text align-end"-->
<!--                      height="200px"-->
<!--                      :src="require('../assets/img/home/deal2.jpg')"-->
<!--                    >-->
<!--                      <v-card-title>T-Shirt</v-card-title>-->
<!--                    </v-img>-->

<!--                    <v-card-text class="text&#45;&#45;primary text-center">-->
<!--                      <div>Upto 50%</div>-->
<!--                      <div>Zara, Selected, Celio</div>-->
<!--                    </v-card-text>-->

<!--                    <div class="text-center">-->
<!--                      <v-btn href="/shop"-->
<!--                             class="ma-2"-->
<!--                             outlined-->
<!--                             color="info"-->
<!--                      >-->
<!--                        Explore-->
<!--                      </v-btn>-->
<!--                    </div>-->
<!--                  </v-card>-->
<!--                </v-hover>-->
<!--              </div>-->
<!--              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center">-->
<!--                <v-hover-->
<!--                  v-slot:default="{ hover }"-->
<!--                  open-delay="200"-->
<!--                >-->
<!--                  <v-card-->
<!--                    :elevation="hover ? 16 : 2"-->
<!--                  >-->
<!--                    <v-img-->
<!--                      class="white&#45;&#45;text align-end"-->
<!--                      height="200px"-->
<!--                      :src="require('../assets/img/home/deal3.jpg')"-->
<!--                    >-->
<!--                      <v-card-title>Jeans</v-card-title>-->
<!--                    </v-img>-->

<!--                    <v-card-text class="text&#45;&#45;primary text-center">-->
<!--                      <div>Upto 60% + Extra 10%</div>-->
<!--                      <div>Jack & Jones, Levis</div>-->
<!--                    </v-card-text>-->

<!--                    <div class="text-center">-->
<!--                      <v-btn href="/shop"-->
<!--                             class="ma-2"-->
<!--                             outlined-->
<!--                             color="info"-->
<!--                      >-->
<!--                        Explore-->
<!--                      </v-btn>-->
<!--                    </div>-->
<!--                  </v-card>-->
<!--                </v-hover>-->
<!--              </div>-->
<!--              <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center">-->
<!--                <v-hover-->
<!--                  v-slot:default="{ hover }"-->
<!--                  open-delay="200"-->
<!--                >-->
<!--                  <v-card-->
<!--                    :elevation="hover ? 16 : 2"-->
<!--                  >-->
<!--                    <v-img-->
<!--                      class="white&#45;&#45;text align-end"-->
<!--                      height="200px"-->
<!--                      :src="require('../assets/img/home/deal4.jpg')"-->
<!--                    >-->
<!--                      <v-card-title>Shoes</v-card-title>-->
<!--                    </v-img>-->

<!--                    <v-card-text class="text&#45;&#45;primary text-center">-->
<!--                      <div>Upto 60% + Extra 10%</div>-->
<!--                      <div>Nike, Adidas, Puma</div>-->
<!--                    </v-card-text>-->

<!--                    <div class="text-center">-->
<!--                      <v-btn href="/shop"-->
<!--                             class="ma-2"-->
<!--                             outlined-->
<!--                             color="info"-->
<!--                      >-->
<!--                        Explore-->
<!--                      </v-btn>-->
<!--                    </div>-->
<!--                  </v-card>-->
<!--                </v-hover>-->
<!--              </div>-->
<!--            </div>-->
<!--          </v-card-text>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-container>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {title: 'Click Me'},
        {title: 'Click Me'},
        {title: 'Click Me'},
        {title: 'Click Me 2'},
      ],
      activeBtn: 1,
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>

