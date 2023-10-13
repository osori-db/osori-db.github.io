---
---
(function (jtd, undefined) {

// Event handling

jtd.addEvent = function(el, type, handler) {
  if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
}
jtd.removeEvent = function(el, type, handler) {
  if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
}
jtd.onReady = function(ready) {
  // in case the document is already rendered
  if (document.readyState!='loading') ready();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', ready);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
      if (document.readyState=='complete') ready();
  });
}

// Show/hide mobile menu

function initNav() {
  jtd.addEvent(document, 'click', function(e){
    var target = e.target;
    while (target && !(target.classList && target.classList.contains('nav-list-expander'))) {
      target = target.parentNode;
    }
    if (target) {
      e.preventDefault();
      target.ariaPressed = target.parentNode.classList.toggle('active');
    }
  });

  const siteNav = document.getElementById('site-nav');
  const mainHeader = document.getElementById('main-header');
  const menuButton = document.getElementById('menu-button');
  
  disableHeadStyleSheet();

  jtd.addEvent(menuButton, 'click', function(e){
    e.preventDefault();

    if (menuButton.classList.toggle('nav-open')) {
      siteNav.classList.add('nav-open');
      mainHeader.classList.add('nav-open');
      menuButton.ariaPressed = true;
    } else {
      siteNav.classList.remove('nav-open');
      mainHeader.classList.remove('nav-open');
      menuButton.ariaPressed = false;
    }
  });

  {%- if site.search_enabled != false and site.search.button %}
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  jtd.addEvent(searchButton, 'click', function(e){
    e.preventDefault();

    mainHeader.classList.add('nav-open');
    searchInput.focus();
  });
  {%- endif %}
}

// The page-specific <style> in the <head> is needed only when JS is disabled.
// Moreover, it incorrectly overrides dynamic stylesheets set by setTheme(theme). 
// The page-specific stylesheet is assumed to have index 1 in the list of stylesheets.

function disableHeadStyleSheet() {
  if (document.styleSheets[1]) {
    document.styleSheets[1].disabled = true;
  }
}

// Switch theme

jtd.getTheme = function() {
  var cssFileHref = document.querySelector('[rel="stylesheet"]').getAttribute('href');
  return cssFileHref.substring(cssFileHref.lastIndexOf('-') + 1, cssFileHref.length - 4);
}

jtd.setTheme = function(theme) {
  var cssFile = document.querySelector('[rel="stylesheet"]');
  cssFile.setAttribute('href', '{{ "assets/css/just-the-docs-" | relative_url }}' + theme + '.css');
}

// Note: pathname can have a trailing slash on a local jekyll server
// and not have the slash on GitHub Pages

function navLink() {
  var href = document.location.pathname;
  if (href.endsWith('/') && href != '/') {
    href = href.slice(0, -1);
  }
  return document.getElementById('site-nav').querySelector('a[href="' + href + '"], a[href="' + href + '/"]');
}

// Scroll site-nav to ensure the link to the current page is visible

function scrollNav() {
  const targetLink = navLink();
  if (targetLink) {
    const rect = targetLink.getBoundingClientRect();
    document.getElementById('site-nav').scrollBy(0, rect.top - 3*rect.height);
  }
}

// Find the nav-list-link that refers to the current page
// then make it and all enclosing nav-list-item elements active.

function activateNav() {
  var target = navLink();
  if (target) {
    target.classList.toggle('active', true);
  }
  while (target) {
    while (target && !(target.classList && target.classList.contains('nav-list-item'))) {
      target = target.parentNode;
    }
    if (target) {
      target.classList.toggle('active', true);
      target = target.parentNode;
    }
  }
}

// Document ready

jtd.onReady(function(){
  initNav();
  {%- if site.search_enabled != false %}
  initSearch();
  {%- endif %}
  activateNav();
  scrollNav();
});

// Copy button on code


{%- if site.enable_copy_code_button != false %}

jtd.onReady(function(){

  if (!window.isSecureContext) {
    console.log('Window does not have a secure context, therefore code clipboard copy functionality will not be available. For more details see https://web.dev/async-clipboard/#security-and-permissions');
    return;
  }

  var codeBlocks = document.querySelectorAll('div.highlighter-rouge, div.listingblock > div.content, figure.highlight');

  // note: the SVG svg-copied and svg-copy is only loaded as a Jekyll include if site.enable_copy_code_button is true; see _includes/icons/icons.html
  var svgCopied =  '<svg viewBox="0 0 24 24" class="copy-icon"><use xlink:href="#svg-copied"></use></svg>';
  var svgCopy =  '<svg viewBox="0 0 24 24" class="copy-icon"><use xlink:href="#svg-copy"></use></svg>';

  codeBlocks.forEach(codeBlock => {
    var copyButton = document.createElement('button');
    var timeout = null;
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerHTML = svgCopy;
    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
      if(timeout === null) {
        var code = (codeBlock.querySelector('pre:not(.lineno, .highlight)') || codeBlock.querySelector('code')).innerText;
        window.navigator.clipboard.writeText(code);

        copyButton.innerHTML = svgCopied;

        var timeoutSetting = 4000;

        timeout = setTimeout(function () {
          copyButton.innerHTML = svgCopy;
          timeout = null;
        }, timeoutSetting);
      }
    });
  });

});

{%- endif %}

})(window.jtd = window.jtd || {});

{% include js/custom.js %}
