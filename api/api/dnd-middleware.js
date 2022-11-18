//Check id exists
//Check fields being filled
//Check name isn't in use
//More?
//Check ability id exists
//Check ability name and description

const Dnd = require('./dnd-model')

async function checkIdExists(req, res, next) {
    try {
        const entry = await Dnd.findById(req.params.id);
        if (entry) {
            req.entry = entry;
            next();
        } else {
            res.status(404).json({message: 'Could not find the entry with that ID'})
        }
    } catch(err) {
        res.status(500).json({message: 'Error finding entry'})
    }
}

function validateDnd(req, res, next) {
    const entry = req.body;
    if(!entry.name || !entry.hit_points || !entry.speed || !entry.STR || !entry.DEX || !entry.CON || !entry.INT || !entry.WIS || !entry.WIS || !entry.CHA || !entry.challenge_rating) {
        res.status(500).json({message: "Please enter all the required fields for an entry!"})
    }else {
        req.entry = entry;
        next();
    }
    
}

async function checkNameAvailable(req, res, next) {
    try {
        const entry = await Dnd.findByName(req.body.name);
        console.log(entry)
        if(entry[0]) {
            res.status(500).json({message: "That name is already taken"})
        }else {
            next();
        }
    } catch(err) {
        res.status(500).json({message: 'Error checking if name exists'})
    }
}

async function checkAbilityIdExists(req, res, next) {
    try {
        const ability = await Dnd.findAbilitiesById(req.params.id);
        if(ability) {
            req.ability = ability;
            next();
        } else {
            res.status(404).json({message: 'Could not find ability with that ID'})
        }
    } catch(err) {
        res.status(500).json({message: 'Error finding ability'})
    }
}

function validateAbility(req, res, next) {
    const ability = req.body;
    if(!ability.user_id || !ability.ability_name || !ability.ability_description) {
        res.status(500).json({message: "Please enter a user, ability name, and ability description!"})
    }else {
        req.ability = ability;
        next();
    }
}

//encounters

async function checkEncounterIdExists(req, res, next) {
    try {
        const encounter = await Dnd.findByEncounterId(req.params.id)
        if (encounter) {
            req.encounter = encounter;
            next()
        } else {
            res.status(404).json({message: "Could not locate encounter with that ID"})
        }
    } catch(err) {
        res.status(500).json({message: "Error finding encounter"})
    }
}

function validateEncounter(req, res, next) {
    const encounter = req.body;
    if(!encounter.name) {
        res.status(500).json({message:"Please enter an encounter name"})
    } else {
        req.encounter = encounter;
        next();
    }
}

module.exports = {
    checkIdExists,
    validateDnd,
    checkNameAvailable,
    checkAbilityIdExists,
    validateAbility,
    checkEncounterIdExists,
    validateEncounter,
    
}