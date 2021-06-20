const Disease = require("../modals/disease");

exports.addDisease =(req,res) => {
    var disease = new Disease(req.body)
    disease.save((err,disease) => {
        if(err || !disease){
            return res.status(400).json({
                error : 'Not able to save in DB*',
                param : err
            })
        }

        return res.json({
            registered : true
        })
    })
}

exports.getDisease = (req,res) => {
    Disease.find({})
    .exec((err , disease) => {
        if(err || !disease){
            return res.status().json({
                error : 'Not able to save in DB*',
                param : err
            })
        }
        res.json({
            disease
        })
    })
}

exports.search = (req,res) => {
    var getSymptoms = req.params.search
    Disease.find({symptoms : {$regex: getSymptoms,$options: 'i'} })
    .exec((err, post) => {
        if(err) {
            return res.status(400).json({
                    error : 'Not able to get from Db',
                    param : err
            })
        }
        if(!post){
            return res.status(200).json({
                post : "no more post",
                end : true
            })
        }
        return res.json(post)
    })
}

exports.searchDic = (req,res) => {
    var getDiseaseByName = req.params.name
    Disease.find({disease_name : {$regex: getDiseaseByName,$options: 'i'} })
    .exec((err, post) => {
        if(err) {
            return res.status(400).json({
                    error : 'Not able to get from Db',
                    param : err
            })
        }
        if(!post){
            return res.status(200).json({
                post : "no more post",
                end : true
            })
        }
        return res.json(post)
    })
}