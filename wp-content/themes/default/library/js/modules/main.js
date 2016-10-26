import {test} from './mod1-sample';
const $ = require('jquery');


$(document).ready(() => {
  test();
  $('.mobile-hamburger-menu').click(() => {
    $('.access, .mobile-hamburger-menu').toggleClass('active');
  });
});

