'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Homepage
router.get('/dashboard', function (req, res) {
  var initiatives = [{ Author: 'James', title: 'Python is good for AI', Created: '21-4-2017', Body: 'I really enjoy reading python' }, { Author: 'Peter', title: 'Javascript is the king of the web', Created: '20-4-2016', Body: 'Javascript is really a fun language to play allong with' }];
  // const initiatives = [];
  res.render('dashboard', { initiatives: initiatives });
});

exports.default = router;