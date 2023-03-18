const express = require("express");
const router = express.Router();

// Load Travel model
const Travel = require("../models/Travel");

// @route GET api/travels/test
// @description tests travels route
// @access Public
router.get("/test", (req, res) => res.send("travel route testing!"));

// @route GET api/travels
// @description Get all travels
// @access Public
router.get("/", (req, res) => {
  Travel.find({ createdBy: req.user.userId })
    .then((travels) => res.json(travels))
    .catch((err) =>
      res.status(404).json({ notravelsfound: "No Travels found" })
    );
});

// @route GET api/travels/:id
// @description Get single travel by id
// @access Public
router.get("/:id", (req, res) => {
  Travel.findById(req.params.id)
    .then((travel) => res.json(travel))
    .catch((err) => res.status(404).json({ notravelfound: "No Travel found" }));
});

// @route GET api/travels
// @description add/save travel
// @access Public
router.post("/", (req, res) => {
  req.body.createdBy = req.user.userId;
  Travel.create(req.body)
    .then((travel) => res.json({ msg: "Travel added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this travel" })
    );
});

// @route GET api/travels/:id
// @description Update travel
// @access Public
router.put("/:id", (req, res) => {
  req.body.createdBy = req.user.userId;
  Travel.findByIdAndUpdate(req.params.id, req.body)
    .then((travel) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/travels/:id
// @description Delete travel by id
// @access Public
router.delete("/:id", (req, res) => {
  req.body.createdBy = req.user.userId;
  Travel.findByIdAndRemove(req.params.id, req.body)
    .then((travel) => res.json({ mgs: "Travel entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a travel" }));
});

module.exports = router;
