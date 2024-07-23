import jwt from 'jsonwebtoken';
import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/users.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '6d',
  });
};

const createSendResToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const isDev = process.env.NODE_ENV === 'development' ? false : true;
  const cookieOption = {
    expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    security: isDev,
  };

  res.cookie('jwt', token, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    code: statusCode.toString(),
    status: 'Success',
    message: 'User created successfully',
    data: user,
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const isOwner = (await User.countDocuments()) === 0;
  const role = isOwner ? 'owner' : 'user';

  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: role,
  });

  createSendResToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  // Email validation
  if (!req.body.email) {
    res.status(400);
    throw new Error('Please add an email');
  }

  // Password validation
  if (!req.body.password) {
    res.status(400);
    throw new Error('Please add a password');
  }

  const userData = await User.findOne({ email: req.body.email });

  if (userData && (await userData.comparePassword(req.body.password))) {
    createSendResToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    return res.status(200).json({
      code: '200',
      status: 'Success',
      message: 'Request was successful.',
      data: user,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const logoutUser = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({
    message: 'Logout Berhasil',
  });
};
