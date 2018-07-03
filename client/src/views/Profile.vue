<template>
    <div class="profile">

<Navbar/>

<div class="columns" id="mail-app">
        <aside class="column is-2 aside hero is-fullheight">
            <div>
                <div class="compose has-text-centered">
                    <a @click="activateModal" class="button is-danger is-block is-bold">
                        <span class="compose">Compose</span>
                    </a><br>
                    <p>Hello,{{currentuser}}</p>
                </div>
            </div>
        </aside>
        <div class="column is-4 messages hero is-fullheight" id="message-feed">
            <div class="action-buttons">
                <div class="control is-grouped pg">
                    <div class="title">1-{{ totalPage }} of {{ totalArticleByUser }}</div>
                    <!-- <button @click="countArticles" class="btn">Test</button> -->
                    <a @click="paginateArticle('left')"  class="button is-link"><i class="fa fa-chevron-left"></i></a>
                    <a @click="paginateArticle('right')" class="button is-link"><i class="fa fa-chevron-right"></i></a>
                </div>
            </div>

            <div class="inbox-messages" id="inbox-messages">
              <div v-if="articlesByUser.length===0" class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    You don't have any articles written. Start writing one! :D
                  </p>
                </header>
              </div>
                <div v-for="(article, index) in articlesByUser" class="card" v-bind:key="index" v-on:click="showArticle(article,index)" v-bind:data-preview-id="index">
                    <div class="card-content">
                        <div class="article-header">
                            <span class="article-from"><small>Title: {{ article.title }}</small></span>
                            <span class="article-timestamp"></span>
                            <span  class="article-attachment"><a @click="deleteArticle" class="fa fa-trash"></a></span>
                        </div>
                        <div class="article-subject">
                            <span class="article-subject"><strong id="fake-subject-1"></strong></span>
                        </div>
                        <div class="article-snippet">
                            <p id="fake-snippet-1">{{article.content}}</p>
                        </div>
                         
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-6 message hero is-fullheight">
          <p>Preview of your Full article</p>
        <div class="is-hidden" id="message-panel">
          
            <div class="box message-preview">
                <div class="top">
                    <div class="address">
                        <div class="name">John Smith</div>
                    </div>
                    <hr>
                    <div class="content">
                      <p>{{content}}</p>
                      <img v-bind:src=this.picture alt="IMAGE">
                      <a @click="deleteArticle()" class="button"><i class="fa fa-trash"> Delete Article</i></a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>



<!---MODAL-->

<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <div class="control">
          Title : 
          <input v-model="title" class="input is-info" type="text" placeholder="Title">
        </div>
      </div>
      <div class="field">
        <div class="control">
          Content : 
          <textarea v-model="content" class="textarea" placeholder="e.g. Hello world"></textarea>
        </div>
      </div>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input  @change="previewFile"  class="file-input" type="file" name="resume">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {{this.filename}}
          </span>
        </label>
      </div>
      <p>{{pleasewait}}</p>
    </section>
    <footer class="modal-card-foot">
      <button @click="addNewArticle" class="button is-success">Create Article</button>
      <button @click="closeModal" class="button">Cancel</button>
    </footer>
  </div>
</div>

<!--MODAL END-->

    </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import { mapState,mapActions } from 'vuex';
     
export default {
    created:function(){
      this.getArticlesByUser(this.page)
      console.log('ini yang di created', this.totalArticleByUser);
    },
    components:{
        Navbar
    },  
    data: function(){
        return {
            title:'',
            filename:'',
            content:'',
            formdata : new FormData(),
            pleasewait:'',
            picture:'',
            articleid:'',
            page:1,
            currentuser:localStorage.getItem('name'),
            paginate: {
                pointer: {
                    start: 1,
                    end: 5
                },
            },
        }
    },
    computed:{
      ...mapState([
        'articlesByUser',
        'totalArticleByUser',
        'totalPage'
      ])
    },
    methods:{
      ...mapActions([
        'getArticlesByUser',
      ]),
        paginateArticle(direction){
          if(direction=="right"){
            if(this.page===this.totalPage){
              this.page=this.totalPage
            }else if(this.page<this.totalPage){
              this.page+=1
              this.$store.dispatch('getArticlesByUser',this.page)
            }
          }
          else if(direction=="left"){
            if(this.page===1){
              this.page=1
            }else{  
              this.page-=1
              this.$store.dispatch('getArticlesByUser',this.page)
            }
          }
        },
        previewFile(file){
          var filedata = file.target.files[0]
          this.filename = filedata.name
          this.formdata.append('image',filedata)
        },
        addNewArticle(){
          console.log(this.formdata)
          let self=this
          if (this.formdata) {
            self.formdata.set('userid',localStorage.getItem('userid'))
            self.formdata.set('title',self.title)
            self.formdata.set('content',self.content)
          } else {
            self.formdata.append('userid',localStorage.getItem('userid'))
            self.formdata.append('title',self.title)
            self.formdata.append('content',self.content)
          }
          
          self.pleasewait='Please wait...'
          axios.post("http://localhost:8000/articles/add",self.formdata)
          .then(article=>{
            console.log("DAPET GA",article);
            self.pleasewait=''
            self.title=''
            self.content=''
            self.formdata.delete('title')
            self.formdata.delete('content')
            self.formdata.delete('image')
            self.filename=''
            console.log("FORM DATANYA KEDELETE ga",this.formdata.entries())
            for (var pair of this.formdata.entries()) {
                console.log("MUNCUL Ga",pair[0]+ ', ' + pair[1]); 
            }
            swal('New Article Created')
            self.closeModal()
            self.getArticlesByUser()
          })
          .catch(err=>{
            console.log(err);
          })
        },
        activateModal(){
          $(".modal").addClass("is-active")
        },
        closeModal(){
          $(".modal").removeClass("is-active")
        },

        showArticle: function(article, index) {
          $('#message-panel').removeClass('is-hidden');
          $('.card').removeClass('active');
          $('#article-card-' + index).addClass('active');
          $('.message .address .name').text(article.title);
          this.picture=article.pic_url
          this.content=article.content
          this.articleid=article._id
      },
      deleteArticle(article){
        
        console.log("this.articleid", this.articleid)
        var articleidnya = this.articleid

        function deleteOne(articleidnya){
            axios.delete(`http://localhost:8000/articles/delete/${articleidnya}`)
              .then(article=>{
                console.log("KEDELETE GA",article)
              })
              .catch(err=>{
                console.log(err)
              })
          }
        var self=this
         swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this Article!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                $('#message-panel').addClass('is-hidden');
                deleteOne(this.articleid)
                window.location.reload()
                // swal("Article Deleted", {
                //   icon: "success",
                // });
            } else {
              
            }
          });

          
          
      },
    }
}
</script>

<style scoped>

html,body {
  font-family: 'Open Sans', serif;
  font-size: 14px;
  line-height: 1.5;
  height: 100%;
  background-color: #fff;
}
.nav.is-dark {
  background-color: #232B2D;
  color: #F6F7F7;
}
.nav.is-dark .nav-item a, .nav.is-dark a.nav-item {
    color: #F6F7F7;
}
.nav.is-dark .nav-item a.button.is-default {
    color: #F6F7F7;
    background-color: transparent;
    border-width: 2px;
}
.nav.menu {
  border-bottom: 1px solid #e1e1e1;
}
.nav.menu .nav-item .icon-btn {
  border: 3px solid #B7C6C9;
  border-radius: 90px;
  padding: 5px 7px;
  color: #B7C6C9;
}
.nav.menu .nav-item.is-active .icon-btn {
  color: #2EB398;
  border: 3px solid #2EB398;
}
.nav.menu .nav-item .icon-btn .fa {
  font-size: 20px;
  color: #B7C6C9;
}
.nav.menu .nav-item.is-active .icon-btn .fa {
  color: #2EB398;
}
.aside {
  display:block;
  background-color: rgb(255, 255, 255);
  border-right: 1px solid #DEDEDE;
}
.messages {
  display:block;
  background-color: #fff;
  border-right: 1px solid #DEDEDE;
}
.message {
  display:block;
  background-color: #fff;
}
.aside .compose {
  height: 95px;
  margin:0 -10px;
  padding: 25px 30px;
}
.aside .compose .button {
  color: #F6F7F7;
}
.aside .compose .button .compose {
  font-size: 14px;
  font-weight: 700;
}
.aside .main {
  padding: 40px;
  color: #6F7B7E;
}
.aside .title {
  color: #6F7B7E;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
.aside .main .item {
  display: block;
  padding: 10px 0;
  color: #6F7B7E;
}
.aside .main .item.active {
  background-color: #F1F1F1;
  margin: 0 -50px;
  padding-left: 50px;
}
.aside .main .item:active,.aside .main .item:hover {
  background-color: #F2F2F2;
  margin: 0 -50px;
  padding-left: 50px;
}
.aside .main .icon {
  font-size: 19px;
  padding-right: 30px;
  color: #A0A0A0;
}

.messages {
  padding: 40px 20px;
}
.message {
  padding: 40px 20px;
}
.messages .action-buttons {
  padding: 0;
  margin-top: -20px;
}
.message .action-buttons {
  padding: 0;
  margin-top: -5px;
}
.action-buttons .control.is-grouped {
  display: inline-block;
  margin-right: 30px;
}
.action-buttons .control.is-grouped:last-child {
  margin-right: 0;
}
.action-buttons .control.is-grouped .button:first-child {
  border-radius: 5px 0 0 5px;
}
.action-buttons .control.is-grouped .button:last-child {
  border-radius: 0 5px 5px 0;
}
.action-buttons .control.is-grouped .button {
  margin-right: -5px;
  border-radius: 0;
}
.pg {
  display: inline-block;
  top:10px;
}
.action-buttons .pg .title {
  display: block;
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 3px;
  font-size:12px;

}
.action-buttons .pg a{
  font-size:12px;
  color: #AAAAAA;
  text-decoration: none;
}
.is-grouped .button {
  background-image: linear-gradient(#F8F8F8, #F1F1F1);
}
.is-grouped .button .fa {
  font-size: 15px;
  color: #AAAAAA;
}
.inbox-messages {
  margin-top:60px;
}
.message-preview {
  margin-top: 60px;
}
.inbox-messages .card {
  width: 100%;
}
.inbox-messages strong {
  color: #5D5D5D;
}
.inbox-messages .article-check {
  padding: 0 20px;
}
.inbox-messages .article-subject {
  padding: 10px 0;
  color: #5D5D5D;
}
.inbox-messages .article-attachment {
  float:right;
}
.inbox-messages .article-snippet {
  padding: 5px 20px 0px 5px;
}
.-messages .article-subject .fa {
  font-size: 14px;
  padding:3px 0;
}
.inbox-messages .article-timestamp {
  float: right;
  padding: 0 20px;
  color: #5D5D5D;
}
.message-preview .avatar {
  display: inline-block;
}
.message-preview .top .address {
  display: inline-block;
  padding: 0 20px;
}

.address .name {
  font-size: 16px;
  font-weight: bold;
}

.card.active {
  background-color:#F5F5F5;
}



</style>
