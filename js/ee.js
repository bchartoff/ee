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

function randBetween(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}
function getPageNum(){
	return parseInt($("#page").attr("data-pageNum"))
}
function showPage(pageNum){
	center();
	$("#page").attr("data-pageNum", pageNum)
	$("#page").css("opacity",1)
	$("#page").attr("src", "/img/source " + pageNum + ".jpeg")
	$("#introLoad").animate({
		"opacity": 0
	}, 500)
	$(".control").animate({
		"opacity":1
	}, 1500)
}
function reshuffle(){
	$("#introLoad")
	.removeClass("default")
	.removeClass("disable")
	.addClass("animating")
	.attr("src", "/img/intro2.gif")
	.animate({
		"opacity": 1
	}, 500)
	$(".control").animate({
		"opacity":0
	}, 1500)
}
function center(){
	$("#page").css("top", 40-1*window.innerHeight + "px")
}

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
    $("#introLoad").click(function(){
		var img = $(this);
		if(img.hasClass("disable")){
			return false;
		}
		else if(img.hasClass("default")){
			img.removeClass("default");
			img.addClass("animating");
	        img.attr("src", "/img/intro1.gif");
	        window.setTimeout(function(){
	        	img.attr("src", "/img/intro2.gif");
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

