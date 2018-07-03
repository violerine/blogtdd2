import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles:'',
    articlesByUser:'',
    totalArticleByUser:'',
    totalPage:''
  },
  mutations: {
    allArticles(state,payload){
      state.articles=payload
    },
    articlesPerUser(state,payload){      
      state.articlesByUser=payload
    },
    sendTotalArticlePerUsr(state,payload){
      state.totalArticleByUser=payload
    },
    getTotalPage(state,payload){
      state.totalPage=payload
    }

  },
  
  actions: {
    getAllArticles({commit}){
      axios.get('http://localhost:8000/articles/')
      .then(({data})=>{
        commit('allArticles',data)
      })
      .catch(err=>{
        console.log("ERRORNYA DI STORE GET ALL ARTICLES",err)
      })
    },
    getArticlesByUser({commit},payload){
      const user= localStorage.getItem('userid')
      var config ={
        headers:{
          'page':payload
        }
      }
      axios.get(`http://localhost:8000/articles/${user}`,config)
      .then(({data})=>{
        var totalData = data.total
        var noOfPage = Math.ceil(totalData/data.limit)
        // console.log("LIMIT DATA",data.limit)
        commit('sendTotalArticlePerUsr',data.total)
        commit('articlesPerUser',data.docs)
        commit('getTotalPage',noOfPage)
        
      })
      .catch(err=>{
        console.log("ERROR FROM GET ARTICLES BY USER",err)
      })
    }
  }
})
