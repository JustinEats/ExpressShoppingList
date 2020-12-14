const express = require('express')
const router = new express.Router();
const expressError = require('../expressError')
const itemsDb = require('../fakeDb')

router.get('/', (req, res, next)=>{
    try{
        if(itemsDb.length === 0){
            throw new expressError('Your list is currently empty', 404)
        }
        return res.json(itemsDb)
    }catch(err){
        next(err)
    }
})

router.post('/', (req, res, next)=>{
    let name = req.body.name
    let price = req.body.price
    const newItem = {name: name, price: price}
    try{
        if(name === '' || price === ''){
            throw new expressError('You must fill all the inputs', 400)
        }
        itemsDb.push(newItem)
        return res.status(201).json({added:newItem}) //must return newItem for showing what's appending
    }catch(err){
        next(err)
    }
})

router.get('/:name',(req, res, next)=>{
    let itemName = itemsDb.find(item=>item.name === req.params.name) //return if inside {}
    try{
        if(itemName === undefined){
            throw new expressError('Can\'t find that item', 404)
        }
        return res.json(itemName)
    }catch(err){
        next(err)
    }
})

router.patch('/:name', (req, res, next)=>{
    let item = itemsDb.find(item=>item.name === req.params.name) //if the name inside matches the router name
    try{
        if(item.name === undefined || item.price === undefined ){
            throw new expressError('Must be valid input', 404)
        }
        item.name = req.body.name //changing the input inside .body
        item.price = req.body.price
        return res.json({updated:item})
    }catch(err){
        next(err)
    }
})

router.delete('/:name', (req, res, next)=>{
    let itemName = itemsDb.find(item=>item.name === req.params.name)
    try{
        if(itemName === undefined){
            throw new expressError('Could not delete invalid name', 404)
        }
        itemsDb.splice(itemName, 1) // deletes the first argument passed in and delete count from the array.
        return res.json({message: "Deleted"})
    }catch(err){
        next(err)
    }
})

module.exports = router;