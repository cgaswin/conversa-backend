const cookieToken = async(user, res) => {
  const token = await user.getJwtToken();
  const {email,name} = user
  const userDetails = {
    email,
    name,
    user_id:user._id
  }
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    user:userDetails,
  });
};

module.exports = cookieToken;
