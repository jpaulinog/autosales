import Typed from 'typed.js';
import 'flexslider';
import 'jquery.cookie';
import 'jquery.easing';
import 'owl.carousel';
import '../util/Affix';
import '../util/HoverDir';

export default {
  init() {
    var $body = $("body");
    var $window = $(window);

    //hidding menu elements that do not fit in menu width
    //processing center logo
    function menuHideExtraElements() {
      //cleaneng changed elements
      $(".sf-more-li, .sf-logo-li").remove();
      var windowWidth = $("body").innerWidth();

      $(".sf-menu").each(function() {
        var $thisMenu = $(this);
        var $menuWraper = $thisMenu.closest(".top-nav");
        $menuWraper.attr("style", "");
        if (windowWidth > 1199) {
          //grab all main menu first level items
          var $menuLis = $menuWraper.find(".sf-menu > li");
          $menuLis.removeClass("sf-xl-hidden");

          var $headerLogoCenter = $thisMenu.closest(".header_logo_center");
          var logoWidth = 0;
          var summaryLiWidth = 0;

          if ($headerLogoCenter.length) {
            var $logo = $headerLogoCenter.find(".logo");
            // 30/2 - left and right margins
            logoWidth = $logo.outerWidth(true) + 70;
          }

          // var wrapperWidth = $('.sf-menu').width();
          var wrapperWidth = $menuWraper.outerWidth(true);
          $menuLis.each(function(index) {
            //4 - 4px additional width for inline-block LI element
            var elementWidth = $(this).outerWidth() + 4;
            summaryLiWidth += elementWidth;
            if (summaryLiWidth >= wrapperWidth - logoWidth) {
              var $newLi = $('<li class="sf-more-li"><a>...</a><ul></ul></li>');
              $($menuLis[index - 1]).before($newLi);
              var newLiWidth = $($newLi).outerWidth(true);
              var $extraLiElements = $menuLis.filter(
                ":gt(" + (index - 2) + ")"
              );
              $extraLiElements.clone().appendTo($newLi.find("ul"));
              $extraLiElements.addClass("sf-xl-hidden");
              return false;
            }
          });

          //processing center logo
          if ($headerLogoCenter.length) {
            var $menuLisVisible = $headerLogoCenter.find(
              ".sf-menu > li:not(.sf-xl-hidden)"
            );
            var menuLength = $menuLisVisible.length;
            var summaryLiVisibleWidth = 0;
            $menuLisVisible.each(function() {
              summaryLiVisibleWidth += $(this).outerWidth();
            });

            var centerLi = Math.floor(menuLength / 2);
            if (menuLength % 2 === 0) {
              centerLi--;
            }
            var $liLeftFromLogo = $menuLisVisible.eq(centerLi);
            $liLeftFromLogo.after(
              '<li class="sf-logo-li"><a href="#">&nbsp;</a></li>'
            );
            $headerLogoCenter.find(".sf-logo-li").width(logoWidth);
            var liLeftRightDotX =
              $liLeftFromLogo.offset().left + $liLeftFromLogo.outerWidth();
            var logoLeftDotX = windowWidth / 2 - logoWidth / 2;
            var menuLeftOffset = liLeftRightDotX - logoLeftDotX;
            $menuWraper.css({ left: -menuLeftOffset });
          }
        } // > 991
      }); //sf-menu each
    } //menuHideExtraElements

    function initMegaMenu(timeOut) {
      var $megaMenu = $(".top-nav .mega-menu");
      if ($megaMenu.length) {
        setTimeout(function() {
          var windowWidth = $("body").innerWidth();
          if (windowWidth > 991) {
            $megaMenu.each(function() {
              var $thisMegaMenu = $(this);
              //temporary showing mega menu to proper size calc
              $thisMegaMenu.css({ display: "block", left: "auto" });

              //checking for sticked side header
              var stickedSideHeaderWidth = 0;
              var $stickedSideHeader = $(".header_side_sticked");
              if (
                $stickedSideHeader.length &&
                $stickedSideHeader.hasClass("active-slide-side-header")
              ) {
                stickedSideHeaderWidth = $stickedSideHeader.outerWidth(true);
                if ($stickedSideHeader.hasClass("header_side_right")) {
                  stickedSideHeaderWidth = -stickedSideHeaderWidth;
                }
                windowWidth = windowWidth - stickedSideHeaderWidth;
              }
              var thisWidth = $thisMegaMenu.outerWidth();
              var thisOffset =
                $thisMegaMenu.offset().left - stickedSideHeaderWidth;
              var thisLeft = thisOffset + thisWidth / 2 - windowWidth / 2;
              $thisMegaMenu.css({ left: -thisLeft, display: "none" });
              if (!$thisMegaMenu.closest("ul").hasClass("nav")) {
                $thisMegaMenu.css("left", "");
              }
            });
          }
        }, timeOut);
      }
    }

    function initGoogleMap() {
      //Google Map script
      var $googleMaps = $("#map, .page_map");
      if ($googleMaps.length) {
        $googleMaps.each(function() {
          var $map = $(this);

          var lat;
          var lng;
          var map;

          //map styles. You can grab different styles on https://snazzymaps.com/

          //dark style
          //var styles = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#707070"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#be2026"},{"lightness":"0"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"hue":"#ff000a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"saturation":"-52"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];

          // light style
          var styles = [
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#ffffff" }, { lightness: 17 }]
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                { color: "#ffffff" },
                { lightness: 29 },
                { weight: 0.2 }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 18 }]
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }, { lightness: 16 }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#dedede" }, { lightness: 21 }]
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                { visibility: "on" },
                { color: "#ffffff" },
                { lightness: 16 }
              ]
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                { saturation: 36 },
                { color: "#333333" },
                { lightness: 40 }
              ]
            },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [{ color: "#fefefe" }, { lightness: 20 }]
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                { color: "#fefefe" },
                { lightness: 17 },
                { weight: 1.2 }
              ]
            }
          ];

          //markers
          var $markers = $map.find(".marker");

          //map settings
          var address = $markers
            .first()
            .find(".marker-address")
            .text()
            ? $markers
                .first()
                .find(".marker-address")
                .text()
            : "london, baker street, 221b";
          var geocoder = new google.maps.Geocoder();

          var draggable = $map.data("draggable")
            ? $map.data("draggable")
            : false;
          var scrollwheel = $map.data("scrollwheel")
            ? $map.data("scrollwheel")
            : false;

          //type your address after "address="
          geocoder.geocode(
            {
              address: address
            },
            function(data) {
              lat = data[0].geometry.location.lat();
              lng = data[0].geometry.location.lng();

              var center = new google.maps.LatLng(lat, lng);
              var settings = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 16,
                draggable: draggable,
                scrollwheel: scrollwheel,
                center: center,
                styles: styles
              };
              map = new google.maps.Map($map[0], settings);

              var infoWindows = [];

              $($markers).each(function(index) {
                var $marker = $(this);
                var markerTitle = $marker.find(".marker-title").text();

                //building info widnow HTML code
                var markerDescription = "";
                markerDescription += markerTitle
                  ? '<h3 class="makret-title">' + markerTitle + "</h3>"
                  : "";
                markerDescription += $marker.find(".marker-description").html()
                  ? '<div class="marker-description">' +
                    $marker.find(".marker-description").html() +
                    "</div>"
                  : "";
                if (markerDescription) {
                  markerDescription =
                    '<div class="map_marker_description">' +
                    markerDescription +
                    "</div>";
                }

                geocoder.geocode(
                  {
                    address: $marker.find(".marker-address").text()
                  },
                  function(data) {
                    var iconSrc = $marker.find(".marker-icon").attr("src");

                    var lat = data[0].geometry.location.lat();
                    var lng = data[0].geometry.location.lng();

                    var center = new google.maps.LatLng(lat, lng);

                    var marker = new google.maps.Marker({
                      position: center,
                      title: markerTitle,
                      map: map,
                      icon: iconSrc
                    });

                    var infowindow = new google.maps.InfoWindow({
                      content: markerDescription
                    });

                    infoWindows.push(infowindow);

                    google.maps.event.addListener(marker, "click", function() {
                      for (var i = 0; i < infoWindows.length; i++) {
                        infoWindows[i].close();
                      }
                      infowindow.open(map, marker);
                    });
                  }
                );
              });
            }
          );
        }); //each Google map
      } //google map length
    }
    window.initGoogleMap = initGoogleMap;

    //function that initiating template plugins on window.load event
    function documentReadyInit() {
      ////////////
      //mainmenu//
      ////////////
      if ($().scrollbar) {
        $('[class*="scrollbar-"]').scrollbar();
      }
      if ($().superfish) {
        $("ul.sf-menu").superfish({
          popUpSelector: "ul:not(.mega-menu ul), .mega-menu ",
          delay: 700,
          animation: { opacity: "show", marginTop: 10 },
          animationOut: { opacity: "hide", marginTop: 20 },
          speed: 200,
          speedOut: 200,
          disableHI: false,
          cssArrows: true,
          autoArrows: true,
          onInit: function() {
            var $thisMenu = $(this);
            $thisMenu
              .find(".sf-with-ul")
              .after('<span class="sf-menu-item-mobile-toggler"/>');
            $thisMenu
              .find(".sf-menu-item-mobile-toggler")
              .on("click", function(e) {
                var $parentLi = $(this).parent();
                if ($parentLi.hasClass("sfHover")) {
                  $parentLi.superfish("hide");
                } else {
                  $parentLi.superfish("show");
                }
              });
          }
        });
        $("ul.sf-menu-side").superfish({
          popUpSelector: "ul:not(.mega-menu ul), .mega-menu ",
          delay: 500,
          animation: { opacity: "show", height: 100 + "%" },
          animationOut: { opacity: "hide", height: 0 },
          speed: 400,
          speedOut: 300,
          disableHI: false,
          cssArrows: true,
          autoArrows: true
        });
      }

      //toggle mobile menu
      $(".page_header .toggle_menu, .page_toplogo .toggle_menu").on(
        "click",
        function() {
          $(this)
            .toggleClass("mobile-active")
            .closest(".page_header")
            .toggleClass("mobile-active")
            .end()
            .closest(".page_toplogo")
            .next()
            .find(".page_header")
            .toggleClass("mobile-active");
        }
      );

      $(".sf-menu a").on("click", function() {
        var $this = $(this);
        //If this is a local link or item with sumbenu - not toggling menu
        if (
          $this.hasClass("sf-with-ul") ||
          !($this.attr("href").charAt(0) === "#")
        ) {
          return;
        }
        $this
          .closest(".page_header")
          .toggleClass("mobile-active")
          .find(".toggle_menu")
          .toggleClass("mobile-active");
      });

      //side header processing
      var $sideHeader = $(".page_header_side");
      // toggle sub-menus visibility on menu-click
      $("ul.menu-click")
        .find("li")
        .each(function() {
          var $thisLi = $(this);
          //toggle submenu only for menu items with submenu
          if ($thisLi.find("ul").length) {
            $thisLi
              .append('<span class="toggle_submenu color-darkgrey"></span>')
              //adding anchor
              .find(".toggle_submenu, > a")
              .on("click", function(e) {
                var $thisSpanOrA = $(this);
                //if this is a link and it is already opened - going to link
                if (
                  $thisSpanOrA.attr("href") === "#" ||
                  !$thisSpanOrA.parent().hasClass("active-submenu")
                ) {
                  e.preventDefault();
                }
                if ($thisSpanOrA.parent().hasClass("active-submenu")) {
                  $thisSpanOrA.parent().removeClass("active-submenu");
                  return;
                }
                $thisLi
                  .addClass("active-submenu")
                  .siblings()
                  .removeClass("active-submenu");
              });
          } //eof sumbenu check
        });
      if ($sideHeader.length) {
        $(".toggle_menu_side").on("click", function() {
          var $thisToggler = $(this);
          $thisToggler.toggleClass("active");
          if ($thisToggler.hasClass("header-slide")) {
            $sideHeader.toggleClass("active-slide-side-header");
          } else {
            if ($thisToggler.parent().hasClass("header_side_right")) {
              $body.toggleClass("active-side-header slide-right");
            } else {
              $body.toggleClass("active-side-header");
            }
            $body.parent().toggleClass("html-active-push-header");
          }
          //fixing mega menu and aside affix on toggling side sticked header
          if ($thisToggler.closest(".header_side_sticked").length) {
            initMegaMenu(600);
            var $affixAside = $(".affix-aside");
            if ($affixAside.length) {
              $affixAside
                .removeClass("affix affix-bottom")
                .addClass("affix-top")
                .css({ width: "", left: "" })
                .trigger("affix-top.bs.affix");
              setTimeout(function() {
                $affixAside
                  .removeClass("affix affix-bottom")
                  .addClass("affix-top")
                  .css({ width: "", left: "" })
                  .trigger("affix-top.bs.affix");
              }, 10);
            }
          }
        });
        //hidding side header on click outside header
        $body.on("mousedown touchstart", function(e) {
          if (
            !$(e.target).closest(".page_header_side").length &&
            !$sideHeader.hasClass("header_side_sticked")
          ) {
            $sideHeader.removeClass("active-slide-side-header");
            $body.removeClass("active-side-header slide-right");
            $body.parent().removeClass("html-active-push-header");
            var $toggler = $(".toggle_menu_side");
            if ($toggler.hasClass("active")) {
              $toggler.removeClass("active");
            }
          }
        });
      } //sideHeader check

      //1 and 2/3/4th level offscreen fix
      var MainWindowWidth = $window.width();
      $window.on("resize", function() {
        MainWindowWidth = $(window).width();
      });
      //2/3/4 levels
      $(".top-nav .sf-menu")
        .on("mouseover", "ul li", function() {
          // $('.mainmenu').on('mouseover', 'ul li', function(){
          if (MainWindowWidth > 991) {
            var $this = $(this);
            // checks if third level menu exist
            var subMenuExist = $this.find("ul").length;
            if (subMenuExist > 0) {
              var subMenuWidth = $this
                .find("ul, div")
                .first()
                .width();
              var subMenuOffset =
                $this
                  .find("ul, div")
                  .first()
                  .parent()
                  .offset().left + subMenuWidth;
              // if sub menu is off screen, give new position
              if (subMenuOffset + subMenuWidth > MainWindowWidth) {
                var newSubMenuPosition = subMenuWidth + 0;
                $this
                  .find("ul, div")
                  .first()
                  .css({
                    left: -newSubMenuPosition
                  });
              } else {
                $this
                  .find("ul, div")
                  .first()
                  .css({
                    left: "145%"
                  });
              }
            }
          }
          //1st level
        })
        .on("mouseover", "> li", function() {
          if (MainWindowWidth > 991) {
            var $this = $(this);
            var subMenuExist = $this.find("ul").length;
            if (subMenuExist > 0) {
              var subMenuWidth = $this.find("ul").width();
              var subMenuOffset = $this
                .find("ul")
                .parent()
                .offset().left;
              // if sub menu is off screen, give new position
              if (subMenuOffset + subMenuWidth > MainWindowWidth) {
                var newSubMenuPosition =
                  MainWindowWidth - (subMenuOffset + subMenuWidth);
                $this
                  .find("ul")
                  .first()
                  .css({
                    left: newSubMenuPosition
                  });
              }
            }
          }
        });

      /////////////////////////////////////////
      //single page localscroll and scrollspy//
      /////////////////////////////////////////
      var navHeight = $(".page_header").outerHeight(true);
      //if sidebar nav exists - binding to it. Else - to main horizontal nav
      if ($(".mainmenu_side_wrapper").length) {
        $body.scrollspy({
          target: ".mainmenu_side_wrapper",
          offset: navHeight
        });
      } else if ($(".top-nav").length) {
        $body.scrollspy({
          target: ".top-nav",
          offset: navHeight
        });
      }
      if ($().localScroll) {
        $(
          ".top-nav > ul, .mainmenu_side_wrapper > ul, #land,  .comments-link"
        ).localScroll({
          duration: 900,
          easing: "easeInOutQuart",
          offset: -navHeight + 40
        });
      }

      //background image teaser and sections with half image bg
      //put this before prettyPhoto init because image may be wrapped in prettyPhoto link
      $(".bg_teaser, .cover-image").each(function() {
        var $element = $(this);
        var $image = $element.find("img").first();
        if (!$image.length) {
          $image = $element
            .parent()
            .find("img")
            .first();
        }
        if (!$image.length) {
          return;
        }
        var imagePath = $image.attr("src");
        $element.css("background-image", "url(" + imagePath + ")");
        var $imageParent = $image.parent();
        //if image inside link - adding this link, removing gallery to preserve duplicating gallery items
        if ($imageParent.is("a")) {
          $element.prepend(
            $image
              .parent()
              .clone()
              .html("")
          );
          $imageParent.attr("data-gal", "");
        }
      });

      //video images preview - from WP
      $(".embed-placeholder").each(function() {
        $(this).on("click", function(e) {
          var $thisLink = $(this);
          // if prettyPhoto popup with YouTube - return
          if ($thisLink.attr("data-gal")) {
            return;
          }
          e.preventDefault();
          if ($thisLink.attr("href") === "" || $thisLink.attr("href") === "#") {
            $thisLink
              .replaceWith(
                $thisLink
                  .data("iframe")
                  .replace(/&amp/g, "&")
                  .replace(/$lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/$quot;/g, '"')
              )
              .trigger("click");
          } else {
            $thisLink.replaceWith(
              '<iframe class="embed-responsive-item" src="' +
                $thisLink.attr("href") +
                "?rel=0&autoplay=1" +
                '"></iframe>'
            );
          }
        });
      });

      //toTop
      if ($().UItoTop) {
        $().UItoTop({ easingType: "easeInOutQuart" });
      }

      //parallax
      if ($().parallax) {
        $(".s-parallax").parallax("50%", 0.01);
      }

    }

    //function that initiating template plugins on window.load event
    function windowLoadInit() {
      //////////////
      //flexslider//
      //////////////
      if ($().flexslider) {
        var $introSlider = $(".page_slider .flexslider");
        $introSlider.each(function(index) {
          var $currentSlider = $(this);
          var data = $currentSlider.data();
          var nav = data.nav !== "undefined" ? data.nav : true;
          var dots = data.dots !== "undefined" ? data.dots : true;
          var speed = data.speed !== "undefined" ? data.speed : 7000;

          $currentSlider.flexslider({
            animation: "fade",
            pauseOnHover: true,
            useCSS: true,
            controlNav: dots,
            directionNav: nav,
            prevText: "",
            nextText: "",
            smoothHeight: false,
            slideshowSpeed: speed,
            animationSpeed: 600,
            start: function(slider) {
              slider
                .find(".intro_layers")
                .children()
                .css({ visibility: "hidden" });
              slider
                .find(".flex-active-slide .intro_layers")
                .children()
                .each(function(index) {
                  var self = $(this);
                  var animationClass = !self.data("animation")
                    ? "fadeInRight"
                    : self.data("animation");
                  setTimeout(function() {
                    self.addClass("animated " + animationClass);
                  }, index * 250);
                });
            },
            after: function(slider) {
              slider
                .find(".flex-active-slide .intro_layers")
                .children()
                .each(function(index) {
                  var self = $(this);
                  var animationClass = !self.data("animation")
                    ? "fadeInRight"
                    : self.data("animation");
                  setTimeout(function() {
                    self.addClass("animated " + animationClass);
                  }, index * 250);
                });
            },
            end: function(slider) {
              slider
                .find(".intro_layers")
                .children()
                .each(function() {
                  var self = $(this);
                  var animationClass = !self.data("animation")
                    ? "fadeInRight"
                    : self.data("animation");
                  self
                    .removeClass("animated " + animationClass)
                    .css({ visibility: "hidden" });
                  // $(this).attr('class', '');
                });
            }
          });
          //wrapping nav with container - uncomment if need
          // .find('.flex-control-nav')
          // .wrap('<div class="container nav-container"/>')
        }); //.page_slider flex slider

        $(".flexslider").each(function(index) {
          var $currentSlider = $(this);
          //exit if intro slider already activated
          if ($currentSlider.find(".flex-active-slide").length) {
            return;
          }
          $currentSlider.flexslider({
            animation: "fade",
            useCSS: true,
            controlNav: true,
            directionNav: false,
            prevText: "",
            nextText: "",
            smoothHeight: false,
            slideshowSpeed: 5000,
            animationSpeed: 800
          });
        });
      }

      ////////////////
      //owl carousel//
      ////////////////
      if ($().owlCarousel) {
        $(".owl-carousel").each(function() {
          var $carousel = $(this);
          $carousel.find("> *").each(function(i) {
            $(this).attr("data-index", i);
          });
          var data = $carousel.data();

          var loop = data.loop ? data.loop : false,
            margin = data.margin || data.margin === 0 ? data.margin : 30,
            nav = data.nav ? data.nav : false,
            navPrev = data.navPrev ? data.navPrev : '<i class="ico-back">',
            navNext = data.navNext ? data.navNext : '<i class="ico-next">',
            dots = data.dots ? data.dots : false,
            themeClass = data.themeclass ? data.themeclass : "owl-theme",
            center = data.center ? data.center : false,
            items = data.items ? data.items : 4,
            autoplay = data.autoplay ? data.autoplay : false,
            responsiveXs = data.responsiveXs ? data.responsiveXs : 1,
            responsiveSm = data.responsiveSm ? data.responsiveSm : 2,
            responsiveMd = data.responsiveMd ? data.responsiveMd : 3,
            responsiveLg = data.responsiveLg ? data.responsiveLg : 4,
            draggable = data.draggable === false ? data.draggable : true,
            syncedClass = data.syncedClass ? data.syncedClass : false,
            filters = data.filters ? data.filters : false;

          if (filters) {
            $carousel.after(
              $carousel.clone().addClass("owl-carousel-filter-cloned")
            );
            $(filters).on("click", "a", function(e) {
              //processing filter link
              e.preventDefault();
              if ($(this).hasClass("selected")) {
                return;
              }
              var filterValue = $(this).attr("data-filter");
              $(this)
                .siblings()
                .removeClass("selected active");
              $(this).addClass("selected active");

              //removing old items
              for (
                var i = $carousel.find(".owl-item").length - 1;
                i >= 0;
                i--
              ) {
                $carousel.trigger("remove.owl.carousel", [1]);
              }

              //adding new items
              var $filteredItems = $(
                $carousel
                  .next()
                  .find(" > " + filterValue)
                  .clone()
              );
              $filteredItems.each(function() {
                $carousel.trigger("add.owl.carousel", $(this));
                $(this).addClass("scaleAppear");
              });

              $carousel.trigger("refresh.owl.carousel");

              //reinit prettyPhoto in filtered OWL carousel
              if ($().prettyPhoto) {
                $carousel.find("a[data-gal^='prettyPhoto']").prettyPhoto({
                  hook: "data-gal",
                  theme:
                    "facebook" /* light_rounded / dark_rounded / light_square / dark_square / facebook / pp_default*/
                });
              }
            });
          } //filters

          $carousel
            .owlCarousel({
              loop: loop,
              margin: margin,
              nav: nav,
              autoplay: autoplay,
              dots: dots,
              themeClass: themeClass,
              center: center,
              navText: [navPrev, navNext],
              mouseDrag: draggable,
              touchDrag: draggable,
              items: items,
              responsive: {
                0: {
                  items: responsiveXs
                },
                767: {
                  items: responsiveSm
                },
                992: {
                  items: responsiveMd
                },
                1200: {
                  items: responsiveLg
                }
              }
            })
            .addClass(themeClass);
          if (center) {
            $carousel.addClass("owl-center");
          }

          $window.on("resize", function() {
            $carousel.trigger("refresh.owl.carousel");
          });

          //topline two synced carousels
          if ($carousel.hasClass("owl-news-slider-items") && syncedClass) {
            $carousel.on("changed.owl.carousel", function(e) {
              var indexTo = loop ? e.item.index + 1 : e.item.index;
              $(syncedClass).trigger("to.owl.carousel", [indexTo]);
            });
          }
        });
      } //eof owl-carousel

      ////////////////////
      //header processing/
      ////////////////////
      //stick header to top
      //wrap header with div for smooth sticking
      var $header = $(".page_header").first();
      var boxed = $header.closest(".boxed").length;
      var headerSticked = $(".header_side_sticked").length;
      if ($header.length) {
        //hiding main menu 1st levele elements that do not fit width
        menuHideExtraElements();
        //mega menu
        initMegaMenu(1);
        //wrap header for smooth stick and unstick
        var headerHeight = $header.outerHeight();
        $header.wrap('<div class="page_header_wrapper"></div>');
        var $headerWrapper = $(".page_header_wrapper");
        if (!boxed) {
          $headerWrapper.css({ height: headerHeight });
        }

        //headerWrapper background - same as header
        if ($header.hasClass("ls")) {
          $headerWrapper.addClass("ls");
          if ($header.hasClass("ms")) {
            $headerWrapper.addClass("ms");
          }
        } else if ($header.hasClass("ds")) {
          $headerWrapper.addClass("ds");
          if ($header.hasClass("bs")) {
            $headerWrapper.addClass("bs");
          }
          if ($header.hasClass("ms")) {
            $headerWrapper.addClass("ms");
          }
        } else if ($header.hasClass("cs")) {
          $headerWrapper.addClass("cs");
          if ($header.hasClass("cs2")) {
            $headerWrapper.addClass("cs2");
          }
          if ($header.hasClass("cs3")) {
            $headerWrapper.addClass("cs3");
          }
        } else if ($header.hasClass("gradient-background")) {
          $headerWrapper.addClass("gradient-background");
        }

        //get offset
        var headerOffset = 0;
        //check for sticked template headers
        if (!boxed && !($headerWrapper.css("position") === "fixed")) {
          headerOffset = $header.offset().top;
        }

        //for boxed layout - show or hide main menu elements if width has been changed on affix
        $header.on(
          "affixed-top.bs.affix affixed.bs.affix affixed-bottom.bs.affix",
          function(e) {
            if ($header.hasClass("affix-top")) {
              $headerWrapper
                .removeClass("affix-wrapper affix-bottom-wrapper")
                .addClass("affix-top-wrapper");
              //cs to ls when affixed
              // if($header.hasClass('cs')) {
              //  $header.removeClass('ls');
              // }
            } else if ($header.hasClass("affix")) {
              $headerWrapper
                .removeClass("affix-top-wrapper affix-bottom-wrapper")
                .addClass("affix-wrapper");
              //cs to ls when affixed
              // if($header.hasClass('cs')) {
              //  $header.addClass('ls');
              // }
            } else if ($header.hasClass("affix-bottom")) {
              $headerWrapper
                .removeClass("affix-wrapper affix-top-wrapper")
                .addClass("affix-bottom-wrapper");
            } else {
              $headerWrapper.removeClass(
                "affix-wrapper affix-top-wrapper affix-bottom-wrapper"
              );
            }

            //calling this functions disable menu items animation when going from affix to affix-top with centered logo inside
            //in boxed layouts header is always fixed
            if (boxed && !($header.css("position") === "fixed")) {
              menuHideExtraElements();
              initMegaMenu(1);
            }
            if (headerSticked) {
              initMegaMenu(1);
            }
          }
        );

        //if header has different height on afixed and affixed-top positions - correcting wrapper height
        $header.on("affixed-top.bs.affix", function() {
          // $headerWrapper.css({height: $header.outerHeight()});
        });

        //fixing auto affix bug - toggle affix on click when page is at the top
        $header.on("affix.bs.affix", function() {
          if (!$window.scrollTop()) return false;
        });

        $header.affix({
          offset: {
            top: headerOffset,
            bottom: -10
          }
        });
      }

      $body.scrollspy("refresh");

      //Unyson or other messages modal
      var $messagesModal = $("#messages_modal");
      if ($messagesModal.find("ul").length) {
        $messagesModal.modal("show");
      }

      //page preloader
      $(".preloaderimg").fadeOut(100);
      $(".preloader")
        .fadeOut(100)
        .delay(50, function() {
          $(this).remove();
        });
    } //eof windowLoadInit

    $(document).ready(function() {
      documentReadyInit();
      initGoogleMap();
    });

    $window.on("load", function() {
      windowLoadInit();
    }); //end of "window load" event

    $window.on("resize", function() {
      $body.scrollspy("refresh");

      //header processing
      menuHideExtraElements();
      initMegaMenu(1);
      var $header = $(".page_header").first();
      //checking document scrolling position
      if (
        $header.length &&
        !$(document).scrollTop() &&
        $header.first().data("bs.affix")
      ) {
        $header
          .first()
          .data("bs.affix").options.offset.top = $header.offset().top;
      }
      if (!$header.closest(".boxed").length) {
        var affixed = false;
        if ($header.hasClass("affix")) {
          affixed = true;
          //animation duration
          $header.removeClass("affix");

          //TODO fix header wrapper height from small to large when page is scrolled (not top)
          setTimeout(function() {
            //editing header wrapper height for smooth stick and unstick
            $(".page_header_wrapper").css({
              height: $header.first().outerHeight()
            });
            $header.addClass("affix");
          }, 250);
        }

        if (!affixed) {
          //editing header wrapper height for smooth stick and unstick
          $(".page_header_wrapper").css({
            height: $header.first().outerHeight()
          });
        }
      }
    });

    //direction gallery
    $(function() {
      $(" #gallery-direction > .gallery-hover").hoverdir();
    });
    if (typeof Typed !== undefined && $("#typed").length) {
      //typed.js
      var typed = new Typed("#typed", {
        stringsElement: "#typed-strings",
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 500,
        startDelay: 1000,
        loop: true
      });
    }

    //end of IIFE function
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  }
};
