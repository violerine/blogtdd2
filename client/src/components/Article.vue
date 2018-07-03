<template>
           <!-- START ARTICLE -->
                <div class="card article">
                    <div class="card-content">
                        <div class="media">
                             <!-- <div class="media-center">
                                <img src="http://www.radfaces.com/images/avatars/daria-morgendorffer.jpg" class="author-image" alt="Placeholder image">
                            </div>
                             -->
                            <div class="media-content has-text-centered">
                                <p class="title article-title">{{article.title}} 🔱</p>
                                <p class="subtitle is-6 article-subtitle">
                                    <a href="#">@{{article.userId
                                        .username}}</a> {{article.createdAt}}
                                </p>
                            </div>
                        </div>
                        <div class="content article-body">
                            <div class="image is-2by1">
                             <img v-bind:src=article.pic_url class="author-image" alt="Placeholder image">
                             </div><br><br>
                            <p>
                                {{article.content}}<br><br>
                                Mulai dari sini dummy, biar keliatan cakep aja gitu<br>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan lacus vel facilisis volutpat est velit egestas. Sapien eget mi proin sed. Sit amet mattis vulputate enim.
                            </p>
                            <p>
                                Commodo ullamcorper a lacus vestibulum sed arcu. Fermentum leo vel orci porta non. Proin fermentum leo vel orci porta non pulvinar. Imperdiet proin fermentum leo vel. Tortor posuere ac ut consequat semper viverra. Vestibulum lectus mauris ultrices eros.
                            </p>
                            <h3 class="has-text-centered">Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Cras tincidunt lobortis feugiat vivamus.</h3>
                            <p>
                                In eu mi bibendum neque egestas congue quisque egestas diam. Enim nec dui nunc mattis enim ut tellus. Ut morbi tincidunt augue interdum velit euismod in. At in tellus integer feugiat scelerisque varius morbi enim nunc. Vitae suscipit tellus mauris a diam.
                                Arcu non sodales neque sodales ut etiam sit amet.
                            </p>
                        </div>
                    </div>
                </div>

</template>

<script>
export default {
    props:['article'],
    data:function(){
        return{
            
        }
    }
}
</script>

<style scoped>

.media-center {
  display: block;
  margin-bottom: 1rem;
}
.media-content {
  margin-top: 2rem;
}

/* .article-title {
  font-size: 2rem;
  font-weight: lighter;
  line-height: 2;
} */


.article-subtitle {
  color: #909AA0;
  margin-bottom: 3rem;
}
.article-body {
text-align: justify;
margin-bottom: 2rem;
}

</style>
