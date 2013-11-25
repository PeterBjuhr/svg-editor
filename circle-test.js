	var cord={}, last_m, drag = null;
	var svg = document.getElementById("svg");
	var maxX = svg.offsetWidth-1;
	var maxY = svg.offsetHeight-1;
	var c1 = document.getElementById("c1");
	var c2 = document.getElementById("c2");
	Init();
	
	//initial cordinate
	function Init(){
				
		cord['c1'] = {x: parseInt(c1.getAttribute("cx"),10),
					y: parseInt(c1.getAttribute("cy"),10)};
		cord['c2'] = {x: parseInt(c2.getAttribute("cx"),10),
					y: parseInt(c2.getAttribute("cy"),10)};
			
		// event handlers
		svg.onmousedown = svg.onmousemove = svg.onmouseup = Drag;
		svg.ontouchstart = svg.ontouchmove = svg.ontouchend = Drag;
		
		//reDrawSVG();
		
	}
	
	// move
	function Drag(e) {		
		
		
		
		e.stopPropagation();
		var ct = e.target, id = ct.id, et = e.type, m = mousePos(e);
	
		// start drag
		if (!drag && (et == "mousedown" || et == "touchstart")) {
			drag = ct;
			last_m = m;		
		}
		
		// drag
		if (drag && (et == "mousemove" || et == "touchmove")) {
			id = drag.id;
			cord[id].x += m.x - last_m.x;
			cord[id].y += m.y - last_m.y;
			last_m = m;
			drag.setAttribute("cx", cord[id].x);
			drag.setAttribute("cy", cord[id].y);
			
			//activate dragging
			ct.setAttribute("fill", "orange");
			
			//reDrawSVG();
		}
		
		// stop drag
		if (drag && (et == "mouseup" || et == "touchend")) {
			drag = null;
			//activate
			ct.setAttribute("fill", "blue");
		}
	
	}
	
	// mouse position
	function mousePos(event) {
		return {
			x: Math.max(0, Math.min(maxX, event.pageX)),
			y: Math.max(0, Math.min(maxY, event.pageY))
		}
	}
	

