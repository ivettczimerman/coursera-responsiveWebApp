var list_template, category_template, animal_template, slideshow_template;

var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

function showTemplate(template, data){
	var html    = template(data);
	$('#content').html(html);
}

$(document).ready(function(){
	var source   = $("#list-template").html();
	list_template = Handlebars.compile(source);
	
	source   = $("#category-template").html();
	category_template = Handlebars.compile(source);
	
	source   = $("#animal-template").html();
	animal_template = Handlebars.compile(source);
	
	source   = $("#slideshow-template").html();
	slideshow_template = Handlebars.compile(source);
	
	$("#list-tab").click(function () {

		// displays the albums template
		showTemplate(list_template, animals_data);

		// make the albums tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make albums tab active
		$("#list-tab").addClass("active");

		// add a click callback to each album 
		// thumbnail which displays the photos
		// template on that album
		// (I have written out the code for this 
		// function for clarity but it is actually
		// pretty much the same as the photos tab
		// function so we could acutally just
		// call $(".photo-thumbnail").click() ) 
		$(".album-thumbnail").click(function (){
			
			// get the index (position in the array)
			// of the album we clicked on
			// "this" is the element that was clicked on
			// data("id") gets the attribute data-id
			// (which we set to the index of the album in
			// the array - @index)
			var index = $(this).data("id");

			// set the current album to this album
			current_category = animals_data.category[index];

			// displays the photos template
			showTemplate(category_template, current_category);

			// add an on click al all the photo thumbnails
			// which displays the photo in a modal popup
			$(".photo-thumbnail").click(function (){
				// get the index (position in the array)
				// of the photo we clicked on
				// "this" is the element that was clicked on
				// data("id") gets the attribute data-id
				// (which we set to the index of the photo in
				// the array - @index)
				var index = $(this).data("id");

				// set the current photo to this photo
				current_animal = current_category.animals[index];
				
				// displays the single photo template
				showTemplate(animal_template, current_animal);
			});
		});
	});
	
	$("#category-tab").click(function () {
		
		showTemplate(category_template, current_category);

		$(".nav-tabs .active").removeClass("active");
		
		$("#category-tab").addClass("active");

		$(".photo-thumbnail").click(function (){
			
			var index = $(this).data("id");

			current_animal = current_category.animals[index];
			
			showTemplate(animal_template, current_animal);
		});
	});
	
	$("#animal-tab").click(function () {
		// display the slideshow template using the 
		// current album
		showTemplate(animal_template, current_animal);
		
		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$("#animal-tab").addClass("active");
	});
	
	$("#slideshow-tab").click(function () {
		// display the slideshow template using the 
		// current album
		showTemplate(slideshow_template, animals_data);
		
		// make the slideshow tab the active one
		// first make the currently active tab inactive
		$(".nav-tabs .active").removeClass("active");
		// then make slideshow tab active
		$("#slideshow-tab").addClass("active");
	});
	
	$("#slideshow-tab").click();
});