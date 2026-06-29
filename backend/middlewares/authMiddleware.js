const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({
      message:'unauthorized'
    });
  }

  // if something in verification is wrong catch handles it
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch(e){
    return res.status(401).json({
      message: 'unauthorized'
    });
  }
}

module.exports = authMiddleware;