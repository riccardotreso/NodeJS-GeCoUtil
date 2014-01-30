
$(function(){

	$("#search").click(function(){
		var filter = $("#srcIdUtente").val();
		if(filter === "")
			alert("Digitare un filtro");
		else
		{
			var type = $("input[type='radio'][name='type_filter']:checked").val();
			window.open("/result/"+type+"/"+filter);
		}
	});

});