package
{
	import flash.events.AccelerometerEvent;
	import flash.media.Sound;
	import flash.sensors.Accelerometer;
	import starling.animation.Tween;
	import starling.core.Starling;
	import starling.display.Image;
	import starling.display.MovieClip;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.extensions.PDParticleSystem;
	import starling.textures.Texture;
	import starling.textures.TextureAtlas;
	
	public class testStarlingiOS extends Sprite
	{
		
		[Embed(source="bobby-starling.xml", mimeType="application/octet-stream")]
		private var AtlasXML:Class;
		
		[Embed(source="bobby-starling.png")]
		private var AtlasTexture:Class;
		
		[Embed(source="Moon.xml", mimeType="application/octet-stream")]
		private var AtlasXMLMoon:Class;
		
		[Embed(source="Moon.png")]
		private var AtlasTextureMoon:Class;
		
		[Embed(source = "assets/sky.jpg")]
		private static const SkyBackground:Class;
		
		[Embed(source="fireParticule.pex", mimeType="application/octet-stream")]
		public static  var ParticuleXML:Class;
		
		[Embed(source="particleTexture.png")]
		public static  var ParticuleTexture:Class;
		
		[Embed(source="assets/s03-slots_06.mp3")]
		private var jumpSound:Class;
		
		private var particle:PDParticleSystem;
		
		private var jumpySound:Sound = new Sound();
		
		//Accelerometer - AIR SDK
		private var myAcc:Accelerometer;
		
		//Horizontal acceleration, X speed, vertical acceleration, vertical speed
		private var accX:Number = 0;
		private var vitesseX:Number = 0;
		private var vAcceleration:Number = 0.9;
		private var vVelocity:Number = -20;
		private var middleScreen:Number = 1024;
		
		private var mc:MovieClip;
		private var myVect:Vector.<Image> = new Vector.<Image>(6,true);
		private var tmpImage:Image;
		private var moonImage:Image;
		private var t:Tween;
		
		public function testStarlingiOS()
		{	
			//init visuals
			createBackGround();
			
			//Load Bobby animation
			var texture:Texture = Texture.fromBitmap(new AtlasTexture());
			var xml:XML = XML(new AtlasXML());
			var atlas:TextureAtlas = new TextureAtlas(texture,xml);
			
			// Add Bobby movie clip on the stage
			mc = new MovieClip(atlas.getTextures('a1'),25);
			mc.pivotX = 196  / 2;
			mc.pivotY = 280 / 2;
			addChild(mc);
			Starling.juggler.add(mc);
			mc.addEventListener(Event.ENTER_FRAME, onStarlingEnterFrame);
			
			//ADDING PARTICLES
			displayParticle();
			
			//INITIALIZE ACCELEROMETER
			initAccelerometer();
		}
		
		public function createBackGround():void{
			//Add Sky Background
			var background:Image = Image.fromBitmap(new SkyBackground());
			addChild(background);
			
			//Add moon in the background
			var textureMoon:Texture = Texture.fromBitmap(new AtlasTextureMoon());
			var xmlMoon:XML = XML(new AtlasXMLMoon());
			var atlasMoon:TextureAtlas = new TextureAtlas(textureMoon,xmlMoon);
			moonImage = new Image(atlasMoon.getTexture("moon"));
			addChild(moonImage);
			moonImage.x = -600;
			moonImage.y = 1000;
			moonImage.scaleX = 2;
			moonImage.scaleY = 2;
			
			//Creating a tweet to move the moon
			t = new Tween(moonImage, 60);
			t.moveTo(moonImage.x+2200, moonImage.y-1000);
			t.onComplete = moonComplete;
			Starling.juggler.add(t);
			
			//INITIALIZE 5 PLATFORMS
			for (var i:int=0; i< 6; i++){
				var platformImage:Image = new Image(atlasMoon.getTexture("platform"));
				platformImage.x = Math.random()*1536;
				platformImage.y = 0 + i*2008/8;
				myVect[i] = platformImage;
				addChild(platformImage);
			}
		}
		
		//On moon tween complete, loop
		public function moonComplete():void{
			moonImage.x = -900;
			moonImage.y = 1000;
			var t:Tween = new Tween(moonImage, 60);
			t.moveTo(moonImage.x+2200, moonImage.y-1000);
			t.onComplete = moonComplete;
			Starling.juggler.add(t);
		}
		
		//Display particles that follow Bobby
		public function displayParticle():void{
			//Particles extension for Starling
			particle = new PDParticleSystem(XML(new ParticuleXML()), Texture.fromBitmap(new ParticuleTexture()));
			Starling.juggler.add(particle);
			particle.x = 500;
			particle.y = 500;
			addChild(particle);
			particle.start();
		}
		
		//Initialize the accelerometer - AIR SDK
		public function initAccelerometer():void{
			myAcc = new Accelerometer();
			myAcc.addEventListener(AccelerometerEvent.UPDATE, onAccUpdate);	
		}
		
		public function onAccUpdate(evt:AccelerometerEvent):void{
			//On accelerometer update, modify the X-axis acceleration
			accX = evt.accelerationX;
		}	
		
		//On Enter frame
		public function onStarlingEnterFrame(evt:Event):void{
			
			//Easing formula
			mc.x -= (mc.x - (mc.x + accX * 50 * -1))*0.6;
			
			//The particles follow Bobby
			particle.x = mc.x;
			particle.y = mc.y + 180;
			
			//MOVE HEAD TO THE LEFT OR TO THE RIGHT
			if(accX > 0) {
				mc.scaleX = -1;
			}else{
				mc.scaleX = 1;
			}
			
			// Vertical speed Bobby
			vVelocity += vAcceleration;
			
			//GAME'S LOGIC
			if((mc.y > middleScreen) && (vVelocity < 0)){
				// Bobby is moving up
				mc.y += vVelocity;
			}else{
				if(vVelocity > 0){
					// Bobby is falling
					mc.y += vVelocity;
					
					// HIT test with a platform
					for (var i:int=0; i< 6; i++){
						tmpImage = myVect[i];
						if (tmpImage.getBounds(tmpImage.parent).intersects(mc.getBounds(mc.parent)))
						{
							vVelocity = -60;
							//Play a "Rebound" sound effect
							jumpySound.play();
						}
					}
					
				}else{
					// THE WORLD IS GOING DOWN
					// WHEN BOBBY IS IN THE MIDDLE OF THE SCREEN
					for (var j:int=0; j< 6; j++){
						tmpImage = myVect[j];
						tmpImage.y -=  vVelocity;
					}
				}
			}
			
			// CHECK IF THE PLATFORMS ARE OUT OF THE SCREEN (POOLING)
			if(myVect[0] != null){
				for (var k:int=0; k< 6; k++){
					tmpImage = myVect[k];
					if(tmpImage.y > 2008){
						tmpImage.y = -5;
						tmpImage.x =  Math.random()*1536;
					}
				}
			}
			
			//LOOSER... BOBBY IS OUT OF THE SCREEN
			if	(mc.y > 2008) {
				// You will never loose, we'll move Bobby to the top of the screen
				mc.y = -300;
			}	
		}
	}
}