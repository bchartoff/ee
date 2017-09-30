function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

function IS_MOBILE(){
	return $("#isMobile").css("display") == "block"
}

function randBetween(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}
function getPageNum(){
	return parseInt($("#page").attr("data-pageNum"))
}
function showPage(pageNum){
	$("#share").val("https://bchartoff.github.io/ee/index.html?poem=" + pageNum)
	center();
	$("#page").attr("data-pageNum", pageNum)
	$("#page").css("opacity",1)
	$("#page").attr("src", "https://bchartoff.github.io/ee/img/source%20" + pageNum + ".jpeg")
	$("#introLoad").animate({
		"opacity": 0
	}, 500)
	window.setTimeout(function(){
		$("#introLoad").css("z-index",-1)
	}, 700)
	$(".control").animate({
		"opacity":1
	}, 1500)
}
function reshuffle(){
	if(IS_MOBILE()){
		$("#page").css("opacity",0)
	}
	$("#introLoad").css("z-index",2)
	$("#introLoad")
		.removeClass("default")
		.removeClass("disable")
		.addClass("animating")
		.attr("src", "https://bchartoff.github.io/ee/img/intro2.gif")
		.animate({
			"opacity": 1
		}, 500)
		$(".control").animate({
			"opacity":0
		}, 1000)
}
function center(){
	if(IS_MOBILE()){
		$("#page").css("top", -40-1*(parseFloat(document.getElementById("introLoad").getBoundingClientRect().height)) + "px")	
	}else{
		$("#page").css("top", 80-1*window.innerHeight + "px")	
	}
	$("#container").css("height", (window.innerHeight - 40)  + "px")
}
$(window).on("resize", function(){
	center();
})

$(document).ready(function()
{
	var poem = getQueryVariable("poem")
	if(typeof(poem) != "undefined"){
		$("#introLoad").removeClass("default")
		$("#introLoad").addClass("disable")
		$("#introLoad").css("opacity",0)
		$(".control").css("opacity",1)
		showPage(poem)
	}
	center();
	$(".left.arrow").click(function(){
		var pageNum = getPageNum()
		showPage(pageNum - 1)
	})
	$(".right.arrow").click(function(){
		var pageNum = getPageNum()
		showPage(pageNum + 1)
	})
	$("#reshuffle").click(function(){
		reshuffle();
	})
    $("#introLoad").click(function(){
		var img = $(this);
		if(img.hasClass("disable")){
			return false;
		}
		else if(img.hasClass("default")){
			img.removeClass("default");
			img.addClass("animating");
	        img.attr("src", "https://bchartoff.github.io/ee/img/intro1.gif");
	        window.setTimeout(function(){
	        	img.attr("src", "https://bchartoff.github.io/ee/img/intro2.gif");
	        }, 4700)
	    }
	    else if(img.hasClass("animating")){
			img.removeClass("animating");
			img.addClass("disable");
	    	var pageNum = randBetween(36,1086)
	    	showPage(pageNum)
	    }
     })
});

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 100 ) {
            /* left swipe */
			var pageNum = getPageNum()
			showPage(pageNum - 1)
        }
        else if (xDiff < -100) {
            /* right swipe */
			var pageNum = getPageNum()
			showPage(pageNum + 1)
        }                       
    } else {
        // if ( yDiff > 0 ) {
        //     /* up swipe */ 
        // } else { 
        //     /* down swipe */
        // }
        return;                                                              
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

