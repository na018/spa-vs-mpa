<template>
  <v-container fluid pa-0 class=" news-section">
    <v-container fluid pa-0 class="elevation-8"><h1 class="indigo darken-2 title-shadow white--text text-xs-center pa-1 ">⏲ MPA Performance Test 📰️</h1></v-container>
    <v-container fluid v-if="articles.length>0">
      <v-layout row wrap>
        <v-flex md2 class=" max-90">

          <h4>Pages:</h4>
          <v-layout rwo wrap>
            <v-flex v-for="(link, i) in links" :key="i" class="mt-1 xs2" :to="'/'+(i+1)" @click="$router.push('/' + (i+1))">
              <a :href="'/'+(i+1)">
              <v-badge v-show="i!==99" small class="pageLink pa-1"
                       :title="'Go to page ' +(i+1)">{{i+1}}
              </v-badge>
              </a>
            </v-flex>

          </v-layout>


        </v-flex>
        <v-flex md10 lg8 offset-lg1 class="text-xs-center pr-5">
          <v-container class="text-xs-left pa-0">
            <v-btn @click="showItems = !showItems">{{showItems ? 'Hide Items' : 'Show Items'}}</v-btn>
            <transition name="slide-fade">
              <ul v-if="showItems" class="card px-5 py-2 max-80" style="word-wrap: break-word">
                <li v-for="(article,index) in articles" :key="index">{{index}} :
                  <ul>
                    <li v-for="(item,key) in article" :key="key"> [{{key}}] : <span class="text-info">{{item}}</span>
                    </li>
                  </ul>
                </li>
              </ul>

            </transition>
            <v-container fluid class="max-80 pa-0 pr-5 pl-3 mt-2">
              <v-card v-for="(article,index) in articles" :key="index" class="col-12 p-0 my-3 ">
                <v-card-title primary-title class="grey darken-3 white--text p-1 pl-5 elevation-2">
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
  import * as axios from 'axios'

  export default {
    data () {
      return {
        showItems: false,
        imageExists: {},
        links: new Array(100),
        wait: true,
        lastLoad: 0
      }
    },
    methods: {
      loadFunction (index) {
        this.imageExists[index] = true
      },
      errorFunction (index) {
        this.imageExists[index] = false
      }
    },
    async asyncData ({query, error, route}) {
      let pageResArticles = await axios.get(`https://newsapi.org/v2/everything?q=single%20page%20application%20OR%20web&language=en&pageSize=10&page=${route.path.substr(1)}&apiKey=c48c38cca7494d35984f1ff77c28ef9d`) //  c48c38cca7494d35984f1ff77c28ef9d 9729fa4f21514bd9a8661bf8c5fd70e8
      let resultArticles = pageResArticles.data.articles

      return {
        articles: resultArticles,
        route: route.path
      }
    }

  }
</script>
<style>

</style>
