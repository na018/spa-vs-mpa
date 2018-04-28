<template>
  <v-container fluid pa-0 class=" news-section">
    <v-container fluid pa-0 class="elevation-8"><h1 class="grey darken-3 title-shadow white--text text-xs-center pa-1 ">⏲ SPA Performance Test 📰️</h1></v-container>
    <v-container fluid v-if="articles.length>0"  :class="!isMobile ? '' : 'pa-0'">
      <v-layout row wrap :class="!isMobile ? 'px-3' : ''">
        <v-flex md2 class=" max-90" :class="isMobile ? 'px-3' : ''">

          <h4>Pages:</h4>
          <v-layout rwo wrap>
            <v-flex v-if="currentRoute" v-for="(link, i) in links" :key="i" class="mt-1 xs2" @click="getArticles(i+1)">
              <v-badge v-show="i!==99" small class="pageLink pa-1" :class="currentRoute === i+1 ? 'grey darken-2 white--text elevation-3' : ''"
                       :title="'Go to page ' +(i+1)">{{i+1}}
              </v-badge>
            </v-flex>

          </v-layout>


        </v-flex>
        <v-flex md10 lg8 offset-lg1 class="text-xs-center" :class="!isMobile ? 'pr-5' : ''">
          <v-progress-circular v-if="wait" indeterminate color="primary"></v-progress-circular>
          <v-container class="text-xs-left pa-0" :style="{'width': isMobile ? screenWidth + 'px' : ''}">
            <v-btn @click="showItems = !showItems">{{showItems ? 'Hide Items' : 'Show Items'}}</v-btn>
            <transition name="slide-fade">
              <ul v-if="showItems" class="card px-5 py-2 max-80" :class="!isMobile ? '' : 'px-2'" style="word-wrap: break-word">
                <li v-for="(article,index) in articles" :key="index">{{index}} :
                  <ul>
                    <li v-for="(item,key) in article" :key="key"> [{{key}}] : <span class="text-info">{{item}}</span>
                    </li>
                  </ul>
                </li>
              </ul>

            </transition>
            <v-container fluid class="max-80 pa-0   mt-2" :class="!isMobile ? 'pr-5 pl-3' : ''">
              <v-card v-for="(article,index) in articles" :key="index" class="col-12 p-0 my-3 px-1">
                <v-card-title primary-title class="grey darken-3 white--text elevation-2" :class="!isMobile ? 'pl-5 p-1 ' : 'isMobile'" >
                  <h3 >{{article.title}}</h3>
                </v-card-title>
                <v-card-media v-if="article.urlToImage" :src="article.urlToImage" @error="article.urlToImage = '/static/img/notfound.jpg'"
                              @load="loadFunction(index)" :alt="article.title" height="200px" contain class="blue-grey media-shadow">
                </v-card-media>
                <v-card-text>
                  {{article.description}}
                </v-card-text>
                <v-card-actions>
                  <v-btn flat color="indigo" :href="article.url" target="_blank" :title="article.url">Read More</v-btn>
                </v-card-actions>

              </v-card>
            </v-container>

          </v-container>

        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  import * as axios from "axios"

  function getTimeStamp() {
    return new Date().toISOString().substring(0, 10);
  }

  export default {
    data() {
      return {
        showItems: false,
        imageExists: {},
        links: new Array(100),
        articles: [],
        wait: true,
        lastLoad: 0,
        currentRoute: false,
        isMobile: false,
        screenWidth:2000
      }
    },

    methods: {
      loadFunction(index) {

      },
      errorFunction(index) {
        this.imageExists[index] = false
      },
      async getArticles(page) {
        //this.$router.history.updateRoute({ path: '/'+page })
        this.currentRoute = page
        this.$router.push({params: {id: page}})
        this.lastLoad = 0
        let timeInterval = setInterval(() => {
          this.lastLoad += .1
        }, 100)
        this.wait = true;
        let pageResArticles = await axios.get(`https://newsapi.org/v2/everything?q=single%20page%20application%20OR%20web&language=en&pageSize=10&page=${page}&apiKey=c48c38cca7494d35984f1ff77c28ef9d`) //  c48c38cca7494d35984f1ff77c28ef9d

        this.articles = pageResArticles.data.articles
        this.wait = false
        setTimeout(() => {
          clearInterval(timeInterval)
        }, 900)

      },
    },
    created() {
      this.wait = true

      this.screenWidth= document.body.offsetWidth
      if(this.screenWidth<700) this.isMobile = true
      let page = this.$route.params.id || 1
     this.currentRoute = page
      this.getArticles(page)
    },

  }
</script>
<style>
  .pageLink:hover {
    background: rgb(120, 125, 255);
    color: white;
    border-radius: 5px;
    box-shadow: 0 2px 3px black;
    transition: .1s;
    cursor: pointer;
  }

  .pageLink {
    cursor: pointer;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(-25px);
    opacity: 0;
  }

  .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(25px);
    opacity: 0;
  }
  .media-shadow {
    box-shadow: inset 0 0 13px #40454e;
  }
  .title-shadow{
    box-shadow: inset 0 0 100px #000000c4;
  }
</style>
