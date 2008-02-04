// $Id:$

// store the timer and current div data
_block_refresh_data = new Array();

// this stores all our static data
function block_refresh_data(timer_delay, url) {
  this._timer_delay = timer_delay;
  this._url = url;
}

// set the timer on or off
function block_refresh_timer(div) {
   _block_refresh_data[div]._timer_id = setInterval("block_refresh('" + div + "')", _block_refresh_data[div]._timer_delay);
}

function block_refresh(div) {
  $(div).load(_block_refresh_data[div]._url);
}

