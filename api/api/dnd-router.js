/* 
get all dnd
get dnd by id
create dnd
update dnd
delete dnd

get ability by id
get abilities by user
create ability
update ability
delete ability

*/ 

const express = require('express')
const Dnd = require('./dnd-model')

const router = express.Router()

router.get('/', (req, res) => {
    Dnd.findDnd(req.query)
        .then(entries => {
            res.status(200).json(entries)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Something went wrong trying to grab all the entries"
            })
        })
})

router.get('/:id', (req, res) => {
    Dnd.findById(req.params.id)
        .then(entry => {
            res.status(200).json(entry)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error retrieving specific entry"})
        })
})

router.post('/', (req, res) => {
    const newEntry = req.body;
    Dnd.insert({newEntry})
        .then(entry => {
            res.status(201).json(entry)
        })
        .catch(err => {
            res.status(500).json({
                message: "Error while adding new entry",
                err: err.message
            })
        })
})

router.put('/:id', (req, res) => {
    Dnd.findById(req.params.id)
        .then(entry => {
            if(!entry) {
                res.status(404).json({
                    message:'This id does not exist'
                })
            } else {
                return Dnd.update(req.params.id, req.body)
            }
        })
        .then(entry => {
            if(entry) {
                return Dnd.findById(req.params.id)
            }
        })
        .then(updatedEntry => {
            res.json(updatedEntry)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The updated info could not be retrieved',
                error: err.message
            })
        })
})

router.delete('/:id', async (req, res) => {
    try {
        const entry = await Dnd.findById(req.params.id)
        if(!entry) {
            res.status(404).json({
                message:'That entry cannot be found'
            })
        } else {
            await Dnd.remove(req.params.id)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The entry could not be deleted', 
            err: err.message
        })
    }
})

router.get('/:id/abilities', async (req, res) => {
    try {
        const entry = await Dnd.findById(req.params.id)
        if(!entry) {
            res.status(404).json({
                message: "This entry id does not exist"
            })
        } else {
            const abilities = await Dnd.findAbilitiesByDndId(req.params.id)
            res.json(abilities)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The abilities could not be found', 
            error: err.message
        })
    }
})

router.get('/abilities/:id', (req, res) => {
    Dnd.findAbilitiesById(req.params.id)
        .then(ability => {
            res.status(200).json(ability)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json('Ability with that id not found')
        })
})

router.post('/abilities', (req, res) => {
    const newAbility = req.body
    Dnd.insertAbility({newAbility})
        .then(ability => {
            res.status(201).json(ability)
        })
        .catch(err => {
            res.status(500).json({
                message:'Error while creating ability',
                error:err.message
            })
        })
})

router.put('/abilities/:id', (req, res) => {
    Dnd.findAbilitiesById(req.params.id)
        .then(ability => {
            if(!ability) {
                res.status(404).json('This ability id does not exist')
            } else {
                return Dnd.updateAbility(req.params.id, req.body)
            }
        })
        .then(ability => {
            if(ability) {
                return Dnd.findAbilitiesById(req.params.id)
            }
        })
        .then(updatedAbility => {
            res.json(updatedAbility)
        })
        .catch(err => {
            res.status(500).json({
                message:'Ability could not be found', 
                error: err.message
            })
        })
})

router.delete('/abilities/:id', async (req, res) => {
    try {
        const ability = await Dnd.findAbilitiesById(req.params.id)
        if(!ability) {
            res.status(404).json({message: 'Ability not found'})
        }
        else {
            Dnd.removeAbility(ability)
        }
    } catch(err) {
        res.status(500).json({
            message: 'The ability could not be found',
            error: err.message
        })
    }
})