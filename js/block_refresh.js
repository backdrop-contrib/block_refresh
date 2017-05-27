/**
 * @file block refresh JS.
 */

(function ($) {
  Backdrop.behaviors.block_refresh = {
    attach: function (context) {

      var settings = Backdrop.settings.block_refresh.settings;
      var element = settings.element;
      // Sanity check: do nothing is settings.element is not defined.
      if (typeof element === 'undefined') {
        return;
      }

      // Look for the default block class, or the block-refresh class.
      var element_content = false;
      if ( $('.block-content').parents('.' + element).length == 1 ) {
        element_content = '.block-content';
      }

      setBlockRefresh('.' + element, element_content, settings['auto'], settings['manual'], settings['init'], settings['timer'], settings['module'], settings['delta'], settings['uuid']);

      function setBlockRefresh(element, element_content, auto, manual, init, timer, block, delta, uuid) {
        // Do not bother if no element exists or has already been processed.
        if (!$(element).length || $(element).hasClass('block-refresh-processed')) {
          return;
        }

        $(element).addClass('block-refresh-processed');

        // Always get the argument from the referring page and append the to
        // end of the load request.
        args = '';
        $.each(Backdrop.settings.block_refresh.args, function (index, arg) {
          args += '/' + arg;
        });
        query = Backdrop.settings.block_refresh.query;

        var prefix = Backdrop.settings.block_refresh.cleanUrl ? '' : '?q=';
        var path = Backdrop.settings.basePath + prefix + Backdrop.settings.pathPrefix + 'block_refresh/' + block + '/' + delta + '/' + uuid + args + query;

        if (auto && context == document) {
          setInterval(function () {
            BlockRefreshContent(path, element, element_content, manual);
            // We need to multiply by 1000 because the admin enters a number in
            // seconds, but the setInterval() function expects milliseconds.
          }, timer * 1000);
        }
        if (init && context == document) {
          BlockRefreshContent(path, element, element_content, manual);
        }
      }

      function addBlockRefreshButton(path, element, element_content, manual) {
        var refresh_link = '<div class="block-refresh-button">' + Backdrop.t('Refresh') + '<span class="icon"></span></div>';

        if ($(".block-refresh-button")[0]){
          return;
        }

        // Attach the refresh link to the header if it exists...
        if ($(element + ' h2').length) {
          $(element + ' h2').before(refresh_link);
        }
        // ...otherwise we will attach it to the content.
        else {
          $(element + ' ' + element_content).before(refresh_link);
        }

        //register click function
        $(element + ' .block-refresh-button').click(function () {
          $(this).addClass('block-refresh-button-throbbing');
          BlockRefreshContent(path, element, element_content, manual);
        });
      }

      function BlockRefreshContent(path, element, element_content, manual) {
        $.get(path, function (data) {
          if (element_content) {
            // Replace what's inside the element_content wrapper element.
            $(element + ' ' + element_content).html(data);
          }
          else {
            // Otherwise replace everything (Note: this will wipe the title!)
            $(element).html(data);
          }

          if (manual) {
            addBlockRefreshButton(path, element, element_content, manual);
            // Remove the throbbing class.
            $(".block-refresh-button").removeClass('block-refresh-button-throbbing');
          }
          Backdrop.attachBehaviors();
        });
      }
    }
  };
})(jQuery);
