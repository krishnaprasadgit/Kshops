var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectId
const { PRODUCT_COLLECTION } = require('../config/collections')
const { resolve, reject } = require('promise')
const { response } = require('../app')
module.exports={
    addproduct:(product,callback)=>{
        console.log(product)
        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback({ _id:data.insertedId.toString()})
            
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
           db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
            resolve(response)
           })
        })
    },
    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
            resolve(product)
        })
        })
    },
    updateProduct:(proId,proDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetails.Name,
                    Category:proDetails.Category,
                    Price:proDetails.Price,
                    Description:proDetails.Description

                }
            }).then((response)=>{
                resolve(response)
            })
        })
    }
}