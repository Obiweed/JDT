model = {};


/**********************************
			USER
**********************************/

model.User = {};

model.User.events = {};

model.User.methods = {};
model.User.fullName = {};

model.User.fullName.onGet = function(){
	return this.firstName+' '+this.lastName;
};



/**********************************
			CATEGORY
**********************************/

model.Category = {};
model.Category.events = {};
model.Category.events.onValidate = function(){
	
	var currentUserDir,currentUserClass;
	
	currentUserDir = currentUser();
	
	if(!(currentUserClass = ds.User.find('userUUID = :1',currentUserDir.ID))){
		return {error: 103, errorMessage : "You must be logged! - Category"};
	}
	
	this.user = currentUserClass;
};



/**********************************
			WORK
**********************************/

model.Work = {};
model.Work.methods = {};
model.Work.events = {};

model.Work.events.onValidate = function(){
	
	if(this.pause != null || this.pause != 0){
		this.pause = (this.pause*60)*1000;
	}
	
	if(this.category == null || this.start instanceof Date === false  || this.end instanceof Date === false || this.description == '' || this.description == null || this.start >= this.end){
		
		if(this.start >= this.end){
			return {error: 105, errorMessage : "You must have a end date greather than the start date !"};
		}
		
		if(this.category == null){
			return { error: 100, errorMessage:"Must have a Category!" };
		}
		if(this.start instanceof Date === false || this.end instanceof Date === false){
			return { error: 101, errorMessage:"Your dates are not date type !" };
		}
		if(this.description == '' || this.description == null){
			return {error: 102, errorMessage : "You must have a description for your work !"};
		}
		
	}else{
		var currentUserDir,currentUserClass;
	
		currentUserDir = currentUser();
		
		if(!(currentUserClass = ds.User.find('userUUID = :1',currentUserDir.ID))){
			return {error: 104, errorMessage : "You must be logged or your account is not yet activate! - Work"};
		}
		
		this.user = currentUserClass;
	}
	
};


model.Work.startH = {};
model.Work.startM = {};
model.Work.endH = {};
model.Work.endM = {};
model.Work.workDuration = {};

model.Work.startH.onGet = function(){
	return this.start.getHours();
};
model.Work.startM.onGet = function(){
	return this.start.getMinutes();	
};
model.Work.endH.onGet = function(){
	return this.end.getHours();	
};
model.Work.endM.onGet = function(){
	return this.end.getMinutes();		
};
model.Work.workDuration.onGet = function(){
	return (this.end - this.start) - this.pause;
}