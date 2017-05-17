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

      setBlockRefresh('.' + element, '.block-content', settings['auto'], settings['manual'], settings['init'], settings['timer'], settings['block']['block'], settings['block']['delta']);

      function setBlockRefresh(element, element_content, auto, manual, init, timer, block, delta) {
        // Do not bother if no element exists or has already been processed.
        if (!$(element).length || $(element).hasClass('block-refresh-processed')) {
          return;
        }

        $(element).addClass('block-refresh-processed');

        // Always get the argument from the referring page and append the to
        // end of the load request.
        args = '';
        query = '';
        $.each(Backdrop.settings.block_refresh.args, function (index, arg) {
          args += '/' + arg;
        });
        query = Backdrop.settings.block_refresh.query;

        var prefix = Backdrop.settings.block_refresh.cleanUrl ? '' : '?q=';
        var path = Backdrop.settings.basePath + prefix + Backdrop.settings.pathPrefix + 'block_refresh/' + block + '/' + delta + args + query;
        if (auto && context == document) {
          setInterval(function () {
            BlockRefreshContent(path, element, element_content, manual);
          }, timer * 1000); // We need to multiply by 1000 because the admin enters a number in seconds,  but the setInterval() function expects milliseconds
        }
        if (init && context == document) {
          BlockRefreshContent(path, element, element_content, manual);
        }
      }

      function addBlockRefreshButton(path, element, element_content, manual) {
        var refresh_link = '<div class="block-refresh-button">' + Backdrop.t('Refresh') + '</div>';
        // We'll attach the refresh link to the header if it exists...
        if ($(element + ' h2').length) {
          $(element + ' h2').before(refresh_link);
        }
        // ...otherwise we will attach it to the content
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
          var contents = $(data).html();
          // if this is a panel, preserve panel title.
          var oldh2 = $(element + ' h2.pane-title');
          $(element).html(contents);
          //$(element).removeClass('block-refresh-processed');
          if (manual) {
            addBlockRefreshButton(path, element, element_content, manual);
          }
          Backdrop.attachBehaviors();
        });
      }
    }
  };
})(jQuery);
