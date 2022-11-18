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
const {checkIdExists,  checkAbilityIdExists, validateAbility, validateDnd, checkNameAvailable, checkEncounterIdExists, validateEncounter,} = require('./dnd-middleware')

const router = express.Router()

router.get('/', (req, res) => {
    Dnd.findDnd()
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

router.get('/:id',checkIdExists, (req, res) => {
    res.status(200).json(req.entry)
})

router.post('/', validateDnd, checkNameAvailable,  (req, res) => {
    Dnd.insert(req.entry)
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

router.put('/:id', validateDnd, checkIdExists, async (req, res) => {
    const {id} = req.params;
    const newEntry = req.body;

    try {
        const updatedEntry = await Dnd.update(id, newEntry);
        if (updatedEntry) {
            res.status(200).json({message: "updated"})
        } else{
            res.status(404).json({message: "could not find entry"})
        }
    } catch (err) {
        res.status(500).json({message: "error updating post"})
    }
})

router.delete('/:id', checkIdExists,  async (req, res) => {
    Dnd.remove(req.params.id)
    .then(deletedEntry => {
        res.status(200).json(deletedEntry)
    })
    .catch(err => {
        res.status(500).json({
            message: 'The entry could not be deleted',
            error: err.message
        })
    })
})

router.get('/:id/abilities', checkIdExists, async (req, res) => {
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

router.get('/abilities/:id', checkAbilityIdExists, (req, res) => {
    res.status(200).json(req.ability)
})

router.post('/abilities', validateAbility, (req, res) => {
    Dnd.insertAbility(req.ability)
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

router.put('/abilities/:id', checkAbilityIdExists, validateAbility, (req, res) => {
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

router.delete('/abilities/:id', checkAbilityIdExists, (req, res) => {
   Dnd.removeAbility(req.params.id)
   .then(ability => {
        res.status(200).json(ability)
   })
   .catch(err => {
        res.status(500).json({
            message: 'Ability could not be deleted',
            error: err.message
        })
   })
})

//encounters

router.get('/encounters/all', (req, res) => {
    Dnd.findEncounters()
        .then(encounters => {
            res.status(200).json(encounters)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Error while grabbing the encounters"
            })
        })
})

router.get('/encounters/:id', checkEncounterIdExists, (req, res) => {
    res.status(200).json(req.encounter)
})

router.post('/encounters', validateEncounter, (req, res) => {
    Dnd.insertEncounter(req.encounter)
        .then(encounter => {
            res.status(201).json(encounter)
        })
        .catch(err => {
            res.status(500).json({
                message: "Error adding new encounter",
                err: err.message
            })
        })
})

router.delete('/encounters/:id', checkEncounterIdExists, (req, res) => {
    Dnd.removeEncounter(req.params.id)
        .then(deletedEncounter => {
            res.status(200).json(deletedEncounter)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The encounter could not be deleted',
                error: err.message
            })
        })
})

module.exports = router;