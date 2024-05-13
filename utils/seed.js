const seed = require('./data');
const connection = require('../config/connection');
const { User, Thought } = require('../models');

seed();
