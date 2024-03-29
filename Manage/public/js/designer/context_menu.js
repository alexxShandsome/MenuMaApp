// NOTE: undeclared variables are located in designer.js
// canvas
// iro
// fabric
// canvas_zoom

let pointer_x, pointer_y;
function get_selected_objects() {
	if (!canvas) return;
	console.log("called get_selected_objects()");

	canvas.on('mouse:up', function(event) {
		console.log("canvas mouse:up event");
		const selected_objects = canvas.getActiveObjects();
		const { x, y } = canvas.getPointer();
		pointer_x = x;
		pointer_y = y;

		// if canvas is clicked
		if (selected_objects.length == 0) {
			// hide context menu when left-clicked in any place of canvas
			if (event.button === 1) context_menu("hide");

			// show context menu when right-clicked in any place of canvas
			if (event.button === 3) context_menu("show");
		}

		// if objects are clieked
		else {
			// log left-clicked objects
			selected_objects.forEach(object => {
				console.log(`Left clicked object - Type: ${object.type}, Object ID: ${object.object_id}`);
			})

			// show context menu on right click
			if (event.button === 3) {
				// log right-clicked objects
				selected_objects.forEach(object => {
					console.log(`Right clicked object - Type: ${object.type}, Object ID: ${object.object_id}`);
				});

				// show context menu on right-clicked objects
				context_menu("show");
			}
		}
	});

	canvas.on("mouse:down", function() {
		console.log("canvas mouse:down event");
		// hide context menu when the mouse is pressed down
		context_menu("hide");
	})
}

function context_menu(display_style) {
	if (!canvas) return;
	console.log(`called context_menu(${display_style})`)
	const context_menu = document.getElementById('context_menu');

	if (display_style === "hide")
		context_menu.style.display = "none";
	else if (display_style === "show") {
		// display context menu based on the mouse pointer position
		context_menu.style.display = 'block';
		context_menu.style.left = ((pointer_x * canvas_zoom) + 80) + 'px';
		context_menu.style.top = ((pointer_y * canvas_zoom) + 90) + 'px';

		const selected_objects = canvas.getActiveObjects();
		document.getElementById("context_menu_select_group").style.display = "none";
		document.getElementById("layer_bring_to_front").style.display = "none";
		document.getElementById("layer_bring_forward").style.display = "none";
		document.getElementById("layer_send_backward").style.display = "none";
		document.getElementById("layer_send_to_back").style.display = "none";
		document.getElementById("context_menu_properties").style.display = "none";

		if (selected_objects.length > 0) {
			document.getElementById("layer_bring_to_front").style.display = "flex";
			document.getElementById("layer_bring_forward").style.display = "flex";
			document.getElementById("layer_send_backward").style.display = "flex";
			document.getElementById("layer_send_to_back").style.display = "flex";
		}

		// show context menu properties if there's only one object selected
		if (selected_objects.length == 1) {
			document.getElementById("context_menu_select_group").style.display = "flex";
			document.getElementById("context_menu_properties").style.display = "flex";
		}
	}
}

function get_selected_object_group() {
	if (!canvas) return;
	console.log("called get_selected_object_group()");
	const selected_object = canvas.getActiveObject();
	const canvas_objects = canvas.getObjects();

	// Find objects with the same group_id
	const similarObjects = canvas_objects.filter(obj => obj.group_id === selected_object.group_id);

	if (similarObjects.length > 0) {
		context_menu("hide");
		// Clear the current selection
		canvas.discardActiveObject();
		canvas.requestRenderAll();

		// Create an ActiveSelection and set it as active
		var selection = new fabric.ActiveSelection(similarObjects, { canvas: canvas });
		canvas.setActiveObject(selection);
		canvas.requestRenderAll();
	}
}

function object_properties(display_style) {
	if (!canvas) return;
	console.log(`called object_properties(${display_style})`);
	const properties_element = document.getElementById("object_properties");
	const selected_object = canvas.getActiveObjects()[0];

	if (display_style === "hide") {
		// remove event listeners when object properties window is hidden or closed
		if (change_text_font_listener)
			document.getElementById("text_font").removeEventListener("input", change_text_font_listener);
		if (change_text_font_size_listener)
			document.getElementById("text_font").removeEventListener("input", change_text_font_size_listener);

		// hide object properties window
		properties_element.style.display = "none";
	}

	else if (display_style === "show") {
		context_menu("hide");

		// render object properties window
		properties_element.style.display = 'block';
		properties_element.style.left = ((pointer_x * canvas_zoom) + 80) + 'px';
		properties_element.style.top = ((pointer_y * canvas_zoom) + 90) + 'px';
		properties_window_drag_event();

		const object_type = selected_object.type;
		const object_group_id = selected_object.group_id;
		const object_id = selected_object.object_id;

		document.getElementById("object_properties_object_type").innerHTML = object_type;
		document.getElementById("object_properties_group_id").innerHTML = object_group_id;
		document.getElementById("object_properties_object_id").innerHTML = object_id;

		document.getElementById("object_properties_text").style.display = "none";
		document.getElementById("object_properties_img").style.display = "none";
		document.getElementById("object_properties_rect").style.display = "none";
		document.getElementById("object_properties_circ").style.display = "none";
		document.getElementById("object_properties_line").style.display = "none";

		const object_properties_map = {
			"text": text_object_properties,
			"i-text": text_object_properties,
			"rect": rect_object_properties,
			"circle": circ_object_properties,
			"image": img_object_properties,
			"line": line_object_properties,
		};

		const selected_object_function = object_properties_map[object_type];

		// use appropriate properties element to each individual object type
		if (selected_object_function)
			selected_object_function(selected_object);
	}
	else console.log("Use 'hide' or 'show' as arguments");

}

// text or itext object input event listeners
var change_text_font_listener;
var change_text_font_size_listener;
var change_text_fill_listener;
var text_fill_color_picker;
function text_object_properties(object) {
	console.log(`called text_object_properties(${object})`);
	document.getElementById("object_properties_text").style.display = "initial";
	document.getElementById("text_font").value = object.fontFamily;
	document.getElementById("text_font_size").value = object.fontSize;

	if (change_text_font_listener)
		document.getElementById("text_font").removeEventListener("input", change_text_font_listener);
	change_text_font_listener = function() {
		console.log("called change_text_font_listener()")
		object.set({ fontFamily: this.value });
		canvas.renderAll();
	}
	document.getElementById("text_font").addEventListener("input", change_text_font_listener);

	if (change_text_font_size_listener)
		document.getElementById("text_font_size").removeEventListener("input", change_text_font_size_listener);
	change_text_font_size_listener = function() {
		console.log("called change_text_font_size_listener()")
		object.set({ fontSize: this.value })
		canvas.renderAll();
	}
	document.getElementById("text_font_size").addEventListener("input", change_text_font_size_listener);

	var text_fill_rgb_values = object.fill.match(/\d+/g);
	document.getElementById("text_fill_color_r").value = text_fill_rgb_values[0]
	document.getElementById("text_fill_color_g").value = text_fill_rgb_values[1]
	document.getElementById("text_fill_color_b").value = text_fill_rgb_values[2]

	// to prevent stacking up of color picker every time object properties is open
	if (text_fill_color_picker) {
		document.getElementById("text_fill_color_picker").innerHTML = "";
	}

	text_fill_color_picker = new iro.ColorPicker("#text_fill_color_picker", {
		// Set the size of the color picker
		width: 150,
		// set initial color to object's original fill
		color: object.fill,
		layoutDirection: "horizontal",
		borderWidth: 1,
		borderColor: "#000000"
	});

	let red = document.getElementById("text_fill_color_r").value;
	let green = document.getElementById("text_fill_color_g").value;
	let blue = document.getElementById("text_fill_color_b").value;

	text_fill_color_picker.on('color:change', function(color) {
		red = color.rgb.r;
		green = color.rgb.g;
		blue = color.rgb.b;
		document.getElementById("text_fill_color_r").value = red;
		document.getElementById("text_fill_color_g").value = green;
		document.getElementById("text_fill_color_b").value = blue;
	})

	function update_color_picker() {
		var new_color = `rgb(${red}, ${green}, ${blue})`
		text_fill_color_picker.color.set(new_color);
	}

	document.getElementById("text_fill_color_r").addEventListener("input", function() {
		red = this.value;
		update_color_picker();
	});
	document.getElementById("text_fill_color_g").addEventListener("input", function() {
		green = this.value;
		update_color_picker();
	});
	document.getElementById("text_fill_color_b").addEventListener("input", function() {
		blue = this.value;
		update_color_picker();
	});

	if (change_text_fill_listener)
		document.getElementById("text_fill_change").removeEventListener("click", change_text_fill_listener);
	change_text_fill_listener = function() {
		console.log("called change_text_fill_listener()");
		object.set({ fill: `rgb(${red}, ${green}, ${blue})` })
		canvas.renderAll();
	}
	document.getElementById("text_fill_change").addEventListener("click", change_text_fill_listener);
}

function img_object_properties(object) {
	console.log(`called img_object_properties()`);
	document.getElementById("object_properties_img").style.display = "flex";

}

var change_rect_radius_listener;
var change_rect_fill_listener;
var change_rect_stroke_width_listener;
var change_rect_stroke_listener;
var rect_fill_color_picker;
var rect_stroke_color_picker;
function rect_object_properties(object) {
	console.log(`called rect_object_properties(${object})`);
	document.getElementById("object_properties_rect").style.display = "initial";

	// rect radius
	document.getElementById("rect_radius").value = object.rx;
	if (change_rect_radius_listener) {
		document.getElementById("rect_radius").removeEventListener("input", change_rect_radius_listener);
	}
	change_rect_radius_listener = function() {
		console.log("called change_rect_radius_listener()");
		object.set({ rx: parseFloat(this.value), ry: parseFloat(this.value) });
		canvas.renderAll();
	}
	document.getElementById("rect_radius").addEventListener("input", change_rect_radius_listener);

	// initial fill color input values
	var rect_fill_rgba_values = object.fill.match(/\d+/g);
	document.getElementById("rect_fill_color_r").value = rect_fill_rgba_values[0];
	document.getElementById("rect_fill_color_g").value = rect_fill_rgba_values[1];
	document.getElementById("rect_fill_color_b").value = rect_fill_rgba_values[2];
	document.getElementById("rect_fill_color_a").value = rect_fill_rgba_values[3];
	// to prevent stacking up of color picker every time object properties is open
	if (rect_fill_color_picker) {
		document.getElementById("rect_fill_color_picker").innerHTML = "";
	}
	rect_fill_color_picker = new iro.ColorPicker("#rect_fill_color_picker", {
		// Set the size of the color picker
		width: 150,
		// set initial color to object's original fill
		color: object.fill,
		layoutDirection: "horizontal",
		borderWidth: 1,
		borderColor: "#000000",
		layout: [
			{
				component: iro.ui.Wheel,
				options: {}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "value"
				}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "alpha"
				}
			},
		]
	});

	// handle fill color inputs
	var fill_red = rect_fill_rgba_values[0];
	var fill_green = rect_fill_rgba_values[1];
	var fill_blue = rect_fill_rgba_values[2];
	var fill_alpha = rect_fill_rgba_values[3];
	rect_fill_color_picker.on("color:change", function(color) {
		fill_red = color.rgba.r;
		fill_green = color.rgba.g;
		fill_blue = color.rgba.b;
		fill_alpha = color.rgba.a;
		document.getElementById("rect_fill_color_r").value = fill_red;
		document.getElementById("rect_fill_color_g").value = fill_green;
		document.getElementById("rect_fill_color_b").value = fill_blue;
		document.getElementById("rect_fill_color_a").value = fill_alpha;
	})
	function update_rect_fill_color_picker() {
		var new_color = `rgba(${fill_red}, ${fill_green}, ${fill_blue}, ${fill_alpha})`
		rect_fill_color_picker.color.set(new_color);
	}
	document.getElementById("rect_fill_color_r").addEventListener("input", function() {
		fill_red = this.value;
		update_rect_fill_color_picker();
	})
	document.getElementById("rect_fill_color_g").addEventListener("input", function() {
		fill_green = this.value;
		update_rect_fill_color_picker();
	})
	document.getElementById("rect_fill_color_b").addEventListener("input", function() {
		fill_blue = this.value;
		update_rect_fill_color_picker();
	})
	document.getElementById("rect_fill_color_a").addEventListener("input", function() {
		fill_alpha = this.value;
		update_rect_fill_color_picker();
	})

	if (change_rect_fill_listener) {
		document.getElementById("rect_fill_change").removeEventListener("click", change_rect_fill_listener);
	}
	change_rect_fill_listener = function() {
		console.log("called change_rect_fill_listener()");
		object.set({ fill: `rgba(${fill_red}, ${fill_green}, ${fill_blue}, ${fill_alpha})` });
		canvas.renderAll();
	}
	// change rect fill button
	document.getElementById("rect_fill_change").addEventListener("click", change_rect_fill_listener);

	// stroke width
	document.getElementById("rect_stroke_width").value = object.strokeWidth;
	if (change_rect_stroke_width_listener)
		document.getElementById("rect_stroke_width").removeEventListener("input", change_rect_stroke_width_listener);
	change_rect_stroke_width_listener = function() {
		console.log("called change_rect_stroke_width_listener()");
		object.set({ strokeWidth: parseFloat(this.value) });
		canvas.renderAll();
	}
	document.getElementById("rect_stroke_width").addEventListener("input", change_rect_stroke_width_listener);

	// initial stroke color input values
	var rect_stroke_rgba_values = object.stroke.match(/\d+/g);
	document.getElementById("rect_stroke_color_r").value = rect_stroke_rgba_values[0];
	document.getElementById("rect_stroke_color_g").value = rect_stroke_rgba_values[1];
	document.getElementById("rect_stroke_color_b").value = rect_stroke_rgba_values[2];
	document.getElementById("rect_stroke_color_a").value = rect_stroke_rgba_values[3];
	// to prevent stacking up of color picker every time object properties is open
	if (rect_stroke_color_picker) {
		document.getElementById("rect_stroke_color_picker").innerHTML = "";
	}
	rect_stroke_color_picker = new iro.ColorPicker("#rect_stroke_color_picker", {
		// Set the size of the color picker
		width: 150,
		// set initial color to object's original fill
		color: object.stroke,
		layoutDirection: "horizontal",
		borderWidth: 1,
		borderColor: "#000000",
		layout: [
			{
				component: iro.ui.Wheel,
				options: {}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "value"
				}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "alpha"
				}
			},
		]
	})

	// handle stroke color inputs
	var stroke_red = document.getElementById("rect_stroke_color_r").value;
	var stroke_green = document.getElementById("rect_stroke_color_g").value;
	var stroke_blue = document.getElementById("rect_stroke_color_b").value;
	var stroke_alpha = document.getElementById("rect_stroke_color_a").value;
	rect_stroke_color_picker.on("color:change", function(color) {
		stroke_red = color.rgba.r;
		stroke_green = color.rgba.g;
		stroke_blue = color.rgba.b;
		stroke_alpha = color.rgba.a;
		document.getElementById("rect_stroke_color_r").value = stroke_red;
		document.getElementById("rect_stroke_color_g").value = stroke_green;
		document.getElementById("rect_stroke_color_b").value = stroke_blue;
		document.getElementById("rect_stroke_color_a").value = stroke_alpha;
	})
	function update_rect_stroke_color_picker() {
		var new_color = `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_alpha})`
		rect_stroke_color_picker.color.set(new_color);
	}
	document.getElementById("rect_stroke_color_r").addEventListener("input", function() {
		stroke_red = this.value;
		update_rect_stroke_color_picker();
	});
	document.getElementById("rect_stroke_color_g").addEventListener("input", function() {
		stroke_green = this.value;
		update_rect_stroke_color_picker();
	});
	document.getElementById("rect_stroke_color_b").addEventListener("input", function() {
		stroke_blue = this.value;
		update_rect_stroke_color_picker();
	});
	document.getElementById("rect_stroke_color_a").addEventListener("input", function() {
		stroke_alpha = this.value;
		update_rect_stroke_color_picker();
	});
	if (change_rect_stroke_listener) {
		document.getElementById("rect_stroke_change").removeEventListener("click", change_rect_stroke_listener);
	}
	change_rect_stroke_listener = function() {
		console.log("called change_rect_stroke_listener()");
		object.set({ stroke: `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_alpha})` });
		canvas.renderAll();
	}
	document.getElementById("rect_stroke_change").addEventListener("click", change_rect_stroke_listener);
}

var change_circ_fill_listener;
var change_circ_stroke_width_listener;
var change_circ_stroke_listener;
var circ_fill_color_picker;
var circ_stroke_color_picker;
function circ_object_properties(object) {
	console.log(`called circ_object_properties(${object})`);
	document.getElementById("object_properties_circ").style.display = "initial";

	// initial fill color input values
	var circ_fill_rgba_values = object.fill.match(/\d+/g);
	document.getElementById("circ_fill_color_r").value = circ_fill_rgba_values[0];
	document.getElementById("circ_fill_color_g").value = circ_fill_rgba_values[1];
	document.getElementById("circ_fill_color_b").value = circ_fill_rgba_values[2];
	document.getElementById("circ_fill_color_a").value = circ_fill_rgba_values[3];
	// to prevent stacking up of color picker every time object properties is open
	if (circ_fill_color_picker) {
		document.getElementById("circ_fill_color_picker").innerHTML = "";
	}
	circ_fill_color_picker = new iro.ColorPicker("#circ_fill_color_picker", {
		// Set the size of the color picker
		width: 150,
		// set initial color to object's original fill
		color: object.fill,
		layoutDirection: "horizontal",
		borderWidth: 1,
		borderColor: "#000000",
		layout: [
			{
				component: iro.ui.Wheel,
				options: {}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "value"
				}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "alpha"
				}
			},
		]
	});

	// handle fill color inputs
	var fill_red = circ_fill_rgba_values[0];
	var fill_green = circ_fill_rgba_values[1];
	var fill_blue = circ_fill_rgba_values[2];
	var fill_alpha = circ_fill_rgba_values[3];
	circ_fill_color_picker.on("color:change", function(color) {
		fill_red = color.rgba.r;
		fill_green = color.rgba.g;
		fill_blue = color.rgba.b;
		fill_alpha = color.rgba.a;
		document.getElementById("circ_fill_color_r").value = fill_red;
		document.getElementById("circ_fill_color_g").value = fill_green;
		document.getElementById("circ_fill_color_b").value = fill_blue;
		document.getElementById("circ_fill_color_a").value = fill_alpha;
	})
	function update_circ_fill_color_picker() {
		var new_color = `rgba(${fill_red}, ${fill_green}, ${fill_blue}, ${fill_alpha})`
		circ_fill_color_picker.color.set(new_color);
	}
	document.getElementById("circ_fill_color_r").addEventListener("input", function() {
		fill_red = this.value;
		update_circ_fill_color_picker();
	});
	document.getElementById("circ_fill_color_g").addEventListener("input", function() {
		fill_green = this.value;
		update_circ_fill_color_picker();
	});
	document.getElementById("circ_fill_color_b").addEventListener("input", function() {
		fill_blue = this.value;
		update_circ_fill_color_picker();
	});
	document.getElementById("circ_fill_color_a").addEventListener("input", function() {
		fill_alpha = this.value;
		update_circ_fill_color_picker();
	});
	if (change_circ_fill_listener) {
		document.getElementById("circ_fill_change").removeEventListener("click", change_circ_fill_listener);
	}
	change_circ_fill_listener = function() {
		console.log("called change_circ_fill_listener()");
		object.set({ fill: `rgba(${fill_red}, ${fill_green}, ${fill_blue}, ${fill_alpha})` });
		canvas.renderAll();
	}
	document.getElementById("circ_fill_change").addEventListener("click", change_circ_fill_listener);

	// stroke width
	document.getElementById("circ_stroke_width").value = object.strokeWidth;
	if (change_circ_stroke_width_listener)
		document.getElementById("circ_stroke_width").removeEventListener("input", change_circ_stroke_width_listener);
	change_circ_stroke_width_listener = function() {
		console.log("called change_circ_stroke_width_listener()");
		object.set({ strokeWidth: parseFloat(this.value) });
		canvas.renderAll();
	}
	document.getElementById("circ_stroke_width").addEventListener("input", change_circ_stroke_width_listener);

	// initial stroke color input values
	var circ_stroke_rgba_values = object.stroke.match(/\d+/g);
	document.getElementById("circ_stroke_color_r").value = circ_stroke_rgba_values[0];
	document.getElementById("circ_stroke_color_g").value = circ_stroke_rgba_values[1];
	document.getElementById("circ_stroke_color_b").value = circ_stroke_rgba_values[2];
	document.getElementById("circ_stroke_color_a").value = circ_stroke_rgba_values[3];
	// to prevent stacking up of color picker every time object properties is open
	if (circ_stroke_color_picker) {
		document.getElementById("circ_stroke_color_picker").innerHTML = "";
	}
	circ_stroke_color_picker = new iro.ColorPicker("#circ_stroke_color_picker", {
		// Set the size of the color picker
		width: 150,
		// set initial color to object's original fill
		color: object.stroke,
		layoutDirection: "horizontal",
		borderWidth: 1,
		borderColor: "#000000",
		layout: [
			{
				component: iro.ui.Wheel,
				options: {}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "value"
				}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "alpha"
				}
			},
		]
	});

	var stroke_red = circ_stroke_rgba_values[0];
	var stroke_green = circ_stroke_rgba_values[1];
	var stroke_blue = circ_stroke_rgba_values[2];
	var stroke_alpha = circ_stroke_rgba_values[3];
	circ_stroke_color_picker.on("color:change", function(color) {
		stroke_red = color.rgba.r;
		stroke_green = color.rgba.g;
		stroke_blue = color.rgba.b;
		stroke_alpha = color.rgba.a;
		document.getElementById("circ_stroke_color_r").value = stroke_red;
		document.getElementById("circ_stroke_color_g").value = stroke_green;
		document.getElementById("circ_stroke_color_b").value = stroke_blue;
		document.getElementById("circ_stroke_color_a").value = stroke_alpha;
	})
	function update_circ_stroke_color_picker() {
		var new_color = `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_alpha})`
		circ_stroke_color_picker.color.set(new_color);
	}
	document.getElementById("circ_stroke_color_r").addEventListener("input", function() {
		stroke_red = this.value;
		update_circ_stroke_color_picker();
	});
	document.getElementById("circ_stroke_color_g").addEventListener("input", function() {
		stroke_green = this.value;
		update_circ_stroke_color_picker();
	});
	document.getElementById("circ_stroke_color_b").addEventListener("input", function() {
		stroke_blue = this.value;
		update_circ_stroke_color_picker();
	});
	document.getElementById("circ_stroke_color_a").addEventListener("input", function() {
		stroke_alpha = this.value;
		update_circ_stroke_color_picker();
	});
	if (change_circ_stroke_listener) {
		document.getElementById("circ_stroke_change").removeEventListener("click", change_circ_stroke_listener);
	}
	change_circ_stroke_listener = function() {
		console.log("called change_circ_stroke_listener()");
		object.set({ stroke: `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_alpha})` });
		canvas.renderAll();
	}
	document.getElementById("circ_stroke_change").addEventListener("click", change_circ_stroke_listener);
}

var change_line_stroke_listener;
var line_stroke_color_picker;
function line_object_properties(object) {
	console.log(`called line_object_properties(${object})`);
	document.getElementById("object_properties_line").style.display = "initial";

	// initial stroke color input values
	var line_stroke_rgba_values = object.stroke.match(/\d+/g);
	document.getElementById("line_stroke_color_r").value = line_stroke_rgba_values[0];
	document.getElementById("line_stroke_color_g").value = line_stroke_rgba_values[1];
	document.getElementById("line_stroke_color_b").value = line_stroke_rgba_values[2];
	document.getElementById("line_stroke_color_a").value = line_stroke_rgba_values[3];

	// to prevent stacking up of color picker every time object properties is open
	if (line_stroke_color_picker) {
		document.getElementById("line_stroke_color_picker").innerHTML = "";
	}
	line_stroke_color_picker = new iro.ColorPicker("#line_stroke_color_picker", {
		// Set the size of the color picker
		width: 150,
		// set initial color to object's original fill
		color: object.stroke,
		layoutDirection: "horizontal",
		borderWidth: 1,
		borderColor: "#000000",
		layout: [
			{
				component: iro.ui.Wheel,
				options: {}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "value"
				}
			},
			{
				component: iro.ui.Slider,
				options: {
					sliderType: "alpha"
				}
			},
		]
	});

	var stroke_red = document.getElementById("line_stroke_color_r").value;
	var stroke_green = document.getElementById("line_stroke_color_g").value;
	var stroke_blue = document.getElementById("line_stroke_color_b").value;
	var stroke_alpha = document.getElementById("line_stroke_color_a").value;

	line_stroke_color_picker.on("color:change", function(color) {
		stroke_red = color.rgba.r;
		stroke_green = color.rgba.g;
		stroke_blue = color.rgba.b;
		stroke_alpha = color.rgba.a;
		document.getElementById("line_stroke_color_r").value = stroke_red;
		document.getElementById("line_stroke_color_g").value = stroke_green;
		document.getElementById("line_stroke_color_b").value = stroke_blue;
		document.getElementById("line_stroke_color_a").value = stroke_alpha;
	})

	function update_color_picker() {
		var new_color = `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_alpha})`
		line_stroke_color_picker.color.set(new_color);
	}

	document.getElementById("line_stroke_color_r").addEventListener("input", function() {
		stroke_red = this.value;
		update_color_picker();
	});
	document.getElementById("line_stroke_color_g").addEventListener("input", function() {
		stroke_green = this.value;
		update_color_picker();
	});
	document.getElementById("line_stroke_color_b").addEventListener("input", function() {
		stroke_blue = this.value;
		update_color_picker();
	});
	document.getElementById("line_stroke_color_a").addEventListener("input", function() {
		stroke_alpha = this.value;
		update_color_picker();
	});

	// change stroke color button
	if (change_line_stroke_listener) {
		document.getElementById("line_stroke_change").removeEventListener("click", change_line_stroke_listener);
	}
	change_line_stroke_listener = function() {
		console.log("called change_line_stroke_listener()");
		object.set({ stroke: `rgba(${stroke_red}, ${stroke_green}, ${stroke_blue}, ${stroke_alpha})` });
		canvas.renderAll();
	}
	document.getElementById("line_stroke_change").addEventListener("click", change_line_stroke_listener);
}

function canvas_properties() {

}

function adjust_object_layer(order) {
	if (!canvas) return
	console.log(`called adjust_object_layer(${order})`);
	context_menu("hide");

	const selected_objects = canvas.getActiveObjects();
	selected_objects.forEach(object => {
		if (order === "bring_to_front") canvas.bringToFront(object);
		if (order === "bring_forward") canvas.bringForward(object);
		if (order === "send_backward") canvas.sendBackwards(object);
		if (order === "send_to_back") canvas.sendToBack(object);
	});
	canvas.requestRenderAll();
}

function properties_window_drag_event() {
	console.log("called properties_window_drag_event()");
	const properties_element = document.getElementById("object_properties");
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById("object_properties_header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById("object_properties_header").onmousedown = dragMouseDown;
	}
	else {
		// otherwise, move the DIV from anywhere inside the DIV:
		properties_element.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		properties_element.style.top = (properties_element.offsetTop - pos2) + "px";
		properties_element.style.left = (properties_element.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}

}

function supported_font_checker() {
	const fontCheck = new Set([
		// Windows 10
		'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
		// macOS
		'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
	].sort());

	(async () => {
		await document.fonts.ready;

		const fontAvailable = new Set();

		for (const font of fontCheck.values()) {
			if (document.fonts.check(`12px "${font}"`)) {
				fontAvailable.add(font);
			}
		}

		console.log('Available Fonts:', [...fontAvailable.values()]);
	})();
}
