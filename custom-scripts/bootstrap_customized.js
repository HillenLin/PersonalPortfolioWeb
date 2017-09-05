







//find out the highest z-index at the web page and give to the right navigation bar
function findHighestIndex(selector){
  var elems = $("*")
  var highest = 0
  for (var i = 0; i < elems.length; i++) {
      var zindex = document.defaultView.getComputedStyle(elems[i], null).getPropertyValue("z-index");
      var zindexNum = parseInt(zindex);
      if ((zindexNum > highest) && (zindex != 'auto')) {
          highest = zindexNum;
      }
  }
  $("#socialMed-wrapper").css("z-index",highest - 1);
  $(".overlay").css("z-index", highest);
}

//carousel: assume each slide has three items to be displayed
// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
function carousel(){

  $('#myCarousel .item').each(function(){

    //find the next item dom
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    //find the next next item dom
    if (next.next().length) {
      next.next().children(':first-child').clone().appendTo($(this));
    } else {
    	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
    $(this).children(':nth-child(2)').addClass('animated rubberBand');

  });
}

function frontTextPosition(){
  var AspectRatios = 4928 / 2734
  var AspectRatiosT = 2734 / 312
  var AspectRatiosT2 = 2734 / 565

  $('.bg').css('height', $('.bg').width() / AspectRatios);
  $('.bg h1').addClass('animated zoomInDown').css({"opacity": "1", "margin-top": $('.bg').height()/AspectRatiosT + "px"});
  $('.bg h2').css("margin-top", $('.bg').height()/AspectRatiosT2 + "px");
  $('.bg h1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('.bg h2').addClass('animated zoomInDown').css("opacity", "1");
  });
  $('.bg h2').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    $('.bg .glyphicon').addClass('animated zoomInDown').css("opacity", "1");
  });
}

function showWorkImg(selector, id){
  var imageUrl = 'images/' + id + '.jpg'
  selector.append(
    $('<span/>',{
      'class': 'img-mask'
    }), $('<img>',{
      'src': imageUrl,
      'class': 'img-responsive'
    })
  );

}

function responsiveMask(){
  $('.img-mask').each(function(){
    var imgDom = $(this).next('img')
    var _this = $(this)
    imgDom.on('load',function(){
       _this.width(imgDom.width());
       _this.height(imgDom.height());
    });

  });
}

function responsiveLine(){
  $('.section-title').each(function(){
    var _this = this
    $(_this).siblings('.left-line-break').css({

      'width': ($('#navbar-noBorder').width() - $(_this).width()) / 2 + 'px',
      'margin-left': ($(window).width() - $('#navbar-noBorder').width()) / 2 -15
    });
    $(_this).siblings('.right-line-break').css({
      'width': ($('#navbar-noBorder').width() - $(_this).width()) / 2 + 'px',
      'margin-right': ($(window).width() - $('#navbar-noBorder').width()) / 2 -15
    });
  });

}

// @para pre button -- next button -- overflowDiv


function scrollDown(buttonSelector1, buttonSelector2, divSelector){
  let changedTop = $(divSelector).position().top;
  let initialValue = -230; //the first value to be move upwards
  let secondValue = -($(divSelector).height() - $('.slide-inner-wrapper').height()); // the second value to be move upwards
  let initialString = initialValue.toString() + "px";
  let secondString = secondValue.toString() + "px";


  if (changedTop === 0) {
    $(divSelector).css("transform", "translate3d(0px, " + initialString + ", 0px)");

    $(buttonSelector2).prop("disabled",false);
    $(buttonSelector2).css("opacity", "1");
  }else if (changedTop === initialValue) {
    $(divSelector).css("transform", "translate3d(0px, " + secondString + ", 0px)");
    $(buttonSelector1).prop("disabled",true);
    $(buttonSelector1).css("opacity", "0.5");
  }
}

function scrollUp(buttonSelector1, buttonSelector2, divSelector){
  let changedTop = $(divSelector).position().top;
  let initialValue = -230; //the first value to be move upwards
  let secondValue = -($(divSelector).height() - $('.slide-inner-wrapper').height()); // the second value to be move upwards
  let initialString = initialValue.toString() + "px";
  let secondString = secondValue.toString() + "px";



  if (changedTop === secondValue) {
    $(divSelector).css("transform", "translate3d(0px, " + initialString + ", 0px)");

    $(buttonSelector2).prop("disabled",false);
    $(buttonSelector2).css("opacity", "1");
  }else if (changedTop === initialValue) {
    $(divSelector).css("transform", "translate3d(0px, 0px, 0px)");
    $(buttonSelector1).prop("disabled",true);
    $(buttonSelector1).css("opacity", "0.5");

    $(buttonSelector2).prop("disabled",false);
    $(buttonSelector2).css("opacity", "1");
  }else if (changedTop === 0) {
    $(buttonSelector1).prop("disabled",true);
    $(buttonSelector1).css("opacity", "0.5");
  }
}


$(document).ready(function(){


  //......
  //......append text after the front image is loaded
  var title1Code = "<h1>HELLO WORLD</h1>"
  var title2Code = "<h2>I am a sydney based front-end developer</h2>"
  $(".bg").append(title1Code);
  $(".bg").append(title2Code);

  $(".section-top-title").css("display", "block");


  $("#experience-control a.prev").on("click", function(){
    scrollUp("#experience-control a.prev", "#experience-control a.next", ".slide-inner-wrapper ul#list-style1");
  });

  $("#experience-control a.next").on("click", function(){
    scrollDown("#experience-control a.next", "#experience-control a.prev", ".slide-inner-wrapper ul#list-style1");
  });

  //...

  $("#education-control a.prev").on("click", function(){
    scrollUp("#education-control a.prev", "#education-control a.next", ".slide-inner-wrapper ul#list-style2");
  });

  $("#education-control a.next").on("click", function(){
    scrollDown("#education-control a.next", "#education-control a.prev", ".slide-inner-wrapper ul#list-style2");
  });

  //
  $("popup").on("click", function(){

  });


  $('.responsive-divider').each(function(){
      showWorkImg($(this),$(this).attr('id'));
    }
  );



  responsiveMask();
  responsiveLine();
  $('body').scrollspy({
    target: '.navbar',
    offset: $(".navbar").outerHeight(true) + 1
  });

  // $("#socialMed-wrapper").hide();

  carousel();

  frontTextPosition();

  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - $(".navbar").outerHeight(true)
      }, 900, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        // window.location.hash = hash;
      });
    } // End if
  });
  $(".glyphicon-chevron-down").on('click', function(event){
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#about').offset().top - $(".navbar").outerHeight(true) + 5 + parseInt($(".navbar").css('margin-top'))
    }, 900);
  });

  $(".lower-wrapper button").on('click', function(event){
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $('#moreAbout').offset().top - $(".navbar").outerHeight(true) + 5 + parseInt($(".navbar").css('margin-top'))
    }, 900);
  });


  $(window).scroll(function(event) { 
    var x = $(this).scrollTop()

    $('.bg').css('background-position', '0% ' + parseInt(130 - x/5) + 'px');
    // $(".section").each(function(){
    //   var compareHeight = window.pageYOffset + $(".navbar").outerHeight(true);
    //   var minHeight = $(this).offset().top;
    //   var maxHeight = minHeight + $(this).outerHeight(true)
    //   if ( compareHeight > minHeight && compareHeight < maxHeight) {
    //     window.location.hash = $(this).attr('id');
    //   }
    // });
  });

  $(window).resize(function(){
    var AspectRatios = 4928 / 2734
    $('.bg').css('height', $('.bg').width() / AspectRatios);
    frontTextPosition();
    $('.img-mask').each(function(){
      var imgDom = $(this).next('img')
      var _this = $(this)
     _this.width(imgDom.width());
     _this.height(imgDom.height());

    });
    responsiveLine();

  });

  //reference
  $("#navbar-noBorder").on('shown.bs.collapse', function () {
     console.log("Opened");
  });
  $("#navbar-noBorder").on('hidden.bs.collapse', function () {
     console.log("Closed");
  });

  findHighestIndex();

  //clone the logo img dom to the content div
  $('#my-tabs.nav-tabs > li').each(function(index, element){
    var trimmedId = $(element).find('a').attr('href').substring(1)

    $('.tab-pane').each(function(inex2, element2){

      var tabId = $(element2).attr('id')
      if(trimmedId == tabId){
        $(element).find('img').clone().appendTo('#' + tabId + ' .lar-logo-wrapper');
        $(element2).find('img').removeClass('code-logo-wrapper').addClass('lar-logo-style');
      }
    });
  });
  //end of clone


  // scroll pre and next function

})
