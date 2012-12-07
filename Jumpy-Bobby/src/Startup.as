package
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.media.Sound;
	import starling.core.Starling;
	import starling.events.Event;

	
	//WARNING: I AM TARGETING THE IPAD RETINA FOR MY TESTS
	[SWF(width="1536",height="2008", frameRate="60",backgroundColor="#EEAAAA")]
	public class Startup extends Sprite
	{
		[Embed(source="splash.jpg")]
		private var splashImage:Class;
		
		[Embed(source="assets/Music.mp3")]
		private var musicSound:Class;
		
		private var mStarling:Starling;
		private var _splash:Bitmap;
		
		public function Startup()
		{
			//Splashscreen
			 _splash = new splashImage();
			addChild(_splash);
			
			//Background music
			var mySound:Sound = new musicSound(); 
			mySound.play(0,9999);
			
			//Starting Starling
			mStarling = new Starling(testStarlingiOS, stage);
			mStarling.addEventListener(Event.CONTEXT3D_CREATE, onAddedStage);
			mStarling.showStats = true;
			mStarling.start();
		}
		
		public function onAddedStage(evt:Event):void{
			//Remove splashscreen
			removeChild(_splash);
		}
	}
}