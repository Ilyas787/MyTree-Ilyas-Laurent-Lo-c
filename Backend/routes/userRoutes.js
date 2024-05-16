const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Relative = require('../models/Relative');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config({ path: 'secret.env' });
const multer = require('multer');

const upload = multer();

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

router.post('/register', upload.none(),async (req, res) => {

  try {
    console.log("body of register",req.body);
    // Récupérer les données du corps de la requête
    const { name, dateOfBirth, sexe, email, password } = req.body;

    // Vérifier si toutes les données requises sont présentes
    if (!name || !dateOfBirth || !sexe || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      sexe,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    await newUser.save();
    // Envoyer une réponse avec un message simple
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.post('/login', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const { id } = decoded;

    User.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Logged in successfully', token });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.post('/', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'email invalid' });
  }

  bcrypt.compare(password, user.password, function(err, result) {
        if (err) { throw (err); }
        console.log(result);
  });

  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

  res.status(200).json({ token });
});

router.post('/:id/marry', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const { id } = req.params;
    const { spouseId } = req.body;


    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const spouse = await User.findById(spouseId);
    if (!spouse) {
      return res.status(404).json({ message: 'Spouse not found' });
    }


    user.spouse = spouse._id;
    await user.save();


    spouse.spouse = user._id;
    await spouse.save();

    res.status(200).json({ message: 'Users are now married' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/add-user', upload.none(),async (req, res) => {
  try {
    //console.log("body of add-user",req.body);
    // Récupérer les données du corps de la requête
    const { name, relation, dateOfBirth, sexe, hostname} = req.body;
    //console.log("yo", name, relation, dateOfBirth, sexe);
    // Vérifier si toutes les données requises sont présentes
    if (!name || !relation || !dateOfBirth  || !sexe || !hostname) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Create a new user
    const newUser = new Relative({
      name,
      relation,
      dateOfBirth,
      sexe
    });
    console.log("nouveau realtive", newUser);
    await newUser.save();
    // Envoyer une réponse avec un message simple
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a parent to a user
router.post('/relatives', async (req, res) => {
  console.log("oui");
  try {
    console.log("add-parent", req.body);
    const { hostname , name } = req.body;


    const parent = await Relative.findOne({name: name});
    if (!parent) {
      return res.status(404).json({ message: 'Parent not found' });
    }
    console.log("pere", parent);

    const user = await User.findOneAndUpdate(
      {name: hostname},
      {parentsId: parent._id },
      {new: true}
    );
    console.log("use", user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Parent added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a child to a user
router.post('/add-child', async (req, res) => {
  try {
    const { id, childId } = req.body;


    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const child = await User.findById(childId);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }


    user.children.push(child._id);
    await user.save();

    res.status(200).json({ message: 'Child added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
