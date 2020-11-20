let DHIS_BASE_API_URL = process.env.REACT_APP_DHIS_BASE_API_URL;
let APP_BASE_URL =
  process.env.REACT_APP_APP_BASE_URL || 'http://41.89.94.99:3000';

let endpoints = {}  
endpoints.f_p = require('./endpoints/fp');
endpoints.m_al = require('./endpoints/malaria');
endpoints.t_b = require('./endpoints/tb');
endpoints.h_iv = require('./endpoints/hiv');
endpoints.e_mms = require('./endpoints/emms');
endpoints.n_utr = require('./endpoints/nutrition');

module.exports = endpoints;
