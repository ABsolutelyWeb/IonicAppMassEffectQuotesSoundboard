var app = angular.module('masseffectquotes', ['ionic']);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

app.controller('MassEffectController', function ($scope, $window) {
	$scope.media = null;
	$scope.model = {deleteButton: false, moveButton: false,
		quotes: [
			{
				'title': 'Ashley',
				'image': 'img/me_characters/ashley.png',
				'desc': "Just because I can drill you between the eyes at 100 meters, doesn't mean I can't like sensitive stuff!",
				'file': '/quotes/ashley.mp3'
			},
			{
				'title': 'Garrus',
				'image': 'img/me_characters/garrus.png',
				'desc': "I'm still trying to figure out how to prepare for this mission. Humans don't deal with stress the way turians do.",
				'file': '/quotes/garrus.wav'
			},
			{
				'title': 'Joker',
				'image': 'img/me_characters/joker.png',
				'desc': "Hey Commander, next time we touch down let's try not to park the ship in a colony of mutant zombies. Just thinking out loud here.",
				'file': '/quotes/joker.mp3'
			},
			{
				'title': 'Legion',
				'image': 'img/me_characters/legion.png',
				'desc': "We do not comprehend you organics' fascination with self-poisoning, auditory damage, and sexually transmitted diseases.",
				'file': '/quotes/legion.m4a'
			},
			{
				'title': 'Liara',
				'image': 'img/me_characters/liara.png',
				'desc': 'The fate of the entire galaxy hangs in the balance.',
				'file': '/quotes/liara.mp3'
			},
			{
				'title': 'Miranda',
				'image': 'img/me_characters/miranda.png',
				'desc': 'Wake up, commander.',
				'file': '/quotes/miranda.mp3'
			},
			{
				'title': 'Mordin',
				'image': 'img/me_characters/mordin.png',
				'desc': "Mordin's song",
				'file': '/quotes/mordin.mp3'
			},
			{
				'title': 'Reaper',
				'image': 'img/me_characters/reaper.png',
				'desc': 'Reaper Horn',
				'file': '/quotes/reaper.mp3'
			},
			{
				'title': 'Tali',
				'image': 'img/me_characters/tali.png',
				'desc': 'I could get used to living like this.',
				'file': '/quotes/tali.mp3'
			},
			{
				'title': 'Thane',
				'image': 'img/me_characters/thane.png',
				'desc': 'Amonkira Prayer',
				'file': '/quotes/thane.mp3'
			},
			{
				'title': 'Wrex',
				'image': 'img/me_characters/wrex.png',
				'desc': 'Well there was this one time the Turians almost wiped out our entire race. That was fun.',
				'file': '/quotes/wrex.mp3'
			},
			{
				'title': 'Zaeed',
				'image': 'img/me_characters/zaeed.png',
				'desc': "I've always thought you were beautiful. There, I said it. Whew. Don't say anything.",
				'file': '/quotes/zaeed.mp3'
			}
			
		]
	};
	
	$scope.moveQuote = function(quote, fromIndex, toIndex) {
		// Remove quote from its old position.
		$scope.model.quotes.splice(fromIndex, 1);
		// Quote migrates to moved position.
		$scope.model.quotes.splice(toIndex, 0, quote);
		
	}
	
	/* Not persistent delete because that would break the app. */
	$scope.deleteQuote = function($index) {
		$scope.model.quotes.splice($index, 1);
	};

	$scope.play = function (quote) {
		
		// If there's a quote playing and the user
		// selects another one, it will stop the previous one.
		if($scope.media) {
			$scope.media.pause();
		}
		
		/* Running on a device vs a browser */
		if ($window.cordova) {
			ionic.Platform.ready(function() {
				
				// Playing quotes on Android
				var src = quote.file;
				if (ionic.Platform.is("android")) {
					src = "/android_asset/www/" + src;
				}
				
				$scope.media = new $window.Media(src);
				$scope.media.play();
			});
		} else {
			$scope.media = new Audio();
			$scope.media.src = quote.file;
			$scope.media.load();
			$scope.media.play();
		}
	};
});