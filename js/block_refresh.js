// $Id:$

// store the timer and current div data
_block_refresh_data = new Array();
_block_manual_data = new Array();

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

function block_refresh_manual(div) {
  $('#block-refresh-button-' + div).addClass('block-refresh-button-throbbing');
  $(_block_manual_data[div]._timer_delay).load(_block_manual_data[div]._url, null, function() { $('#block-refresh-button-' + div).removeClass('block-refresh-button-throbbing'); });
}

function block_refresh_all() {
  for (div in _block_refresh_data) {
    block_refresh(div);
  }
}

// this will add a button to the div, just below the header...
function block_refresh_add_button(div, url, content) {
  _block_manual_data[div] = new block_refresh_data(content, url);
  output = '<div id="block-refresh-button-' + div + '" class="block-refresh-button"><a href="test">Refresh</a></div>';
  $('#' + div).prepend(output);
  $('#block-refresh-button-' + div).click(function() { block_refresh_manual(div); return false; });
}
