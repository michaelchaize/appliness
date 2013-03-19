// JavaScript Document


	

   if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
            Hammer.plugins.showTouches();
   }

	 if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
            Hammer.plugins.fakeMultitouch();
        }
   
   var hammertime = Hammer(document.getElementById('zoomwrapper1'), {
        transform_always_block: true,
        transform_min_scale: 1,
        drag_block_horizontal: true,
        drag_block_vertical: true,
        drag_min_distance: 0
    });
	
    var posX=0, posY=0,
		lastPosX=0, lastPosY=0,
		bufferX=0, bufferY=0,
        scale=1, last_scale,
        rotation= 1, last_rotation, dragReady=0;

    hammertime.on('touch drag dragend transform', function(ev) {
        elemRect = document.getElementById('zoom1');
		manageMultitouch(ev);
    });
	
	
	function manageMultitouch(ev){
		
		switch(ev.type) {
            case 'touch':
                last_scale = scale;
                last_rotation = rotation;
				
                break;

            case 'drag':
                	posX = ev.gesture.deltaX + lastPosX;
                	posY = ev.gesture.deltaY + lastPosY;
                break;

            case 'transform':
                rotation = last_rotation + ev.gesture.rotation;
                scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
                break;
				
			case 'dragend':
				lastPosX = posX;
				lastPosY = posY;
				break;
        }
		
        var transform =
                "translate3d("+posX+"px,"+posY+"px, 0) " +
                "scale3d("+scale+","+scale+", 0) " +
                "rotate("+rotation+"deg) ";
			
        elemRect.style.transform = transform;
        elemRect.style.oTransform = transform;
        elemRect.style.msTransform = transform;
        elemRect.style.mozTransform = transform;
        elemRect.style.webkitTransform = transform;
	}
	