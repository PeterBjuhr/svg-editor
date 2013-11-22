	var cord, last_m, drag = null;
	var svg = document.getElementById("svg");
	var maxX = svg.offsetWidth-1;
	var maxY = svg.offsetHeight-1;
	var c = document.getElementById("c");
	Init();
	
	//initial points
	function Init(){
				
		cord = {x: parseInt(c.getAttribute("cx"),10),
				y: parseInt(c.getAttribute("cy"),10)};
			
		// event handlers
		svg.onmousedown = svg.onmousemove = svg.onmouseup = Drag;
		svg.ontouchstart = svg.ontouchmove = svg.ontouchend = Drag;
		
		//reDrawSVG();
		
	}
	
	// move
	function Drag(e) {		
		
		
		
		e.stopPropagation();
		var et = e.type, m = mousePos(e);
	
		// start drag
		if (!drag && (et == "mousedown" || et == "touchstart")) {
			drag = c;
			last_m = m;		
		}
		
		// drag
		if (drag && (et == "mousemove" || et == "touchmove")) {
			id = drag.id;
			cord.x += m.x - last_m.x;
			cord.y += m.y - last_m.y;
			last_m = m;
			drag.setAttribute("cx", cord.x);
			drag.setAttribute("cy", cord.y);
			
			//activate dragging
			c.setAttribute("fill", "orange");
			
			//reDrawSVG();
		}
		
		// stop drag
		if (drag && (et == "mouseup" || et == "touchend")) {
			drag = null;
			//activate
			c.setAttribute("fill", "blue");
		}
	
	}
	
	// mouse position
	function mousePos(event) {
		return {
			x: Math.max(0, Math.min(maxX, event.pageX)),
			y: Math.max(0, Math.min(maxY, event.pageY))
		}
	}
	

