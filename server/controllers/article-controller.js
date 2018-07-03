const Article = require ("../models/article")
const User = require("../models/user")
const images = require ('../helper/gcp')
const Storage = require('@google-cloud/storage');
const storage = new Storage();

module.exports={ 
    getAllArticle:(req,res,next)=>{
        Article.find({})
        .sort({createdAt:'desc'})
        .populate('userId')
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },



    getArticleByUserId:(req,res,next)=>{
        Article.paginate({userId:req.params.userid},{page:req.headers.page, limit:5, sort:{createdAt:'desc'}})
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },

    addNewArticle:(req,res,next)=>{
        let articleData = {
            userId:req.body.userid,
            title : req.body.title,
            content : req.body.content,
            pic_url:req.file.cloudStoragePublicUrl,
        }

        let newArticle = new Article(articleData)
        console.log(newArticle)
        newArticle.save()
        .then(article=>{
            res.status(200).send(article)
        })
        .catch(err=>{
            res.status(400).send(err)
        })

    },

    deleteArticle:(req,res,next)=>{
        Article.findByIdAndRemove(req.params.id)
        .then(article=>{
            var splitArticle=article.pic_url.split('/')
            console.log(splitArticle)
            var filename=splitArticle[splitArticle.length-1]
            res.send("deleted")
            function deleteImage(){
                storage
                .bucket('blogtdd')
                .file(filename)
                .delete()
                .then(() => {
                    console.log(`gs://blogtdd/${filename} deleted.`);
                })
                .catch(err => {
                    console.error('ERROR:', err);
                });
            }
            deleteImage()
            
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    }
}
