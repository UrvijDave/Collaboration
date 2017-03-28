app.factory('NewsService',function($http){
	var newsService=this;
	var BASE_URL= "http://localhost:8088/AllianceBackEnd/"
		
	newsService.saveNews=function(news){
		return $http.post(BASE_URL + "/crenews" , news);
	}
	
	newsService.getAllNews=function(){
		return $http.get(BASE_URL+"/getAllNews");
	}

	
	newsService.getAllHead=function(){
		return $http.get(BASE_URL+"/getAllHead");
	}
	
	newsService.getNews=function(id){
		return $http.get(BASE_URL + "/news/"+ id)
	};
	
	newsService.updatenews=function(bulletinid,news){
		console.log('update news in service')
		console.log('news id ' + bulletinid)
		return $http.put(BASE_URL + "/news/"+ bulletinid, news);
	};
	
	newsService.deletenews=function(id){
		console.log("entering delete news in service with id " + id);
		return $http.delete(BASE_URL + "/news/"+id)
		.then(function(response){
			console.log(response.status)
			return response.status;
		},function(response){
			alert("Not authorized to delete news...")
			console.log(response.status)
			})
	};	
	return newsService;
})