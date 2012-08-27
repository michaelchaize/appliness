// JavaScript worker
	
self.addEventListener('message', function(event) {

    var sum = 0;
				for (var i = 0; i < 3000; i++) {
					for (var j = 0; j < 2000; j++) {
						sum++;
					}
	}
    self.postMessage(sum);
}, false);