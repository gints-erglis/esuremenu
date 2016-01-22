//@ sourceURL=esuremenu.js

/**
 * @file
 * Javascript functionality for the esure menu.
 */

(function ($, Drupal, drupalSettings) {
'use strict';

var mobileBreakpoint = [];

function getMobileBreakpoints() {
  var count = 0;
  $('ul.menu').each(function(){
    if($(this).is('[data-breakpoint]')){
      var breakpoint = "(max-width: "+$(this).attr('data-breakpoint')+"px)";
      mobileBreakpoint[count] = breakpoint;
      mediaqueryresponse(mobileBreakpoint[count]);
      window.matchMedia(mobileBreakpoint[count]).addListener(function(){ mediaqueryresponse(breakpoint); });
      count ++;
    }
  });
}

function mediaqueryresponse(breakpoint){
  $('ul.menu').each(function(){
    if($(this).is('[data-breakpoint]')){
      var dataBreakpoint = "(max-width: "+$(this).attr('data-breakpoint')+"px)";
      if(dataBreakpoint === breakpoint) {
        $(this).find('[data-title]').each(function(){
          var $item = $(this).children();
          if (window.matchMedia(breakpoint).matches){
            $item.attr('data-old-title', $item.text());
            $item.text($(this).attr('data-title'));
          }
          else {
            $item.text($item.attr('data-old-title'));
          }
        });
      }
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
  }
};

}(jQuery, Drupal, drupalSettings));
