// jQuery code, two POST requests emitted from the buttons
$("document").ready(function() {

	$(".btn-success").on("click", function() {
		// AJAX request that sends data from several text fields to the back-end server
		$.ajax({
			url: "/",
			type: "POST",
			dataType: "json",
			data: {
				name: $("#name").val(),
				surname: $("#surname").val(),
				email: $("#email").val(),
				mungesat: $("#mungesat").val(),
				programimIorientuar: $("#programimIorientuar").val(),
                java: $("#java").val(),
                arkitekture: $("#arkitekture").val(),

			},
			// If we get a successful response, we display a 'Web form submitted successfully' message.
			success: function(data) {
					console.log("Hello");
					var msg = JSON.stringify(data.message).split("");
					msg.pop();
					msg.shift();
					$("#message").html(msg.join(""));
			}
		});
	});

	$(".btn-info").on("click", function() {
			// AJAX request that sends a name to the back-end, and tried to find a match in the database.
			$.ajax({
				url: "/find",
				type: "POST",
				dataType: "json",
				data: {
					name: $("#find_name").val()
				},
				// If we get a name, we filter it on the front-end, and display it in a paragraph.
				success: function(data) {
					$("#person").html(
						"Name: " +
						data.name +
						"<br>Surname: " +
						data.surname +
						"<br>Email: " +
						data.email +
						"<br>mungesat: " +
						data.mungesat +
						"<br>programimIorientuar: " +
						data.programimIorientuar +
						"<br>java: " +
						data.java +
						"<br>Arkitekture: " +
						data.arkitekture);
				}
			});
	});
	$('.btn-primary').on('click',function(){
       $.ajax({
          url: "/logout",
          type: "GET",
      success:function(json){
      window.location.href= "http://localhost:7000/";
      }
        });
        });
});

});

