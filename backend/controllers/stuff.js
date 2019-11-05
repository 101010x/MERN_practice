//File that handles the bussiness Logic of our routes We will know what each route does
const fs = require('fs')
const Thing = require('../models/thing');

exports.getAllStuff = (req,res,next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    () => {
      res.status(400).json({
       error: error
      });
    });
};

//The format changes(now a string) hence as everything was sent as form data so as to send a fil
//post route
exports.createThing = (req,res,next) => {
  req.body.thing = JSON.parse(req.body.thing);
  //define url to access file
  const url = req.protocol + '://' + req.get('host');
  const thing = new Thing({
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/'+ req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId
  });
  thing.save().then(
    ()=> {
      res.status(201).json({
        message: 'Post successfully saved!'
      })
    }).catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

//route to find a single element
//we use :id to show that it is dynamic
exports.getOneThing = (req,res,next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing)
  }).catch(
    (error) => {
        res.status(400).json({
            error: error
        });
  });
};

//route to update/modify an item
//We specify Id so as to ensure that it remains the same
//We recycle the createThing func if the format comes in as a file
exports.modifyThing = (req, res, next) => {
  let thing = new Thing({ _id: req.params._id })
  if(req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.thing = JSON.parse(req.body.thing);
    thing = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId
    };
  } else {
    thing = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
    };
  }
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    });
};

//delete route
exports.deleteThing = (req, res, next) => {
  Thing.findOne({_id: req.params.id}).then(
    (thing) => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Thing.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};
  