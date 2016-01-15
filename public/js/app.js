var app = angular.module('kwickchat', ['ui.router']);

// Configuration des routting 
app.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider
	.state('Accueil', {
		url: '/',
		templateUrl: '/home.html'
	})
	.state('Inscription', {
		url: '/inscription',
		templateUrl: 'inscription.html'
	})
	.state('Connexion', {
		url: '/connexion',
		templateUrl: 'connexion.html'
	})
	.state('Espace', {
		url: '/espace',
		templateUrl: 'espace.html'
	}); 
	$urlRouterProvider.otherwise('/');
});