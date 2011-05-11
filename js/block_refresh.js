// $Id:$
(function ($) {
Drupal.behaviors.qtip = {
  attach: function(context) {
		$.each(Drupal.settings.block_refresh.settings, function(element, settings) {
      //Get argument from referring page and append to end of load request
      args = '';
      $.each(Drupal.settings.block_refresh.args, function(index, arg) {
        args += '/'+arg;
      });
      query = Drupal.settings.block_refresh.query;
     	if (settings['auto']) {
				setInterval(function() {
					$('#' + element + ' .content').load(Drupal.settings.basePath + 'block_refresh/' + settings['block']['block'] + '/' + settings['block']['delta'] + args + query);
				}, settings['timer'] * 1000); // We need to multiply by 1000 because the admin enters a number in seconds,  but the setInterval() function expects milliseconds
			}
			if (settings['manual']) {
				refresh_link = '<div class="block-refresh-button">' + Drupal.t('Refresh') + '</div>';
				// We'll attach the refresh link to the header if it exists...
				if ($('#' + element + ' h2').length) {
					// note: for some reason I couldn't get $(this) to work, I don't know why
					$('#' + element + ' h2').before(refresh_link);
				}
				// ...otherwise we will attach it to the content
				else {
					$('#' + element + ' .content').before(refresh_link);
				}
			}
			
			$('.block-refresh-button').click(function() {
				$(this).addClass('block-refresh-button-throbbing');
				$('#' + element + ' .content').load(Drupal.settings.basePath + 'block_refresh/' + settings['block']['block'] + '/' + settings['block']['delta'] + args + query, '', function() {
					$('.block-refresh-button').removeClass('block-refresh-button-throbbing');
				});
			});
		});
  }
};
})(jQuery);