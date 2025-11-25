# Dashboards Auto Refresh Module

## Overview

The Dashboards Auto Refresh module allows custom blocks to auto-reload within dashboards in Drupal. This module extends the Dashboards with Layouts module, providing a seamless experience for users who need dynamic content updates.

## Features

- Automatically refreshes specified blocks within dashboards.
- Excludes certain blocks from refreshing based on their IDs.
- Provides a configurable endpoint for fetching block markup.

## Code Snippets

### Block Preprocessing

The `dashboards_auto_refresh_preprocess_block` function prepares block variables for rendering, ensuring that the correct attributes are set for dashboard panels.

### Page Attachments

The `dashboards_auto_refresh_page_attachments` function attaches the necessary JavaScript library to the dashboard page, enabling the auto-refresh functionality.

### Controller Endpoint

The `DashboardsAutoRefreshController` class provides an endpoint to fetch the custom block markup. It disables page caching for the request and renders the block dynamically.

### JavaScript Behavior

The JavaScript file `polling.js` contains the behavior for auto-refreshing panels. It collects panels, checks for exclusions, and sets an interval for refreshing the content.

## Installation

1. Place the module in the `modules/custom` directory.
2. Enable the module using Drush or the Drupal admin interface.
3. Clear the cache to ensure the module is recognized.

## Requirements

- Drupal 8, 9, or 10
- Dashboards with Layouts module

## License

This module is released under the MIT License.
