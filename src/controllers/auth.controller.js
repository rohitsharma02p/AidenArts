const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, auth0Service } = require('../services');

const register = catchAsync(async (req, res) => {

  const userdata = await auth0Service.signUpUser(req.body);
  req.body.auth_userid = userdata._id;
  req.body.email_verified = userdata.email_verified;
  if(userdata){
    const saveUser = await userService.createUser(req.body)
    saveUser.addRole("user", function (err) {});
    let user = {
      auth_userid: userdata._id,
      email: userdata.email,
      password: saveUser.password,
      role:saveUser.role,
      id: saveUser.id,
      email_verified: userdata.email_verified,
    }
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: "User registered successfully",
      data: user,
    });
  }
  else{
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
  }
   
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await authService.validateLoginUser(email, password);
  // console.log(userDoc)
  const userLogin = await auth0Service.loginUserByauth0(email, password);
  const auth0UserInfo = await tokenService.getUserInfoByAuth0Token(
    userLogin.access_token
  );
  if(!auth0UserInfo.email_verified){
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email not varified");
   }
   if (auth0UserInfo.email_verified && !userDoc.isEmailVerified) {
    let userObject = {
      isEmailVerified: auth0UserInfo.email_verified
     }
     userService.updateUserById(userDoc.auth_userid, userObject)
   }
   const tokens = {
    access: {
      token: userLogin.access_token,
      expires: userLogin.expires_in,
      tokenType: userLogin.token_type,
    },
  };
  await tokenService.saveToken(userLogin.access_token,userLogin.expires_in, userDoc._id )
  const user = {
    role: userDoc.role,
    isEmailVerified: auth0UserInfo.email_verified,
    status: userDoc.status,
    auth0Id: userDoc.auth0Id,
    adminApproved: userDoc.adminApproved,
    _id: userDoc._id,
    auth_userid: userDoc.auth_userid,
    email: userDoc.email,
    name: userDoc.name,
    createdAt: userDoc.createdAt,
    updatedAt: userDoc.updatedAt,

  };
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: "User logged in successfully",
    data: { user, tokens },
  });

});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
