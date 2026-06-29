const problemModel = require('../models/problemModel');
const addProblem = async (req, res, next) => {
  const { title, difficulty, platform, topics, notes } = req.body;
  const topicslist = topics.trim().split(',').map((item) => {
    return item.trim();
  });
  await problemModel.create({
    userId: req.user.userid,
    title,
    difficulty,
    platform,
    topic: topicslist,
    notes
  });
  res.status(200).send('problem added');
}

const getProblems = async (req, res) => {
  const problems = await problemModel.find({ userId: req.user.userid });
  res.json(problems);
}

const getStats = async (req, res) => {
  const problems = await problemModel.find({
    userId: req.user.userid
  });

  let easy = 0;
  let medium = 0;
  let hard = 0;

  for (const problem of problems) {
    if (problem.difficulty === 'Easy')
      easy++;

    else if (problem.difficulty === 'Medium')
      medium++;

    else if (problem.difficulty === 'Hard')
      hard++;
  }

  res.json({
    total: problems.length,
    easy,
    medium,
    hard
  });
}

const deleteProblem = async (req, res) => { 
  const { id } = req.params; 
  await problemModel.deleteOne({ _id: id, userId: req.user.userid }); 
  res.send('Problem deleted');
}

module.exports = { addProblem, getProblems, getStats, deleteProblem };