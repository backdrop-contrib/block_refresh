Block Refresh
=============

As the name implies, Block Refresh is a module that lets people configure all
or some of their blocks to be refreshed, either automatically in a defined
number of seconds or by providing a link that can be clicked on to refresh
the block content, or both!

Installation
------------

- Install this module using the official Backdrop CMS instructions at
  https://backdropcms.org/guide/modules

- Visit the Layout configuration page at Administration > Structure > Layouts
  (admin/structrre/layouts) and Manage Blocks for a layout.

- Configure a block you would like to refresh, and define the settings under
  the "Refresh settings" fieldset.

  Note: The inner element with the class .block-content will be replaced when
  the block refreshes. If your block does not have this class, the contents of
  the whole block will be replaced including the block title.

Documentation
-------------

Additional documentation is located in the Wiki:
https://github.com/backdrop-contrib/block_refresh/wiki/Documentation

Issues
------

Bugs and Feature requests should be reported in the Issue Queue:
https://github.com/backdrop-contrib/block_refresh/issues

Current Maintainers
-------------------

- Jen Lampton (https://github.com/jenlampton)
- Seeking additional maintainers

Credits
-------

- Ported to Backdrop CMS by [Jen Lampton](https://github.com/jenlampton).
- Maintained for Drupal by [Phil Dodd](https://www.drupal.org/u/tripper54).
- Originally written for Drupal by [Michael Lander](https://www.drupal.org/u/michaellander).

License
-------

This project is GPL v2 software. See the LICENSE.txt file in this directory for
complete text.

