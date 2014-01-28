
$(function(){

	$("#search").click(function(){
		var filter = $("#srcIdUtente").val();
		if(filter === "")
			alert("Digitare un nome");
		else
			window.open("/result/"+filter);
	});

});