// Import required modules
const express = require("express");
const router = express.Router();
const passport = require("passport");


// Load Asset model
const Asset = require("../../models/Asset");

// Load User model
const User = require("../../models/User");


// @route       GET api/assets/all
// @desc        Get all assets
// @access      Private
router.get("/all", (req, res) => {
  const errors = {};
  Asset.find()
    .then(assets => {
      if (assets.length === 0) {
        errors.noasset = "There are no assets";
        return res.status(404).json({ errors });
      }
      res.json(assets);
    })
    .catch(err => res.status(404).json(err));
});

// @route       GET api/assets/:id
// @desc        Get asset by asset ID
// @access      Private
router.get("/:id", (req, res) => {
  const errors = {};
  Asset.findOne({ _id: req.params.id })
    .then(asset => {
      res.json(asset);
    })
    .catch(err =>
      res.status(404).json({ asset: "There is no asset with this id!" })
    );
});

// @route       Post api/assets
// @desc        Create or Edit asset
// @access      Private
router.post(
  "/",
  (req, res) => {
    let errors = {};
    const assetFields = {};
    if (req.body.label) assetFields.label = req.body.label;
    if (req.body.description) assetFields.description = req.body.description;
    if (req.body.type) assetFields.type = req.body.type;
    if (req.body.status) assetFields.status = req.body.status;
    if (req.body.initialpurchasedate) assetFields.initialpurchasedate = req.body.initialpurchasedate;
    if (req.body.currentowner) assetFields.currentowner = req.body.currentowner;
    
    Asset.findOne({ _id: req.body.id }).then(asset => {
      if (asset) {
        //Update
        Asset.findOneAndUpdate(
          { _id: req.body.id },
          { $set: assetFields },
          { new: true }
        ).then(asset => res.json(asset));
      } else {

    // Check if label already exist
    Asset.findOne({ label: assetFields.label }).then(asset => {
    if (asset) {
        errors.label = "Asset with this label already exists";
        res.status(400).json(errors);
    }
     else{   //Create
        new Asset(assetFields).save().then(asset => res.json(asset));
     }
    });
}
});
}
);


// @route       Delete api/assets/asset/:id
// @desc        Delete asset
// @access      Private
router.delete(
  "/:id",
  (req, res) => { 
    Asset.findById(req.params.id)
        .then(asset => {
          //Delete asset
          asset.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ assetnotfound: "No asset found" }));
  }
);

module.exports = router;
