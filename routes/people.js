var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res, next) {
  models.People.findAll()
  .then(function(people)
	  {
	  	res.json(people);
	  }
  );
});

router.get('/:id', function(req, res, next) {
  models.People.findById(parseInt(req.params.id))
  .then(function(people)
	  {
	  	res.json(people);
	  }
  );
});

router.post('/', function(req, res, next) {
  var req_person = req.body;
  models.People.create({
    firstName: req_person.firstName,
    lastName: req_person.lastName,
    sex: req_person.sex
  }).then(function(person)  
  {
    res.json(person);
  });
});

router.put('/:id', function(req, res, next) {
  var req_person = req.body;
  models.People.update({
    firstName: req_person.firstName,
    lastName: req_person.lastName,
    sex: req_person.sex
  },
  {
    where: { id : parseInt(req.params.id) }
  }).then(function(person)  
  {
    res.json(person);
  });
});


router.delete('/:id', function(req, res, next) {
  models.People.destroy(
  {
    where: { id : parseInt(req.params.id) }
  }).then(function(person)  
  {
    res.json(person);
  });
});


module.exports = router;