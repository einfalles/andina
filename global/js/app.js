!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";require("../../modules/intro-module/js/"),require("../../modules/chapter-cover/js/"),require("../../modules/deep-dive-page/js/"),require("../../modules/video-player/js/"),require("../../modules/video-tout/js/"),require("../../modules/side-sticky-nav/js/"),require("../../modules/dd-carousel/js/"),require("../../modules/inline-photo/js/"),require("../../modules/safety-info-link/js/"),require("../../modules/share-module/js/");for(var PageAnimation=require("./secondary/page-animation"),animations=document.querySelectorAll(".page-animation-component"),i=0,len=animations.length;len>i;i++)new PageAnimation(animations[i])},{"../../modules/chapter-cover/js/":7,"../../modules/dd-carousel/js/":10,"../../modules/deep-dive-page/js/":13,"../../modules/inline-photo/js/":14,"../../modules/intro-module/js/":17,"../../modules/safety-info-link/js/":20,"../../modules/share-module/js/":23,"../../modules/side-sticky-nav/js/":26,"../../modules/video-player/js/":29,"../../modules/video-tout/js/":32,"./secondary/page-animation":5}],2:[function(require,module,exports){"use strict";var SparkResponsiveImages=require("spark-responsive-images"),SparkVideo=require("spark-video"),SparkWindowEvents=require("spark-window-events"),SparkObjectFit=(require("spark-viewport-enter"),require("spark-object-fit")),BackgroundVideo=function(element){this.element=element,this._init()};BackgroundVideo.prototype._init=function(){this._sparkVideoElement=this.element.querySelector(".spark-video"),this._sparkImageElement=this.element.querySelector(".js-bg-video-fallback"),this._sparkVideoElement?SparkVideo.autoplay.then(this._canAutoplay.bind(this),this._cannotAutoplay.bind(this)):this._cannotAutoplay(),this.ready=new Promise(function(resolve){this._resolve=resolve}.bind(this))},BackgroundVideo.prototype._canAutoplay=function(){function done(){this.removeEventListener("playing",done),this.removeEventListener("error",done),_this._ready()}this._sparkVideoElement.classList.remove("hidden"),this._video=new SparkVideo(this._sparkVideoElement,{controls:SparkVideo.settings.Controls.NONE}),SparkObjectFit.cover(this._video.getVideoElement()),this.resizeId=SparkWindowEvents.onResize(this._handleResize.bind(this)),this.scrollId=SparkWindowEvents.onScroll(this._handleScroll.bind(this));var _this=this,videoEl=this._video.getVideoElement();videoEl.addEventListener("playing",done),videoEl.addEventListener("error",done),videoEl.readyState>1?this._showFirstFrame():videoEl.addEventListener("loadeddata",function loadedFirstFrame(){this.removeEventListener("loadeddata",loadedFirstFrame),_this._showFirstFrame()}),this.isVideo=!0,this._handleScroll()},BackgroundVideo.prototype._cannotAutoplay=function(){function done(){this.removeEventListener("load"),this.removeEventListener("error"),_this._ready()}var img=this._sparkImageElement.querySelector("img");this._sparkImageElement.classList.add("spark-responsive-img"),this._sparkImageElement.classList.remove("hidden"),SparkResponsiveImages.add(this._sparkImageElement);var _this=this;img.addEventListener("load",done),img.addEventListener("error",done),this.isVideo=!1},BackgroundVideo.prototype._play=function(){this._video.play()},BackgroundVideo.prototype._pause=function(){this._video.pause()},BackgroundVideo.prototype._ready=function(){this._resolve()},BackgroundVideo.prototype._showFirstFrame=function(){this._video.isPlaying||(this._video.getVideoElement().currentTime=0)},BackgroundVideo.prototype._handleScroll=function(){var topThreshold=100,top=this._sparkVideoElement.getBoundingClientRect().top,bottom=this._sparkVideoElement.getBoundingClientRect().bottom,viewportHeight=$(window).height();viewportHeight+topThreshold>top&&bottom>0?!this._video.isPlaying&&this._play():this._video.isPlaying&&this._pause()},BackgroundVideo.prototype._handleResize=function(){SparkObjectFit.cover(this._video.getVideoElement())},BackgroundVideo.prototype.getVideoElement=function(){return this._sparkVideoElement},BackgroundVideo.prototype.getImageElement=function(){return this._sparkImageElement},module.exports=BackgroundVideo},{"spark-object-fit":"spark-object-fit","spark-responsive-images":"spark-responsive-images","spark-video":"spark-video","spark-viewport-enter":"spark-viewport-enter","spark-window-events":"spark-window-events"}],3:[function(require,module,exports){module.exports={ClassName:{IN:"in",CONTENT:"modal-content",RESPONSIVE_IMG:"spark-responsive-img",OPEN:"modal-open"},EventType:{MODAL_OPEN:"Modal:open",MODAL_CLOSE:"Modal:closed"},defaults:{center:!0,centerOnMobile:!0,isFullScreen:!1,autoplay:!1}}},{}],4:[function(require,module,exports){"use strict";var $=require("jquery"),SparkHelpers=require("spark-helpers"),SparkWindowEvents=require("spark-window-events"),Animation=SparkHelpers.animation,Modal=function(element,opts){this.options=$.extend(!0,{},Modal.settings.defaults,opts),this.element=element,this.$element=$(element),this.$body=$(document.body),this.$content=null,this._content=null,this._id=null,this.$backdrop=null,this._isAnimated=!1,this._init()};Modal.settings=require("./her2-modal-settings"),Modal.prototype._init=function(){this.$content=this.$element.find("."+Modal.settings.ClassName.CONTENT),this._content=this.$content[0],this._id=this.element.id,this._extraClasses=this.element.className,this.triggers=this.$body.find('*[data-target="'+this._id+'"]'),this._video=this.$content.find(".video"),this.options.animationType&&(this._isAnimated=!0,this._animationType=this.options.animationType),this._initListeners()},Modal.prototype._create=function(){ga("send","event","modal","open",this._id.split("modal-")[1]);var modal=document.createElement("div");modal.className=this._extraClasses+" on-screen",this._isAnimated&&(modal.className+=" "+this._animationType);var backdrop=document.createElement("div");backdrop.className="modal-backdrop";var container=document.createElement("div");container.className="modal-container";var innerContainer=document.createElement("div");innerContainer.className="modal-inner",this.options.center&&(innerContainer.className+=" vertical-center");var gridContainer=document.createElement("div");gridContainer.className="inner-container container container-no-ratio-max-width",this.options.isFullScreen&&(modal.className+=" full-screen");var closeButton=$('<div class="close"><svg class="svg-icon md icon-close"><use xlink:href="#close"></use></svg></div>')[0];gridContainer.appendChild(this._content),innerContainer.appendChild(gridContainer),container.appendChild(innerContainer),this.options.isFullScreen||this._video.length>0?(closeButton.className+=" close-full",container.appendChild(closeButton)):this._content.appendChild(closeButton),modal.appendChild(container),modal.appendChild(backdrop),this._video.length>0&&this._createVideoContainer(),this.$modal=$(modal),this.$backdrop=$(backdrop),this.$container=$(container),this.$gridContainer=$(gridContainer),this.$closeButton=$(closeButton),this._show(),this.contentAspect=this._content.clientHeight/this._content.clientWidth,this.options.isFullScreen&&(this._determineOffset(),this.resizeId=SparkWindowEvents.onResize(this._determineOffset.bind(this))),this.options.centerOnMobile||this.$modal.addClass("full-mobile-height")},Modal.prototype._initListeners=function(){var self=this;this.triggers.on("click",function(e){e.preventDefault(),self._create()})},Modal.prototype._determineOffset=function(){var windowHeight=document.documentElement.clientHeight,windowWidth=document.documentElement.clientWidth,windowAspect=windowHeight/windowWidth;this._content.style.maxWidth="none",this._content.style.margin="0 auto",this.contentAspect>windowAspect&&this._recalculateAspect()},Modal.prototype._recalculateAspect=function(){var windowHeight=document.documentElement.clientHeight;this._content.style.maxWidth=windowHeight/this.contentAspect+"px",this._content.style.margin="0 auto"},Modal.prototype._show=function(){this.$body.addClass(Modal.settings.ClassName.OPEN),this.$body.append(this.$modal),this._showContent()},Modal.prototype._showContent=function(){var _this=this;this._isAnimated?(setTimeout(function(){_this.$modal.addClass(Modal.settings.ClassName.IN)}),Animation.onTransitionEnd(this.$backdrop,$.proxy(this._showAnimatedContent,this))):setTimeout(function(){_this._initContent()})},Modal.prototype._showAnimatedContent=function(){this.$container.addClass("fade-in"),Animation.onTransitionEnd(this.$container,$.proxy(this._initContent,this))},Modal.prototype._initContent=function(){this._initVideo(),this._addCloseListener()},Modal.prototype._initVideo=function(){var video=this.$content.find(".video");video.length>0&&this._createVimeoVideo(video)},Modal.prototype._createVideoContainer=function(){var scaler=document.createElement("div");scaler.className="aspect-16x9 scaler",this._content.appendChild(scaler),this.$video=$(scaler)},Modal.prototype._createVimeoVideo=function(video){var id=video.data("vimeoId"),autoplay=this.options.autoplay,iframe=document.createElement("iframe");iframe.src="//player.vimeo.com/video/"+id,iframe.setAttribute("frameborder","0"),iframe.setAttribute("allowfullscreen",!1),autoplay&&(iframe.src+="?autoplay=1"),this.$video.append(iframe)},Modal.prototype._addCloseListener=function(){var _this=this;this.$closeButton.on("click",$.proxy(this._hide,this)),this.$container.on("click",function(e){$(e.target).attr("class")===_this.$container.attr("class")&&_this._hide()}),this.$gridContainer.on("click",function(e){$(e.target).attr("class")===_this.$gridContainer.attr("class")&&_this._hide()})},Modal.prototype._hide=function(){ga("send","event","modal","close",this._id.split("modal-")[1]),this.$modal.removeClass(Modal.settings.ClassName.IN),this._isAnimated?Animation.onTransitionEnd(this.$backdrop,$.proxy(this._remove,this)):this._remove()},Modal.prototype._remove=function(){this.$closeButton.off("click",$.proxy(this._hide,this)),this.$backdrop.off("click",$.proxy(this._hide,this)),this.$closeButton.remove(),this.$body.removeClass(Modal.settings.ClassName.OPEN),this.$element.append(this.$content),this.$modal.remove(),this.$element.trigger(Modal.settings.EventType.MODAL_CLOSE),this._dispose()},Modal.prototype._dispose=function(){SparkWindowEvents.remove(this.resizeId),this.$video&&this._disposeVideo(),this.$element.append(this.$content),this.$modal=null,this.$backdrop=null,this.$container=null,this.resizeId=null},Modal.prototype._disposeVideo=function(){this.$video.remove(),this.$video=null},Modal.prototype.registerTriggers=function(){this._flushTriggers(),this.triggers=this.$body.find('*[data-target="'+this._id+'"]'),this._initListeners()},Modal.prototype._flushTriggers=function(){this.triggers.off("click"),this.triggers=null},module.exports=Modal},{"./her2-modal-settings":3,jquery:"jquery","spark-helpers":"spark-helpers","spark-window-events":"spark-window-events"}],5:[function(require,module,exports){"use strict";function toArray(arrayLike){return Array.prototype.slice.call(arrayLike)}var $=require("jquery"),DeviceEnum=require("spark-device-enum"),SparkHelpers=require("spark-helpers"),SparkViewport=require("spark-viewport-enter"),Utilities=SparkHelpers.utilities,AnimationHelpers=SparkHelpers.animation,Browser=SparkHelpers.browser,PageAnimation=function(element){this.element=element,this.init()};PageAnimation.settings={ClassName:{TARGET:"page-animation__target",IN:"in",DONE:"page-animation--done",IGNORE:"page-animation__ignore"}},PageAnimation.HAS_SCROLL_ANIMATION=!Browser.isNativeAndroid(navigator.userAgent),PageAnimation.prototype.init=function(){this.images=this._getDependentImages(),this._numImages=this.images.length,this._loadedImages=0,this._imageCompleteHandler=this._imageComplete.bind(this),this._deferred=new $.Deferred,this._numImages>0?this.images.forEach(function(image){image.addEventListener("load",this._imageCompleteHandler),image.addEventListener("error",this._imageCompleteHandler)},this):this._deferred.resolve(),PageAnimation.HAS_SCROLL_ANIMATION?this.id=SparkViewport.add({element:this.element,threshold:Utilities.getPercentageOption(this.element.getAttribute("data-threshold"),"25%"),enter:this._enteredView.bind(this)}):this._show()},PageAnimation.prototype._getDependentImages=function(){var images=toArray(this.element.querySelectorAll("img"));return images.filter(function(image){return 0===$(image).closest("."+PageAnimation.settings.ClassName.IGNORE).length})},PageAnimation.prototype._enteredView=function(){this._deferred.then(this._show.bind(this))},PageAnimation.prototype._show=function(){$(this.element).addClass(PageAnimation.settings.ClassName.IN),$(this.element).find("."+PageAnimation.settings.ClassName.TARGET).each(function(i,el){AnimationHelpers.onTransitionEnd(el,function(evt){$(evt.target).addClass(PageAnimation.settings.ClassName.DONE)},null,DeviceEnum.Dom.TRANSFORM)}),this.dispose()},PageAnimation.prototype._imageComplete=function(){this._loadedImages++,this._loadedImages===this._numImages&&this._deferred.resolve()},PageAnimation.prototype.dispose=function(){SparkViewport.remove(this.id),this.images.forEach(function(image){image.removeEventListener("load",this._imageCompleteHandler),image.removeEventListener("error",this._imageCompleteHandler)},this),this.images=this.element=null},module.exports=PageAnimation},{jquery:"jquery","spark-device-enum":"spark-device-enum","spark-helpers":"spark-helpers","spark-viewport-enter":"spark-viewport-enter"}],6:[function(require,module,exports){"use strict";var $=require("jquery"),BackgroundVideo=require("../../../global/js/secondary/background-video");module.exports={init:function(){$(".chapter-cover .background-video").each(function(){new BackgroundVideo(this)})}}},{"../../../global/js/secondary/background-video":2,jquery:"jquery"}],7:[function(require,module,exports){require("./chapter-cover").init()},{"./chapter-cover":6}],8:[function(require,module,exports){module.exports={ClassName:{BASE:"dd-carousel",INNERWRAP:"dd-carousel__inner-wrap"}}},{}],9:[function(require,module,exports){"use strict";var $=require("jquery"),DdCarouselEnums=require("./dd-carousel-enums"),SparkCarousel=require("spark-carousel"),base={init:function(){var $module=$("."+DdCarouselEnums.ClassName.BASE);$module.each(function(){new DdCarousel(this)})}},DdCarousel=function(element){this.element=element,this.$element=$(element),this.$innerWrap=this.$element.find("."+DdCarouselEnums.ClassName.INNERWRAP),this._init()};DdCarousel.prototype._init=function(){new SparkCarousel(this.$innerWrap[0],{isLooped:!1,animationSpeed:500,template:{paddleNextInner:'<svg viewBox="0 256 768 768"><path d="M43.2 288h683.2c4.8 0 9.6 4.8 9.6 9.6v684.8c0 4.8-4.8 9.6-9.6 11.2H43.2c-4.8 0-9.6-4.8-9.6-9.6V297.6c0-4.8 4.8-9.6 9.6-9.6m0-32C20.8 256 1.6 275.2 0 297.6v684.8c0 22.4 19.2 41.6 41.6 41.6h684.8c22.4 0 41.6-19.2 41.6-40V297.6c0-22.4-19.2-41.6-41.6-41.6H43.2z"/><path d="M315.2 758.4l110.4-115.2-104-123.2 24-19.2 123.2 142.4-129.6 137.6"/></svg>',paddlePrevInner:'<svg viewBox="0 128 48 48"><path d="M45.3 130c.3 0 .6.3.6.6v42.9c0 .3-.3.6-.6.6H2.6c-.3-.1-.6-.4-.6-.7v-42.8c0-.3.3-.6.6-.6h42.7m0-2H2.6c-1.4 0-2.6 1.2-2.6 2.6v42.9c0 1.3 1.2 2.5 2.6 2.5h42.8c1.4 0 2.6-1.2 2.6-2.6v-42.8c-.1-1.4-1.3-2.6-2.7-2.6z"/><path d="M26.8 160.8l-8.1-8.6 7.7-8.9 1.5 1.2-6.5 7.7 6.9 7.2"/></svg>'}})},module.exports=base},{"./dd-carousel-enums":8,jquery:"jquery","spark-carousel":"spark-carousel"}],10:[function(require,module,exports){"use strict";require("./dd-carousel").init()},{"./dd-carousel":9}],11:[function(require,module,exports){module.exports={ClassName:{BASE:"deep-dive-page",PAGEWRAP:"page-wrap",DDWRAP:"dd-wrap",OVERLAY:"dd-overlay",DDSECTION:"dd-section",CURRENTSECTION:"dd-current-section",DDLINK:"breather--deep-dive__link",DDISOPEN:"dd-is-open",CLOSEBTN:"btn--close-dd",RESPIMG:"spark-responsive-img",RESPLOADEDIMG:"spark-responsive-img--loaded"}}},{}],12:[function(require,module,exports){"use strict";var $=require("jquery"),SparkResponsiveImages=require("spark-responsive-images"),SparkScrollAnimation=require("spark-scroll-animation"),SparkOnSwipe=require("spark-on-swipe"),SparkWindowEvents=require("spark-window-events"),SparkHelpers=require("spark-helpers"),Animation=SparkHelpers.animation,DeepDivePageEnums=require("./deep-dive-page-enums"),DeepDivePage=function(element){this.element=element,this.$element=$(element),this.$body=this.$element,this.$pageWrap=this.$element.find("."+DeepDivePageEnums.ClassName.PAGEWRAP),this.$ddWrap=this.$element.find("."+DeepDivePageEnums.ClassName.DDWRAP),this.$ddTriggers=this.$element.find("."+DeepDivePageEnums.ClassName.DDLINK),this.$ddSections=this.$element.find("."+DeepDivePageEnums.ClassName.DDSECTION),this.$closeBtn=this.$element.find("."+DeepDivePageEnums.ClassName.CLOSEBTN),this.$overlay=this.$element.find("."+DeepDivePageEnums.ClassName.OVERLAY),this.$currentDdSection=null,this._ddIsOpenClass=DeepDivePageEnums.ClassName.DDISOPEN,this._ddCurrentSectionClass=DeepDivePageEnums.ClassName.CURRENTSECTION,this._respImgClass=DeepDivePageEnums.ClassName.RESPIMG,this._respImgLoadedClass=DeepDivePageEnums.ClassName.RESPLOADEDIMG,this._ddIsOpen=!1,this._init()};DeepDivePage.prototype._init=function(){this._setupTriggers(),this._createOverlay(),this._setupCloseTriggers(),this._checkForDeepLink()},DeepDivePage.prototype._setupTriggers=function(){this.$ddTriggers.on("click",$.proxy(this._handleTriggerClick,this))},DeepDivePage.prototype._setupCloseTriggers=function(){function closeDeepDive(e){e.preventDefault(),self._closeDd()}function onSwipe(e){"right"===e.direction&&self._ddIsOpen&&0===$(e.target).closest(".carousel-slide").length&&self._closeDd()}var self=this;this.$closeBtn.on("click",closeDeepDive),this.$overlay.on("click",closeDeepDive),$(document).keydown(function(e){27===e.which&&self._closeDd()}),new SparkOnSwipe(this.$body[0],onSwipe)},DeepDivePage.prototype._handleTriggerClick=function(evt){evt.preventDefault();var href=$(evt.currentTarget).attr("href");this._openDeepDiveByHash(href)},DeepDivePage.prototype._openDeepDiveByHash=function(hash){this.$currentDdSection=$(hash),this._updateActiveSection(this.$currentDdSection),this._openDd(),this._setHash(hash),ga("send","event","open deep dive",hash.split("#dd-")[1])},DeepDivePage.prototype._openDd=function(){function throttle(callback,limit){var wait=!1;return function(){wait||(callback.call(),wait=!0,setTimeout(function(){wait=!1},limit))}}var self=this;this._ddIsOpen=!0,this.$body.addClass(this._ddIsOpenClass),this.resizeId=SparkWindowEvents.onResize(this._checkDdHeight.bind(this)),setTimeout(function(){self.sparkScrollAnimationId=SparkScrollAnimation.add(self.$ddWrap[0],throttle($.proxy(self._onThrottledScroll,self),200))},500)},DeepDivePage.prototype._checkDdHeight=function(){this.$ddWrap.find(".height-filler-container").remove();var $ddCurSec=this.$ddWrap.find(".dd-current-section"),ddCurSecHeight=$ddCurSec.height(),viewportHeight=window.innerHeight||$(window).height();SparkResponsiveImages.updateOffsets(),viewportHeight>=ddCurSecHeight&&this._fixDdHeight($ddCurSec,ddCurSecHeight,viewportHeight);var self=this;$ddCurSec.find(".spark-responsive-img:not(.spark-responsive-img--loaded)").length&&setTimeout(function(){self._checkDdHeight()},500)},DeepDivePage.prototype._fixDdHeight=function($ddCurSec,ddCurSecHeight,viewportHeight){var $container=$("<div/>",{"class":"container sheet-wrap-container height-filler-container"});$("<div/>",{"class":"sheet-wrap height-filler-sheet-wrap",height:viewportHeight-ddCurSecHeight+"px"}).appendTo($container),$ddCurSec.append($container)},DeepDivePage.prototype._closeDd=function(){this._ddIsOpen=!1,this.$body.removeClass(this._ddIsOpenClass),this._setHash(""),this._pauseDDVideo(),SparkWindowEvents.remove(this.resizeId),SparkScrollAnimation.remove(this.sparkScrollAnimationId),Animation.onTransitionEnd(this.$ddWrap[0],this._handleDeepDiveClosed,this),ga("send","event","close deep dive")},DeepDivePage.prototype._handleDeepDiveClosed=function(){this.$ddActiveSection.removeClass(this._ddCurrentSectionClass)},DeepDivePage.prototype._pauseDDVideo=function(){var $thDdVideo=this.$currentDdSection.find(".video-player.spark-video");$thDdVideo.length&&$thDdVideo.each(function(){var thSparkVideo=$(this).data("sparkVideo");thSparkVideo.pause()})},DeepDivePage.prototype._setHash=function(newHash){if(newHash=newHash.replace(/^#/,""),window.history.replaceState)newHash=newHash?"#"+newHash:window.location.pathname+window.location.search,window.history.replaceState({},null,newHash);else{var st;newHash||(st=$(window).scrollTop()),window.location.hash=newHash,newHash||$(window).scrollTop(st)}},DeepDivePage.prototype._updateActiveSection=function($newActiveSection){this.$ddActiveSection=$newActiveSection,this.$ddWrap.scrollTop(0),this.$element.find("."+this._ddCurrentSectionClass).removeClass(this._ddCurrentSectionClass),$newActiveSection.addClass(this._ddCurrentSectionClass),$.contains(this.$ddWrap,$newActiveSection)||this.$ddWrap.prepend($newActiveSection),$newActiveSection.focus(),this._checkDdHeight()},DeepDivePage.prototype._createOverlay=function(){this.$overlay=$("<div/>",{"class":"dd-overlay"}).appendTo(this.$body)},DeepDivePage.prototype._checkForDeepLink=function(){var hash=window.location.hash;if(hash&&"#"!==hash){var hashes=this.$ddTriggers.map(function(i,el){return $(el).attr("href")}).get();hashes.indexOf(hash)>-1&&this._goToDeepDive(hash)}},DeepDivePage.prototype._onThrottledScroll=function(){SparkResponsiveImages.updateOffsets()},DeepDivePage.prototype._goToDeepDive=function(hash){var $triggerLink=this.$ddTriggers.filter('[href="'+hash+'"]'),$triggerSection=$triggerLink.closest("section");$(window).scrollTop($triggerSection.offset().top),this._openDeepDiveByHash(hash)},module.exports={init:function(){$("."+DeepDivePageEnums.ClassName.BASE).each(function(){new DeepDivePage(this)})}}},{"./deep-dive-page-enums":11,jquery:"jquery","spark-helpers":"spark-helpers","spark-on-swipe":"spark-on-swipe","spark-responsive-images":"spark-responsive-images","spark-scroll-animation":"spark-scroll-animation","spark-window-events":"spark-window-events"}],13:[function(require,module,exports){"use strict";require("./deep-dive-page").init()},{"./deep-dive-page":12}],14:[function(require,module,exports){"use strict";require("./inline-photo").init()},{"./inline-photo":16}],15:[function(require,module,exports){module.exports={ClassName:{BASE:"inline-photo"}}},{}],16:[function(require,module,exports){"use strict";var $=require("jquery"),InlinePhotoEnums=require("./inline-photo-enums"),SparkWindowEvents=require("spark-window-events"),base={init:function(){var $module=$("."+InlinePhotoEnums.ClassName.BASE);$module.each(function(){new InlinePhoto(this)})}},InlinePhoto=function(element){this.element=element,this.$element=$(element),this._init()};InlinePhoto.prototype._init=function(){this._checkParentRowHeight()},InlinePhoto.prototype._checkParentRowHeight=function(){var $thParentRow=this.$element.parent().parent();$thParentRow.is(".inline-photo-row")&&(this._fixParentRowHeight($thParentRow),SparkWindowEvents.onResize(this._fixParentRowHeight.bind(this)))},InlinePhoto.prototype._fixParentRowHeight=function($thParentRow){var elHeight=this.$element.parent().height();if($thParentRow){var parentHeight=$thParentRow.height();elHeight>parentHeight&&$thParentRow.height(elHeight)}},module.exports=base},{"./inline-photo-enums":15,jquery:"jquery","spark-window-events":"spark-window-events"}],17:[function(require,module,exports){"use strict";require("./intro-module").init()},{"./intro-module":19}],18:[function(require,module,exports){module.exports={ClassName:{BASE:"intro-module"}}},{}],19:[function(require,module,exports){"use strict";var $=require("jquery"),IntroModuleEnums=require("./intro-module-enums"),BackgroundVideo=require("../../../global/js/secondary/background-video");module.exports={init:function(){$("."+IntroModuleEnums.ClassName.BASE+" .background-video").each(function(){new BackgroundVideo(this)})}}},{"../../../global/js/secondary/background-video":2,"./intro-module-enums":18,jquery:"jquery"}],20:[function(require,module,exports){"use strict";require("./safety-info-link").init()},{"./safety-info-link":22}],21:[function(require,module,exports){module.exports={ClassName:{BASE:"safety-info-link",CONTAINER:"her2",MODAL:"safety-modal"}}},{}],22:[function(require,module,exports){"use strict";var $=require("jquery"),SafetyInfoLinkEnums=require("./safety-info-link-enums"),Modal=require("../../../global/js/secondary/her2-modal"),SafetyInfoLink=function(element){this.element=element,this.$element=$(element),this._init()};SafetyInfoLink.prototype._init=function(){this.$element.find("."+SafetyInfoLinkEnums.ClassName.BASE).on("click",!1),this.modals=this.$element.find("."+SafetyInfoLinkEnums.ClassName.MODAL).map(function(){return new Modal(this,{center:!0,centerOnMobile:!1,animationType:"fade"})}).get()},module.exports={init:function(){$("."+SafetyInfoLinkEnums.ClassName.CONTAINER).each(function(){new SafetyInfoLink(this)})}}},{"../../../global/js/secondary/her2-modal":4,"./safety-info-link-enums":21,jquery:"jquery"}],23:[function(require,module,exports){"use strict";require("./share-module").init()},{"./share-module":25}],24:[function(require,module,exports){module.exports={ClassName:{BASE:"share-module",BUTTON:"intro-module__share-link",OPEN:"open"}}},{}],25:[function(require,module,exports){"use strict";var $=require("jquery"),ShareModuleEnums=require("./share-module-enums"),base={init:function(){var $module=$("."+ShareModuleEnums.ClassName.BASE);$module.each(function(){new ShareModule(this)})}},ShareModule=function(element){this.element=element,this.$element=$(element),this.$button=this.$element.find("."+ShareModuleEnums.ClassName.BUTTON),this._init()};ShareModule.prototype._init=function(){},module.exports=base},{"./share-module-enums":24,jquery:"jquery"}],26:[function(require,module,exports){"use strict";require("./side-sticky-nav").init()},{"./side-sticky-nav":28}],27:[function(require,module,exports){module.exports={ClassName:{BASE:"side-sticky-nav",SECTIONCLASS:"side-sticky-nav-section",NAVLINK:"side-sticky-nav__jumplink",TOPSECTION:"intro-module"}}},{}],28:[function(require,module,exports){"use strict";var $=require("jquery"),SideStickyNavEnums=require("./side-sticky-nav-enums"),SparkHelpers=require("spark-helpers"),SparkWindowEvents=require("spark-window-events"),SparkScrollAnimation=require("spark-scroll-animation"),base={init:function(){var $module=$("."+SideStickyNavEnums.ClassName.BASE);$module.each(function(){new SideStickyNav(this)})}},SideStickyNav=function(element){this.element=element,this.$element=$(element),this.$document=$(document),this.minWidthForNav=1024,this.scrollSpeedFactor=3,this.$stickySections=this.$document.find("."+SideStickyNavEnums.ClassName.SECTIONCLASS),this.$jumplinks=this.$element.find("."+SideStickyNavEnums.ClassName.NAVLINK),this.$topSection=this.$document.find("."+SideStickyNavEnums.ClassName.TOPSECTION),this._curSection=null,this._navIsVisible=null,this._navIsFixed=null,this._currentSectionName="",this._sectionOffsets=null,this._init()};SideStickyNav.prototype._init=function(){var self=this;this._setupJumplinks(),SparkWindowEvents.onResize(function(){self._onResize()}),this._onResize()},SideStickyNav.prototype._setupJumplinks=function(){var self=this;this.$jumplinks.each(function(){self._setupJumplink($(this))})},SideStickyNav.prototype._setupJumplink=function($jumplink){var self=this;$jumplink.on("click",function(e){e.preventDefault(),$.proxy(self._handleJumplinkClick($(this)),self),ga("send","event","side nav",$(this).children("span.label-text-2").text())})},SideStickyNav.prototype._handleJumplinkClick=function($jumplink){var $targetSection=$($jumplink.attr("href")),targetSectionTop=this._getSectionOffset($targetSection),easing="swing",baseDuration=1e3,scrollPosition=this.$document.scrollTop(),scrollDist=Math.abs(scrollPosition-targetSectionTop),viewportHeight=$(window).height(),viewportsToTravel=scrollDist/viewportHeight,duration=baseDuration+viewportsToTravel*this.scrollSpeedFactor*10;SparkHelpers.animation.scrollTo(targetSectionTop,duration,easing)},SideStickyNav.prototype._getSectionOffset=function($targetSection){return $targetSection.position().top},SideStickyNav.prototype._onScroll=function(){var btmOfFirstSec=this.$topSection.outerHeight(),scrollPosition=this.$document.scrollTop();scrollPosition>btmOfFirstSec?(this._navIsFixed||this._setNavToFixed(),this._trackScrollSection(scrollPosition)):this._navIsFixed!==!1&&this._setNavToAbsoluteFromIntro()},SideStickyNav.prototype._onResize=function(){$(window).outerWidth()>=this.minWidthForNav?this._navIsVisible?this._updateAfterResize():(this._showNav(),this._updateAfterResize()):this._navIsVisible&&this._hideNav()},SideStickyNav.prototype._hideNav=function(){this.$element.css({display:"none"}),this._navIsVisible=!1,this.sparkScrollAnimation&&SparkScrollAnimation.remove(this.sparkScrollAnimation)},SideStickyNav.prototype._showNav=function(){var self=this;this.$element.css({display:"block"}),this._navIsVisible=!0,this._onResize(),this.sparkScrollAnimation=SparkScrollAnimation.add($.proxy(self._onScroll,this)),this._onScroll()},SideStickyNav.prototype._updateAfterResize=function(){this._updateNavTopPadding(),this._updateSectionOffsets()},SideStickyNav.prototype._updateNavTopPadding=function(){var viewportHeight=$(window).height(),navHeight=this.$element.innerHeight(),navTopPadding=Math.round((viewportHeight-navHeight)/2);this.$element.css({"margin-top":navTopPadding})},SideStickyNav.prototype._updateSectionOffsets=function(){var self=this;this._sectionOffsets=[],this.$stickySections.each(function(){var thObj={};thObj.id=$(this).attr("id"),thObj.offset=self._getSectionOffset($(this)),self._sectionOffsets.push(thObj)})},SideStickyNav.prototype._setNavToFixed=function(){this._navIsFixed=!0,this.$element.removeClass("isAbsolute").addClass("isFixed").css({position:"fixed",top:0})},SideStickyNav.prototype._setNavToAbsoluteFromIntro=function(){this._navIsFixed=!1;var btmOfFirstSec=this.$topSection.outerHeight();this.$element.removeClass("isFixed").addClass("isAbsolute").css({position:"absolute",top:btmOfFirstSec})},SideStickyNav.prototype._trackScrollSection=function(scrollPosition){for(var tempLatestSection=null,i=0;i<this._sectionOffsets.length;i++)scrollPosition>=this._sectionOffsets[i].offset&&(tempLatestSection=this._sectionOffsets[i]);tempLatestSection!==this._curSection&&this._updateCurrentSection(tempLatestSection)},SideStickyNav.prototype._updateCurrentSection=function(newSection){this._curSection=newSection;var $jumplink=this.$element.find('a[href="#'+newSection.id+'"]');this._updateCurrentNav($jumplink)},SideStickyNav.prototype._updateCurrentNav=function($jumplink){this.$jumplinks.each(function(){$(this).blur().removeClass("active")}),$jumplink&&$jumplink.addClass("active")},module.exports=base},{"./side-sticky-nav-enums":27,jquery:"jquery","spark-helpers":"spark-helpers","spark-scroll-animation":"spark-scroll-animation","spark-window-events":"spark-window-events"}],29:[function(require,module,exports){"use strict";require("./video-player").init()},{"./video-player":31}],30:[function(require,module,exports){module.exports={ClassName:{BASE:"video-player",BTN_CLASS:"video-tout__play-btn"}}},{}],31:[function(require,module,exports){"use strict";var $=require("jquery"),VideoPlayerEnums=require("./video-player-enums"),SparkVideo=require("spark-video"),SparkHelpers=require("spark-helpers"),VideoPlayer=function(element){this.element=element,this.$element=$(element),this.$videoBtn=this.$element.parent().find("."+VideoPlayerEnums.ClassName.BTN_CLASS),
this._init()};VideoPlayer.prototype._init=function(){SparkHelpers.browser.isAndroidOS(navigator.userAgent)&&this._removeWebmSources(),this.$videoBtn.on("click",this._handlePlayClick.bind(this)),this.sparkVideo=new SparkVideo(this.element,{controls:SparkVideo.settings.Controls.STACKED_PROGRESS}),this.$element.data("sparkVideo",this.sparkVideo),this.sparkVideo.getVideoElement().addEventListener("ended",this._handleVideoEnded.bind(this))},VideoPlayer.prototype._handlePlayClick=function(e){e.preventDefault(),this.$videoBtn.addClass("hidden"),this.$element.removeClass("hidden"),this.sparkVideo.play(),ga("send","event","video start",this.$element.find("source")[0].src.split("/").pop().split(".")[0])},VideoPlayer.prototype._handleVideoEnded=function(){this.$videoBtn.removeClass("hidden"),this.$element.addClass("hidden"),ga("send","event","video end",this.$element.find("source")[0].src.split("/").pop().split(".")[0])},VideoPlayer.prototype._removeWebmSources=function(){var $sources=this.$element.find("source");$sources.each(function(){var srcExt=$(this).attr("src").split(".").pop();"webm"==srcExt&&$(this).remove()})},module.exports={init:function(){$("."+VideoPlayerEnums.ClassName.BASE).each(function(){new VideoPlayer(this)})}}},{"./video-player-enums":30,jquery:"jquery","spark-helpers":"spark-helpers","spark-video":"spark-video"}],32:[function(require,module,exports){"use strict";require("./video-tout").init()},{"./video-tout":34}],33:[function(require,module,exports){module.exports={ClassName:{BASE:"video-tout"}}},{}],34:[function(require,module,exports){"use strict";var $=require("jquery"),VideoToutEnums=require("./video-tout-enums"),SparkWindowEvents=require("spark-window-events"),base={init:function(){var $module=$("."+VideoToutEnums.ClassName.BASE);$module.each(function(){new VideoTout(this)})}},VideoTout=function(element){this.element=element,this.$element=$(element),this._init()};VideoTout.prototype._init=function(){this._checkParentRowHeight(),SparkWindowEvents.onResize(this._checkParentRowHeight.bind(this))},VideoTout.prototype._checkParentRowHeight=function(){var $thParentRow=this.$element.parent().parent();$thParentRow.is(".video-tout-row")&&this._fixParentRowHeight($thParentRow)},VideoTout.prototype._fixParentRowHeight=function($thParentRow){var elHeight=this.$element.parent().height();if($thParentRow){var parentHeight=$thParentRow.height();elHeight>parentHeight&&$thParentRow.height(elHeight)}},module.exports=base},{"./video-tout-enums":33,jquery:"jquery","spark-window-events":"spark-window-events"}]},{},[1]);
//# sourceMappingURL=app.js.map