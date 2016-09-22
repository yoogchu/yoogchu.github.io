$(function(){
  $("#siteSubtitle").typed({
	  strings: ["Yellow Jacket", "Hackathon Enthusiast", "Graphic Designer", "Web Developer^1000"],
	  typeSpeed: 25,
	  backDelay: 1000,
	  loop: false,
	  callback: function(){
		$(".fold").css("height", "80%");
		$(".centered").css("top", "40%");
		}
  });
});