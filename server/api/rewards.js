const router = require("express").Router();
const { Student, Reward } = require("../db/models");

//GET all rewards
router.get("/", async (req, res, next) => {
  try {
    const rewards = await Reward.findAll();
    res.json(rewards);
  } catch (error) {
    next(error);
  }
});

//GET one reward by Id
router.get("/:rewardId", async (req, res, next) => {
  try {
    const reward = await Reward.findByPk(req.params.rewardId);
    res.json(reward);
  } catch (error) {
    next(error);
  }
});

//DELETE one reward by Id
router.delete("/:rewardId", async (req, res, next) => {
  try {
    await Reward.destroy({
      where: {
        id: req.params.rewardId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

//POST claim a reward
router.put("/", async (req, res, next) => {
  //   console.log("REWARD REQ:", req.body);
  try {
    // console.log("in try/catch");
    const student = await Student.findByPk(req.body.studentId);
    const reward = await Reward.findByPk(req.body.rewardId);

    await student.addReward(reward);
    res.status(201).json(reward);
  } catch (error) {
    next(error);
  }
});

// //remove a reward from a student's rewards array
// router.put("/remove", async (req, res, next) => {
//   try {
//     const currentstudent = await Student.findByPk(req.body.studentId);
//     const currentreward = await Reward.findByPk(req.body.rewardId);
//     await currentstudent.removeReward(currentreward);
//     res.status(201).json(currentreward);
//   } catch (error) {
//     console.log(error);
//   }
// });

//POST one reward
router.post("/", async (req, res, next) => {
  try {
    const { name, description, cost, imageUrl } = req.body;
    const newReward = await Reward.create({
      name,
      description,
      cost,
      imageUrl,
    });
    res.send(newReward);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
