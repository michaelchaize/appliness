// JavaScript Document

var mydb=false;
	
	function saveWine(){
		console.log("saveWine started");
		initDb();
		console.log("initDb passed in SaveWine");
		addWineInDb();
	}
	
	function initDb(){
		console.log("initDb");
		
		if(mydb != false){
			console.log("db already exists");
			return;	
		}
		
		 try { 
        if (!window.openDatabase) { 
          alert('not supported'); 
        } else { 
          var shortName = 'RememberWineDB'; 
          var version = '1.0'; 
          var displayName = 'Remember the wine Database'; 
          var maxSize = 200000; // in bytes 
		  console.log("assigning mydb");
          mydb = openDatabase(shortName, version, displayName, maxSize); 
         }
      } catch(e) { 
        // Error handling code goes here. 
		console.log("error in initDb");
        if (e == INVALID_STATE_ERR) { 
          // Version number mismatch. 
          alert("Invalid database version."); 
        } else { 
          alert("Unknown error "+e+"."); 
        } 
        return; 
      } 	
	}
	
	function addWineInDb(){
		console.log("addWine in db");
		console.log("mydb+++ = " + mydb);
		mydb.transaction(insertDB, transaction_error, insertDB_success);
	}
	
	function transaction_error(tx, error) {
	//$('#busy').hide();
    	alert("Database Error: " + error);
	}
	
	function insertDB(tx) {
	//$('#busy').show();
	//tx.executeSql('DROP TABLE IF EXISTS wines');
		console.log("insertDB started");
		var sql = 
			"CREATE TABLE IF NOT EXISTS wines ( "+
			"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"name VARCHAR(50), " +
			"year VARCHAR(10), " +
			"region VARCHAR(50), " +
			"color VARCHAR(50), " +
			"picture VARCHAR(240), " + 
			"comments VARCHAR(240), " + 
			"rate INTEGER);";
			console.log("sql query is: " + sql);
		tx.executeSql(sql);
		console.log("create table executed. Pincture stored: " + $('#hidden_src').val());
		
		var sqlInsert = "INSERT INTO wines (name,year,region,color,comments,rate,picture) VALUES ('"+ $('#ti_Name').val() +"','"+ $('#ti_Year').val() +"','"+ $('#ti_Region').val() +"','"+ $("input[name=color_choice]:checked").val() +"','"+ $('#ti_comments').val() +"','"+ $('#ti_Rate').val() +"','"+ $('#hidden_src').val() +"');";
		
		tx.executeSql(sqlInsert);
		
		console.log("insert one line");
		
			
	}
	
	function insertDB_success() {
		//alert("success insert db");
		mydb = false;
		$.mobile.changePage( "catalog.html");
	}
	
	function getWineInDb(tx) {
		console.log("get wine in db");
	var sql = "SELECT id,name,year,region,rate,color,comments FROM wines WHERE id > 0";
	
	//var sql = "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
	console.log("get wine in db:" + sql);
	tx.executeSql(sql, [], getWines_success);
}

function getWine(){
		initDb();
		console.log("initDb passed in getWine.");
		mydb.transaction(getWineInDb, transaction_error);
	}
	
function getWines_success(tx, results) {
	console.log("get Wines success:" + tx);
	//$('#busy').hide();
	console.log("looping "+ results);
    var len = results.rows.length;
	console.log("number of wines: " + len);
    for (var i=0; i<len; i++) {
    	var wine = results.rows.item(i);
		console.log("displaying: " + wine.name);
		
		$('#wineList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-li-has-icon ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-li-has-alt list-main-item"><div class="ui-btn-text"><a href="#" onclick="setIdentity('+ wine.id +');" data-rel="dialog" data-transition="pop" class="ui-link-inherit list-rate-icon"><img src="images/Glass-'+ wine.color +'.png" class="ui-li-thumb list-icon-left"><h3 class="ui-li-heading">'+ wine.name +'</h3><p class="ui-li-desc">'+ wine.region +' - '+ wine.year +'</p></a></div></div><span class="ui-li-count ui-btn-up-c ui-btn-corner-all rate-style-list">'+ wine.rate +'</span></li>');
		//$('#wineList').append('<li><p class="line1">' + wine.name + ' </p></li>');
    }
	setTimeout(function(){
		$('#wineList').listview('refresh');
	},100);
	
}

function getIdentity(){
	var navIdentity = sessionStorage.idw;
	alert(navIdentity);
}

function setIdentity(idWine){
	sessionStorage.idw = idWine;
	$.mobile.changePage("popup.html");
}
var idWineGlobal = 0;
function getWineId(idWine){
		initDb();
		idWineGlobal = idWine;
		console.log("initDb passed in getWineId.");
		
		mydb.transaction(getWineInDbbyId, transaction_error);
	}

function getWineInDbbyId(tx) {
		console.log("get wine in db by Id");
	var sql = "SELECT id,name,year,region,rate,color,comments,picture FROM wines WHERE id = "+ idWineGlobal +";";
	
	//var sql = "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"
	console.log("get wine in db by id:" + sql);
	tx.executeSql(sql, [], getWinesbyId_success);
}

function getWinesbyId_success(tx, results) {
	console.log("get Wines success:" + tx);
	//$('#busy').hide();
	console.log("looping "+ results);
    var len = results.rows.length;
	console.log("number of wines: " + len);
    for (var i=0; i<len; i++) {
    	var wine = results.rows.item(i);
		console.log("displaying: " + wine.name);
		
		$('.headerPopup').append('<h3>'+ wine.name +'</h3>');
		$('.regionYear').append('<h2>'+ wine.region +' - '+ wine.year +'</h2>');
		for( var j=0;j<10;j++){
			if (j< wine.rate){
				$('.rateGlass').append('<img src="images/Glass-'+ wine.color +'.png"/>');	
			}else{
				$('.rateGlass').append('<img src="images/Glass-Grey.png"/>');	
			}
		}
		$('.commentWine').append('<p>'+ wine.comments +'</p>');
		$('.commentWine').append('<img width="300" src="'+ wine.picture +'"/>');
		
    }
	
	
}

function takePicture(){
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI }); 
	
}

function onSuccess(imageURI) {
	console.log("success picture taken");
    var image = document.getElementById('winePicture');
    image.src = imageURI;
	
    $('#hidden_src').val(imageURI);
	}

function onFail(message) {
    alert('Failed because: ' + message);
}	