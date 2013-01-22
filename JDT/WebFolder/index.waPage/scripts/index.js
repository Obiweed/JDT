function toggleMenuItems(){
	if(WAF.directory.currentUserBelongsTo('Administrateur')){
		$$('adminItem').enable();
		$$('categoryItem').disable();
		$$('workItem').disable();
	}else if(WAF.directory.currentUserBelongsTo('Utilisateur')){
		$$('adminItem').disable();
		$$('categoryItem').enable();
		$$('workItem').enable();
	}else{
		$$('adminItem').disable();
		$$('categoryItem').disable();
		$$('workItem').disable();
	}
}

WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var workItem = {};	// @menuItem
	var login1 = {};	// @login
	var documentEvent = {};	// @document
	var adminItem = {};	// @menuItem
	var categoryItem = {};	// @menuItem
// @endregion// @endlock

// eventHandlers// @lock

	workItem.click = function workItem_click (event)// @startlock
	{// @endlock
		location.href = '/work';
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		toggleMenuItems();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		toggleMenuItems();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		toggleMenuItems();
	};// @lock

	adminItem.click = function adminItem_click (event)// @startlock
	{// @endlock
		location.href = '/DirectoryAdmin';
	};// @lock

	categoryItem.click = function categoryItem_click (event)// @startlock
	{// @endlock
		location.href = "/category";
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("workItem", "click", workItem.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("adminItem", "click", adminItem.click, "WAF");
	WAF.addListener("categoryItem", "click", categoryItem.click, "WAF");
// @endregion
};// @endlock
