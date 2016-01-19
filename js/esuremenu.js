//@ sourceURL=esuremenu.js

/**
 * @file
 * Javascript functionality for the esure menu.
 */

(function ($, Drupal, drupalSettings) {
'use strict';

var mobileBreakpoint = window.matchMedia(drupalSettings.esuremenu.breakpoint);

function getMobileBreakpoints() {
  $('ul.menu').find('data-breakpoint').each(function(){
    var mobileBreakpoint = '(max-width: '.$(this).attr('data-breakpoint').'px)';
    console.log(mobileBreakpoint);
  })
}

function mediaqueryresponse(){
  $('ul.menu').find('[data-title]').each(function(){
    var $item = $(this).children();
    if (mobileBreakpoint.matches){
      $item.attr('data-old-title', $item.text());
      $item.text($(this).attr('data-title'));
    } else {
      $item.text($item.attr('data-old-title'));
    }
  });
}

Drupal.behaviors.esuremenu = {
  attach: function(context, settings) {

    var menuOverlay = $('#mobile-overlay');
    var overlayClose = $('#mobile-overlay .button-close');
    var menuOrigin = $('.region-sidebar-first .navigation');
    menuOrigin.prepend( '<div id="menu-mobile" class="menu-mobile"></div>' );
    var menuButton = $('#menu-mobile');

    menuOrigin.clone().appendTo(menuOverlay);

    menuButton.click(function(){
      menuOverlay.show();
    });
    overlayClose.click(function(){
      menuOverlay.hide();
    });
    // Verify that the user agent understands media queries.
    if (!window.matchMedia('only screen').matches) {
      return;
    }
    getMobileBreakpoints();
    mediaqueryresponse(mobileBreakpoint) // call listener function explicitly at run time
    mobileBreakpoint.addListener(mediaqueryresponse) // attach listener function to listen in on state changes

  }
};

}(jQuery, Drupal, drupalSettings));
