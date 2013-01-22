
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var bindButton = {};	// @button
	var indexButton = {};	// @button
	var login1 = {};	// @login
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	bindButton.click = function bindButton_click (event)// @startlock
	{// @endlock
		sources.user.userUUID = sources.compAdmin_users.ID;
		sources.user.save({onSuccess:function(evt){
			sources.user.serverRefresh();
		}})
	};// @lock

	indexButton.click = function indexButton_click (event)// @startlock
	{// @endlock
		location.href = '/index';
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		$$("compAdmin").removeComponent();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		$$("compAdmin").loadComponent("/directoryComponent.waComponent");
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if(waf.directory.currentUserBelongsTo("Administrateur")){
			$$("compAdmin").loadComponent("/directoryComponent.waComponent");	
		}else{
			location.href = '/index';
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("bindButton", "click", bindButton.click, "WAF");
	WAF.addListener("indexButton", "click", indexButton.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
