const User = require('../models/User');
const messages = require('../messages/userMessages');

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(422).json({ error: messages.REQUIRED_FIELD });
    } else if (!password) {
      return res.status(422).json({ error: messages.REQUIRED_FIELD });
    }

    const user = {
      username,
      password,
    };

    await User.create(user);

    res.status(201).json({ message: messages.USER_CREATED_SUCCESS });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: messages.USER_NOT_FOUND });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const user = {
      username,
      password,
    };

    const existsUser = await User.findOne({ _id: id });
    if (!existsUser) {
      return res.status(404).json({ message: messages.USER_NOT_FOUND });
    }

    await User.updateOne({ _id: id }, user);

    res.status(201).json({ message: messages.USER_UPDATED_SUCCESS });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: messages.USER_NOT_FOUND });
    }

    await User.deleteOne({ _id: id });

    res.status(201).json({ message: messages.USER_DELETED_SUCCESS });
  } catch (error) {
    res.status(500).json({ error });
  }
};
