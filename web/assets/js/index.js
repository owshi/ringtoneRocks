$(document).ready(function(){
	var $document = $(document);

	$document.on("click", ".toggle-mobile-menu-js", function(){
		$(".mobile-menu").toggleClass('show');
	})
});