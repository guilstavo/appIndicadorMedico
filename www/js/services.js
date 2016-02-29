angular.module('app.services', ['ngResource'])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.factory('recursoEspecialidades', function($resource){
	return $resource('http://apmsantos.org.br/indicadorMedico/webservice/especialidades')
})

.factory('getEspecialidades', function(recursoEspecialidades, $q){
	var servico = {};
	servico.buscar = function(){
		return $q(function(resolve, reject){
			recursoEspecialidades.query(function(especialidades){
				resolve({
					'especialidades' : especialidades
				});
			}, function(erro){
				console.log(erro);
			})
		});
	};
	return servico;
})

.factory('recursoMedicos', function($resource){
	return $resource('http://apmsantos.org.br/indicadorMedico/webservice/medicosEspecialistas/:especialidadeId')
})

.factory('getMedicos', function(recursoMedicos, $q){
	var servico = {};
	servico.buscar = function(id){
		return $q(function(resolve, reject){
			recursoMedicos.query({especialidadeId : id}, function(medicos){
				resolve({
					'medicos' : medicos
				});
			}, function(erro){
				console.log(erro);
			})
		});
	};
	return servico;
})

.factory('recursoDadosDoMedico', function($resource){
	return $resource('http://apmsantos.org.br/indicadorMedico/webservice/medico/:medicoId');
})

.factory('getDadosDoMedico', function(recursoDadosDoMedico, $q){
	var servico = {};
	servico.buscar = function(id){
		return $q(function(resolve, reject){
			recursoDadosDoMedico.get({medicoId : id}, function(medico){
				resolve({
					'medico' : medico
				});
			}, function(erro){
				console.log(erro);
			})
		});
	};
	return servico;
})
