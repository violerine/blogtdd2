<template>
  <div class="home">
    <Navbar/>
    <section class="hero is-info is-medium is-bold">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">With the new day comes new strength and new thoughts. <br>Write and publish about your days here!</h1>
            </div>
        </div>
    </section>

    

    <!--MODAL END-->

  <div class="container">
    <section class="articles">
      <div class = "column is-12 ">
     
    <Article v-for="(article,index) in articles" :key='index' :article="article"></Article>
    <!-- {{articles}} -->

  
      </div>
     
    </section>
  </div>
  </div>

  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Article from '@/components/Article.vue'
import { mapActions, mapState} from 'vuex'

export default {
  name: 'home',
  created:function(){
      this.getAllArticles()
  },
  components: {
    HelloWorld,
    Navbar,
    Article
  },
  computed:{
    ...mapState([
        'articles'
    ])
  },
  methods:{
      ...mapActions([
          'getAllArticles'
      ])
  }
}
</script>

<style scoped>
    .hero-body
    {background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Plum_trees_Kitano_Tenmangu.jpg/1200px-Plum_trees_Kitano_Tenmangu.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 500px;

    }

.articles {
  margin: 5rem 0;
  margin-top: -200px;
}
.articles .content p {
    line-height: 1.9;
    margin: 15px 0;
}

/* .quotes{
  position: fixed;
  margin-top: 30px;
} */

</style>
