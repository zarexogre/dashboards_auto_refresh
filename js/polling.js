(function ($, Drupal, once) {
  Drupal.behaviors.dashboardsAutoRefresh = {
    attach: function (context, settings) {
      once('dashboards-auto-refresh', 'body', context).forEach(function () {
        // Check if auto-refresh is disabled via URL.
        var url = window.location.toString();
        if (!url.includes('disablerefresh')) {
          startPanelRotation(context);
        }
      });
    }
  }

  /**
   * Starts the panel rotation for auto-refreshing.
   *
   * @param {Object} context
   *   The context in which to find panels.
   */
  function startPanelRotation(context) {
    var $panels = $('.panel__content', context).map(function () {
      var id = $(this).attr('id');
      if (id && notExcluded(id)) {
        return this;
      }
    }).get();

    if ($panels.length > 0) {
      var currentIndex = 0;

      // Set interval for refreshing panels.
      setInterval(function () {
        refreshPanel($($panels[currentIndex]));
        currentIndex = (currentIndex + 1) % $panels.length;
      }, 20000);
    }
  }

  /**
   * Checks if a panel ID is excluded from refreshing.
   *
   * @param {string} id
   *   The panel ID to check.
   *
   * @return {boolean}
   *   TRUE if excluded, FALSE otherwise.
   */
  function notExcluded(id) {
    var excludedIds = ['rabbetts_map_block', 'camdrive_block', 'matomo_block', 'newsfeed_block', 'camworkshop_block', 'weather_block', 'camgym_block', 'camfrontdoor_block'];
    return !excludedIds.includes(id) && id.indexOf('chart') === -1;
  }

  /**
   * Refreshes a specific panel.
   *
   * @param {jQuery} $panel
   *   The jQuery object representing the panel to refresh.
   */
  function refreshPanel($panel) {
    var key = $panel.find('.content').attr('data-key') || '';

    $.ajax({
      url: '/dar/block/' + $panel.attr('id') + '/' + key,
      type: 'GET',
      dataType: 'html',
      context: $panel,
      success: function (html) {
        this.html(html);
        this.find('h2').addClass('loading');
        setTimeout(() => {
          this.find('h2').removeClass('loading');
        }, 3000);
      },
      error: function (xhr) {
        // Handle error if needed.
      }
    });
  }

})(jQuery, Drupal, once);
