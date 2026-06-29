const profileModel = require('../models/profileModel');

const addProfile = async (req, res) => {
  try {
    const {
      platform,
      username,
      totalSolved,
      easy,
      medium,
      hard,
      pic
    } = req.body;

    await profileModel.findOneAndUpdate(
      {
        userId: req.user.userid,
        platform
      },
      {
        username,
        totalSolved,
        easy,
        medium,
        hard,
        pic
      },
      {
        upsert: true,
        new: true
      }
    );

    res.status(200).json({
      message: "Profile saved successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.find({
      userId: req.user.userid
    });

    res.status(200).json(profiles);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch profiles"
    });
  }
};

module.exports = {addProfile,getProfiles};