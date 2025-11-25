<?php

namespace Drupal\dashboards_auto_refresh\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;

/**
 * Provides an endpoint to get the custom block markup.
 *
 * @package Drupal\dashboards_auto_refresh\Controller
 */
class DashboardsAutoRefreshController extends ControllerBase {

  /**
   * An endpoint to get the block markup.
   *
   * @param string $pluginId
   *   The plugin ID of the block.
   * @param string $key
   *   The key for the block content.
   *
   * @return \Symfony\Component\HttpFoundation\Response
   *   Returns the rendered block markup as a response.
   */
  public function getBlockMarkup($pluginId, $key) {
    // Disable page caching for this request.
    \Drupal::service('page_cache_kill_switch')->trigger();
    
    // Create an instance of the block plugin.
    $block_manager = \Drupal::service('plugin.manager.block');
    $GLOBALS['key'] = $key;
    
    // Build the block and render it.
    $plugin_block = $block_manager->createInstance($pluginId, []);
    $build = $plugin_block->build();
    
    // Return the rendered block markup as a response.
    return new Response(\Drupal::service('renderer')->renderRoot($build));
  }

}
