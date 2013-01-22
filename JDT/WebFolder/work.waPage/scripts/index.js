
Date.prototype.defaultView=function(){
var dd=this.getDate();
if(dd<10)dd='0'+dd;
var mm=this.getMonth()+1;
if(mm<10)mm='0'+mm;
var yyyy=this.getFullYear();
return String(dd+"\/"+mm+"\/"+yyyy)
};


WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var startField = {};	// @textField
	var button2 = {};	// @button
	var userWorkEvent = {};	// @dataSource
	var documentEvent = {};	// @document
	var saveButton = {};	// @button
	var indexButton = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	startField.change = function startField_change (event)// @startlock
	{// @endlock
		$$('endField').setValue($$('startField').getValue());
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		$$('startField').setValue(new Date().defaultView());
		$$('endField').setValue(new Date().defaultView());
	};// @lock

	userWorkEvent.onCurrentElementChange = function userWorkEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		
		if(this.pause != null || this.pause != 0){
			$$('pauseField').setValue((this.pause/1000)/60);
		}
		$$('startH').setValue((this.startH > 9) ? this.startH : '0'+this.startH);
		$$('startM').setValue((this.startM > 9) ? this.startM : '0'+this.startM);
		$$('endH').setValue((this.endH > 9) ? this.endH : '0'+this.endH);
		$$('endM').setValue((this.endM > 9) ? this.endM : '0'+this.endM);
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var formatDuration = function(myCell){
			var durationDate;
			if(myCell.value != null){
				if(myCell.value.length < 1000){
					myCell.value = myCell.value*60*1000;
				}
				durationDate = new Date(myCell.value);
				return durationDate.getHours()-1+'h'+durationDate.getMinutes()+'m';
				//return (myCell.value/1000/60)+' m';
			}
		};
		// Calcul de l'affichage de la duration
		$$('dataGrid1').column(4).setRenderer(formatDuration);
		
		$$('dataGrid1').column(5).setRenderer(formatDuration);

	};// @lock

	saveButton.click = function saveButton_click (event)// @startlock
	{// @endlock
		var formatedStartDate,formatedEndDate,startDate,startH,startM,endDate,endH,endM,errorDiv;
		
		errorDiv = $$('errorDiv');
		
		startDate = $$('startField').getValue();
		startDate = startDate.split('/');
		startH = $$('startH').getValue();
		startM = $$('startM').getValue();
		endDate = $$('endField').getValue();
		endDate = endDate.split('/');
		endH = $$('endH').getValue();
		endM = $$('endM').getValue();
		
		formatedStartDate = new Date(startDate[2],startDate[1]-1,startDate[0],startH,startM,0);
		formatedEndDate = new Date(endDate[2],endDate[1]-1,endDate[0],endH,endM,0);
		
		sources.userWork.start = (formatedStartDate);
		sources.userWork.end = (formatedEndDate);
		sources.userWork.category.set(sources.userCategory);
		
		sources.userWork.save({onSuccess:function(evt){
			errorDiv.$domNode.fadeOut(1000);
		},onError:function(evt){			
			errorDiv.show();
			errorDiv.setValue(evt.error[0].message);
		}});
		
	};// @lock

	indexButton.click = function indexButton_click (event)// @startlock
	{// @endlock
		location.href = '/index';
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("startField", "change", startField.change, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("userWork", "onCurrentElementChange", userWorkEvent.onCurrentElementChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("saveButton", "click", saveButton.click, "WAF");
	WAF.addListener("indexButton", "click", indexButton.click, "WAF");
// @endregion
};// @endlock
