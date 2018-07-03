var express = require('express');
var router = express.Router();
const images = require ('../helper/gcp')
var {getArticleByUserId,getAllArticle,deleteArticle,addNewArticle}=require ('../controllers/article-controller.js')

/* GET users listing. */
router.get('/a', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/',getAllArticle)
router.post('/upload',images.multer.single('image'),
images.sendUploadToGCS,(req,res)=>{
  res.send({
    status:200,
    message:'Your file uploaded',
    link:req.file.cloudStoragePublicUrl
  }) 
})
router.get('/:userid',getArticleByUserId)

router.post('/add',images.multer.single('image'),images.sendUploadToGCS,addNewArticle)
router.delete('/delete/:id',deleteArticle)
module.exports = router;
