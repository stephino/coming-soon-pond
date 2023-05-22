/**
 * Copyright 2013 Stephino
 */
$(document).ready(function(){
    "use strict";
    var intval = function (mixed_var, base) {var tmp;var type = typeof(mixed_var);if (type === 'boolean') {return +mixed_var;} else if (type === 'string') {tmp = parseInt(mixed_var, base || 10);return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;} else if (type === 'number' && isFinite(mixed_var)) {return mixed_var | 0;} else {return 0;}};
    var rand = function(numLow, numHigh) {var adjustedHigh = (parseFloat(numHigh) - parseFloat(numLow)) + 1;return Math.floor(Math.random()*adjustedHigh) + parseFloat(numLow);};
    jQuery.fn.outerHTML = function() {return jQuery('<div />').append(this.eq(0).clone()).html();};
    
    // Define the main class
    var Pond = function() {
        var _this = this;
        var options = {};
            
        // Initiate the project
        this.init = function() {
            // Initialize the options
            this.initOptions();
            
            // Implement the custom background
            this.customBackground('#page_wrap');
            
            // Prepare the social icons
            this.socialIcons();
            
            // Keep the holder centered
            this.keepHolderCentered();
            
            // Load the ripples
            this.loadRipples();
            
        };
        
        // Keep the holder centered
        this.keepHolderCentered = function(lastHeight) {
            window.setTimeout(function(){
                var computedMarginTop;
                var top;
                var currentMarginTop;
                if ($(window).height() >= $('.mainTab > div').height()) {
                    computedMarginTop = -($('.mainTab > div').outerHeight() / 2);
                    top = '50%';
                    $('body').css('overflowY', 'hidden');
                    $('#page_wrap').css({height: '100%'});
                } else {
                    computedMarginTop = 0;
                    top = '0%';
                    $('body').css('overflowY', 'scroll');
                    $('#page_wrap').css({height: intval($('.mainTab > div').height()) + 'px'});
                }
                
                // Get the current top margin
                currentMarginTop = intval($('.mainTab > div').css('marginTop'));
                
                if (computedMarginTop !== currentMarginTop) {
                    if (!$('.mainTab > div').data('animating')) {
                        $('.mainTab > div').data('animating', true).animate({
                            marginTop: computedMarginTop,
                            top: top,
                        }, {
                            duration: 500,
                            complete: function(){
                                $('.mainTab > div').data('animating', false);
                            }
                        });
                    }
                }
                                                    
                // Resize the parent
                if ($('.page').length) {
                    var activePage = $('.page.active');
                    var activePageParent = activePage.parent();
                    
                    // Need to update?
                    if (activePageParent.height() !== activePage.height() + 20) {
                        activePageParent.css({height:activePage.height() + 20});
                    }
                }
                
                _this.keepHolderCentered(lastHeight);
            }, 300);
        };
        
        this.animateText = function(holder, text, duration, fnc) {
            // Get the array
            var textArray = text.split('');
            
            // Get the array length
            var textLength = text.length;
            
            // Create the text holder
            var textHolder = $('<span></span>');
            
            // Append the textholder to the actual holder
            $(holder).append(textHolder);
            
            // For the entire duration of the animation, add the letters
            $.each(textArray, function(k, v){
                window.setTimeout(function(){
                    textHolder.html(text.substring(0, k) + v);
                }, duration / textLength * k);
            });
            
            window.setTimeout(function(){
                if (typeof fnc === 'function') {
                    fnc(textHolder);
                }
                textHolder.replaceWith(textHolder.html()+'<br/>');
            }, duration+100);
        };
        
        this.socialIcons = function() {
            var translations = {
                'youtube': "&#xe000;",
                'yandex': "&#xe001;",
                'vkontakte': "&#xe002;",
                'vk': "&#xe003;",
                'vimeo': "&#xe004;",
                'twitter': "&#xe005;",
                'tumblr': "&#xe006;",
                'steam': "&#xe007;",
                'stackoverflow': "&#xe008;",
                'soundcloud': "&#xe009;",
                'skype': "&#xe00a;",
                'share': "&#xe00b;",
                'rss': "&#xe00c;",
                'readability': "&#xe00d;",
                'read-it-Later': "&#xe00e;",
                'pocket': "&#xe00f;",
                'pinterest': "&#xe010;",
                'picasa': "&#xe011;",
                'openid': "&#xe012;",
                'myspace': "&#xe013;",
                'moikrug': "&#xe014;",
                'linked-in': "&#xe015;",
                'lifejournal': "&#xe016;",
                'lastfm': "&#xe017;",
                'jabber': "&#xe018;",
                'instapaper': "&#xe019;",
                'habrahabr': "&#xe01a;",
                'google': "&#xe01b;",
                'github-octoface': "&#xe01c;",
                'github-circle': "&#xe01d;",
                'foursquare': "&#xe01e;",
                'flickr': "&#xe01f;",
                'flattr': "&#xe020;",
                'facebook': "&#xe021;",
                'evernote': "&#xe022;",
                'email': "&#xe023;",
                'dropbox': "&#xe024;",
                'blogspot': "&#xe025;",
                'bitbucket': "&#xe026;",
                'youtube-play': "&#xe027;",
            };
            if ($('.social').length) {
                $.each($('.social'), function(){
                    // Get the class name
                    var className = $(this).attr('class').replace(/social\s*/g, '');
                    var title = $(this).html();
                    
                    // Translation available?
                    if (typeof translations[className] !== 'undefined') {
                        $(this).html(translations[className]).css({
                            backgroundColor: options.color
                        }).attr('title', title);
                    }
                });
            }
        };
        
        // Load the options
        this.initOptions = function() {
            var userOptions = {
                numberOfRipples: ($('#page_wrap').attr('data-ripples') ? intval($('#page_wrap').attr('data-ripples')) : 15),
                speed: ($('#page_wrap').attr('data-speed') ? intval($('#page_wrap').attr('data-speed')) : 4000),
                textSpeed: ($('#page_wrap').attr('data-text-speed') ? intval($('#page_wrap').attr('data-text-speed')) : 3000),
                effect: ($('#page_wrap').attr('data-effect') ? $('#page_wrap').attr('data-effect') : 'easeInBounce'),
                color: ($('#page_wrap').attr('data-color') ? $('#page_wrap').attr('data-color') : '#FF565C'),
                percent: ($('#page_wrap').attr('data-percent') ? intval($('#page_wrap').attr('data-percent')) : 50),
                pattern: ($('#page_wrap').attr('data-pattern') ? $('#page_wrap').attr('data-pattern') : ''),
                title: $('.mainTab > div .title').html(),
                dialogs: [],
            };
            
            // Add the dialogs
            $.each($('.mainTab > div .content > p'), function(){
                userOptions.dialogs[userOptions.dialogs.length] = $(this).html();
            });
            
            // Cleanup the title div
            $('.mainTab > div .title').html('');
            
            // Cleanup the content div
            $('.mainTab > div .content').html('');
            
            // Hide the footer
            $('.mainTab > div .footer').css({display: 'none'});
            
            // Invalid number of ripples? Revert to the default
            if (userOptions.numberOfRipples <= 0 || userOptions.numberOfRipples >= 50) {
                userOptions.numberOfRipples = 15;
            }
        
            // Invalid speed? Revert to the default
            if (userOptions.speed <= 0 || userOptions.speed >= 20000) {
                userOptions.speed = 4000;
            }
        
            // Invalid percent? Revert to the default
            if (userOptions.percent < 0 || userOptions.percent > 100) {
                userOptions.percent = 50;
            }
            
            // Invalid effect
            if (-1 === $.inArray(userOptions.effect, ['easeInBounce', 'easeInExpo', 'linear'])) {
                userOptions.effect = 'easeInBounce';
            }
            
            // Get the options
            $.extend(options, userOptions);
        };
        
        this.parallax = function(className) {
            $('html').off("mousemove").on('mousemove', function(e){
                // Get the window width
                var windowWidth = $(window).width();
                
                // Get the window height
                var windowHeight = $(window).height();
                
                // Get x percent
                var xPercent = (e.clientX / windowWidth * 100);
                
                // Get y percent
                var yPercent = (e.clientY / windowHeight * 100);
                
                xPercent = 40 + xPercent / 100 * 20;
                yPercent = 80 + yPercent / 100 * 20;
                
                // Get all the items
                var allItems = $('.' + className);
                if (allItems.length) {
                    allItems.css({
                        backgroundPosition: xPercent + '% ' + yPercent + '%'
                    });
                }
            });
        };
        
        this.showLogo = function() {
            // Display the tab
            $('.mainTab > div').animate({
                opacity: 1,
            }, {
                duration: 500
            });
            
            // Create the logo
            var logo = $('<div class="logo"></div>');
            $('.mainTab .title').prepend(logo).css({opacity: 1});
            $('.mainTab .content').css({opacity: 1});
            $(logo).animate({
                width: '100px',
                height: '100px',
            },{
                duration: 1000,
                complete: function() {
                    _this.animateText($('.mainTab .title'), options.title, options.textSpeed);
                    window.setTimeout(function(){
                        _this.showContent();
                    }, options.textSpeed);
                }
            });
        };
        
        this.showContent = function() {
            // Add the complete class to the content
            $('.mainTab > div').addClass('complete');
            this.customBackground('.mainTab > div.complete > .content');
            
            // Append the texts
            $.each(options.dialogs, function(k,v){
                window.setTimeout(function(){
                    _this.animateText($('.mainTab .content'), v, options.textSpeed, function(p){
                        $('b, em, strong', p).css({color: options.color});
                    });
                }, k * options.textSpeed);
            });
            
            // When everything is done, show the footer
            window.setTimeout(function(){
                _this.showFooter();
            }, options.textSpeed * options.dialogs.length);
         };
        
        this.showFooter = function() {
            // Show the footer
            $('.mainTab > div .footer').fadeIn('fast', function(){
                _this.showLoadingBar($(this));
            });
            
            // Create the slider
            this.createSlider();
        };
        
        this.createCountdown = function() {
            // Get the countdown
            var countdown = $('.content .page .countdown');
            
            var Letter = function() {
                var holders = [];
                
                this.createCells = function() {
                    var cell = '<div class="cell c1">' + 
                    '<div rel="0" class="bar b0"></div>' + 
                    '<div rel="1" class="bar b1"></div>' + 
                    '<div rel="2" class="bar b2"></div>' + 
                    '<div rel="3" class="bar b3"></div>' + 
                    '<div rel="4" class="bar b4"></div>' + 
                    '<div rel="5" class="bar b5"></div>' + 
                    '<div rel="6" class="bar b6"></div>' +
                    '</div>';
                    
                    return '<div class="cells">' + cell + cell.replace(/c1/, 'c2') + '</div>';
                };
                
                this.init = function(holder) {
                    // Create the inner cells
                    holder.html(this.createCells());
                    
                    // Append the tholder
                    holders[holder.attr('class')] = holder;
                };
                
                this.update = function(holder, number) {
                    // Check holder not initialized
                    if (typeof holders[holder.attr('class')] === 'undefined') {
                        this.init(holder);
                    }
                    
                    // Update the number
                    number = intval(number);
                    if (number > 99) {
                        number = 99;
                    }
                    
                    // Set the cells
                    var cell1 = 0, cell2 = number;
                    
                    if (number >= 10) {
                        cell1 = intval(number/10);
                        cell2 = number - cell1*10;
                    }
                    
                    this.activateCell(holder, 1, cell1);
                    this.activateCell(holder, 2, cell2);
                };
                
                this.activateCell = function(holder, cellNo, number) {
                    /**
                     *   ***0***
                     *  *       *
                     *  5       1
                     *  *       *
                     *   ***6***
                     *  *       *
                     *  4       2
                     *  *       *
                     *   ***3***
                     */
                    var numbers = {
                        0: [1, 1, 1, 1, 1, 1, 0],
                        1: [0, 1, 1, 0, 0, 0, 0],
                        2: [1, 1, 0, 1, 1, 0, 1],
                        3: [1, 1, 1, 1, 0, 0, 1],
                        4: [0, 1, 1, 0, 0, 1, 1],
                        5: [1, 0, 1, 1, 0, 1, 1],
                        6: [1, 0, 1, 1, 1, 1, 1],
                        7: [1, 1, 1, 0, 0, 0, 0],
                        8: [1, 1, 1, 1, 1, 1, 1],
                        9: [1, 1, 1, 1, 0, 1, 1],
                    };
                    $.each($('.cell.c' + cellNo + ' .bar', holder), function(){
                        // Get the integer value of this bar
                        var barInt = intval($(this).attr('rel'));
                        if (numbers[number][barInt]) {
                            $(this).addClass('active').css({backgroundColor: options.countdownColor});
                        } else {
                            $(this).removeClass('active').css({backgroundColor: 'transparent'});
                        }
                    });
                };
            };
            var letter = new Letter();
            
            // Get the date
            var date = countdown.attr('date');
            date = date.split('-');

            // Custom colors
            options.countdownColor = !countdown.attr('data-color') ? '#000000' : countdown.attr('data-color');

            // Invalid date format
            if (date.length !== 3) {return;}

            // Set the actual date
            date = new Date(intval(date[0]), intval(date[1]) - 1, intval(date[2]));
            
            // Add the necessary HTML
            countdown.html('<div class="container row-fluid">' +
                  '<div class="span2 col offset2">' +
                    '<div id="days" class="info"><span class="number d">1</span><p>days</p></div>' +
                  '</div>' +
                  '<div class="span2 col">' +
                    '<div id="hours" class="info"><span class="number h">1</span><p>hours</p></div>' +
                  '</div>' +
                  '<div class="span2 col">' +
                    '<div id="minutes" class="info"><span class="number m">1</span><p>minutes</p></div>' +
                  '</div>' +
                  '<div class="span2 col">' +
                    '<div id="seconds" class="info"><span class="number s">1</span><p>seconds</p></div>' +
                  '</div>' +
                '</div>');
                
            //counter update function
            var checkDate = function() {
                //get actually date
                var now = new Date();
                //get difference from launch date (declared in head in index.html)
                var diff = date.getTime() - now.getTime();

                //change multisecond result to seconds, minutes, hours and days
                var tmp = diff / 1000;
                var seconds = Math.floor(tmp % 60);
                tmp /= 60;
                var minutes = Math.floor(tmp % 60);
                tmp /= 60;
                var hours = Math.floor(tmp % 24);
                tmp /= 24;
                var days = Math.floor(tmp);
                
                // Show the initial clock
                if (!countdown.parents('.page').hasClass('active')) {
                    seconds = 0;
                    minutes = 0;
                    hours = 0;
                    days = 0;
                }
                
                //render in text
                letter.update($("#days .number"), days);
                letter.update($("#hours .number"), hours);
                letter.update($("#minutes .number"), minutes);
                letter.update($("#seconds .number"), seconds);
                
                var spelling = {
                    days:    [countdown.attr('day') ? countdown.attr('day') : "day", countdown.attr('days') ? countdown.attr('days') : "days"],
                    hours:   [countdown.attr('hour') ? countdown.attr('hour') : "hour", countdown.attr('hours') ? countdown.attr('hours') : "hours"],
                    minutes: [countdown.attr('minute') ? countdown.attr('minute') : "minute", countdown.attr('minutes') ? countdown.attr('minutes') : "minutes"],
                    seconds: [countdown.attr('second') ? countdown.attr('second') : "second", countdown.attr('seconds') ? countdown.attr('seconds') : "seconds"],
                };
                
                $("#days > p").html(days === 1 ? spelling.days[0] : spelling.days[1]);
                $("#hours > p").html(hours === 1 ? spelling.hours[0] : spelling.hours[1]);
                $("#minutes > p").html(minutes === 1 ? spelling.minutes[0] : spelling.minutes[1]);
                $("#seconds > p").html(seconds === 1 ? spelling.seconds[0] : spelling.seconds[1]);
            };
            
            //at start update counter
            checkDate();
            
            window.setInterval(function() {
                checkDate();
            }, 1000);
        };
        
        this.createSlider = function() {
            // Do this one time only
            if (!$('.content').data('slider-ready')) {
                // Hold the slides
                var pages = [];
                var currentPage = 0;
                
                // Add the first slide
                pages[0] = $('<div class="page active first">' + $('.content').html() + '</div>');
                $('.content').html('').prepend(pages[0]).css({height:pages[0].height() + 20});
                
                // Add the other slides
                $.each($('.slide'), function(){
                    pages[pages.length] = $('<div class="page">' + $(this).html() + '</div>');
                    $('.content').append(pages[pages.length-1]);
                });
                
                // Create the countdown
                this.createCountdown();
                
                // Add the previous, next buttons
                var prev = $('<div class="nav prev"></div>');
                var next = $('<div class="nav next"></div>');
                $('.content').prepend(prev).append(next);
                
                var hidePage = function(page, direction) {
                    page.removeClass('active').css({zIndex: 0});
                    if ('left' === direction) {
                        page.css({left: '0%'}).animate({
                            left: '-100%'
                        }, {
                            duration: options.speed/2
                        });
                    } else {
                        page.css({left: '0%'}).animate({
                            left: '100%'
                        }, {
                            duration: options.speed/2
                        });
                    }
                };
                
                var showPage = function(page, direction) {
                    page.addClass('active').css({zIndex:1});
                    page.parent().css({height:page.height()+20});
                    if ('left' === direction) {
                        page.css({left: '100%'}).animate({
                            left: '0%'
                        }, {
                            duration: options.speed/2
                        });
                    } else {
                        page.css({left: '-100%'}).animate({
                            left: '0%'
                        }, {
                            duration: options.speed/2
                        });
                    }
                };
                var resizePages = function() {
                    $.each(pages, function(k,v){
                        v.css({
                            width: (intval(v.parent().width()) - 40) + 'px'
                        });
                    });
                };
                resizePages();
                $(window).resize(resizePages);
                
                // Onclick events
                $('.content .nav').on('click', function(){
                    var slideDirection = 'left';
                    if ($(this).hasClass('prev')) {
                        slideDirection = 'right';
                        currentPage--;
                    }
                    if ($(this).hasClass('next')) {
                        currentPage++;
                    }
                    if (currentPage < 0) {
                        currentPage = pages.length -1;
                    }
                    if (currentPage > pages.length -1) {
                        currentPage = 0;
                    }
                    
                    // Navigate
                    resizePages();
                    hidePage($('.content .page.active'), slideDirection);
                    showPage(pages[currentPage], slideDirection);
                });
                
                // The slider is now ready
                $('.content').data('slider-ready', true);
                
                // Move to the next slide
                window.setTimeout(function(){next.click();}, 500);
                
                $('[title]').tooltip();
                $('.btn').css({background: options.color});
                _this.formValidation();
            }
        };
        
        // Form validation
        this.formValidation = function() {
            // Parse forms
            $('.submit.btn').on('click', function(){
                $(this).closest('form').submit();
            });
            $.each($('form.validate'), function(){
                $(this).validate({
                    submitHandler: function(form) {
                        var data = $(form).serializeArray();
                        var action = $(form).attr('action');
                        $.ajax({
                            method: 'post',
                            dataType: 'json',
                            url: action,
                            data: data,
                            success: function(d) {
                                // Prepare the message
                                var message = '';
                                $.each(d, function(k, m){
                                    var messageType = 'boolean' === $.type(m.status) ? (m.status?'success':'error') : m.status;
                                    message += '<div class="alert alert-'+messageType+'">'+m.message+'</div>';
                                });
                                // Replace the form with the message
                                $(form).replaceWith($(message));
                            },
                            error: function() {
                                var error = $('<div class="alert alert-error">Could not contact host. Please try again later.</div>');
                                $(form).replaceWith(error);
                            }
                        });
                    }
                });
            });
        };
        
        this.showLoadingBar = function(el) {
            // Prepare the loading bar
            var loadingBar = $('<div class="loading-bar" title="'+options.percent+'%"><div class="percent" style="background-color: '+options.color+';"></div></div>');
            
            // Prepend the loading bar
            $(el).prepend(loadingBar);
            
            // Animate the percent
            $('.percent', loadingBar).animate({
                width: options.percent + '%',
            }, {
                duration: options.speed
            });
        };
        
        // Implement the custom background
        this.customBackground = function(element) {
            if (options.pattern !== '') {
                $(element).css({
                    backgroundImage: $('#page_wrap').css('background-image').replace(/[^\/]*?(['"]\))$/g, options.pattern + "$1")
                });
            }
        };
        
        // Create the ripples
        this.loadRipples = function() {
            // Get the page dimensions
            var win = {
                width: $(window).width(),
                height: $(window).height(),
            }, ripple, maxWidth, pos, stoppedAnimating = 0;
            
            maxWidth = Math.max(win.width, win.height);
            
            // Remove the complete class from the main tab
            $('.mainTab > div').removeClass('complete');
            
            // Prepare the final ripple seclusion
            var removeRedundancy = function(element) {
                // Make the element fullscreen
                $(element).addClass('single');
                
                // Remove all the other elements
                $('.ripple').not('.single').remove();
            };
          
            var rippleComplete = function(){
                stoppedAnimating++;
                $(this).addClass('complete');
                if (stoppedAnimating === options.numberOfRipples) {
                    removeRedundancy($(this));
                }
            };
          
            // Create a number of ripples
            for (var i = 1; i <= options.numberOfRipples; i++) {
                // Initial positions
                pos = {
                    top: rand(i%2? 0 : win.height/2, i%2? win.height/2 : win.height),
                    left: rand(0, win.width),
                };
            
                // Prepare the ripple
                ripple = $('<div class="ripple"></div>').css(pos);
                
                // Prepend it to the page wrap
                $('#page_wrap').prepend(ripple);
                
                // Animate!
                ripple.animate({
                    width: maxWidth,
                    height: maxWidth,
                    top: pos.top - maxWidth/2,
                    left: pos.left - maxWidth/2,
                }, {
                    duration: rand(options.speed <= 500 ? 100 : options.speed-500, options.speed+1000),
                    easing: options.effect,
                    complete: rippleComplete
                });
            }
            
            // Parallax effect on the ripples
            this.parallax('ripple, .footer, .title');
            
            // Show the logo
            this.showLogo();
        };
    };
    
    // Load the class
    var instance = new Pond();
    instance.init();
});