define(["../../lib/audio", "../../lib/jsfx", "../../lib/jsfxlib", "../../lib/jsfxgui"], function(audio, jsfx, jsfxlib, jsfxgui) {
    jsfxgui.createSampleGenerators("sample-generators");
    jsfxgui.createConfigurationPanel("config-panel");
    jsfxgui.initLogging("log");
    jsfxgui.initLibrary("library");
    jsfxgui.initField("libload");
    jsfxgui.onplay = onplay;
    
    (function(){ // Import GET Vars
      document.$_GET = [];
      var urlHalves = String(document.location).split('?');
      if(urlHalves[1]){
         var urlVars = urlHalves[1].split('&');
         for(var i=0; i<=(urlVars.length); i++){
            if(urlVars[i]){
               var urlVarPair = urlVars[i].split('=');
               var gname  = window.decodeURI(urlVarPair[0]);
               var gvalue = window.decodeURI(urlVarPair[1]);
               document.$_GET[gname] = gvalue;  
            }
         }
      }
    })();
    
    var link = document.getElementById("link");
    var field  = document.getElementById("libload");
    
    function onplay(){
      this.paramsToField();
      link.href = "http://egonelbre.com/js/jsfx/index.html?load=" + window.encodeURI(field.value);
    }
    
    var onchange = document.getElementById("playonchange");
    jsfxgui.onvaluemodified = play;
    function play(){
      if( onchange.checked )
        jsfxgui.play();
    }
    
    var val = document.$_GET['load'];
    if(val !== undefined){
      document.getElementById('libload').value = val;
      jsfxgui.paramsFromField();
    }
	
	document.getElementById('resetButton').addEventListener('click', function() {
		jsfxgui.reset();
	});
	document.getElementById('randomizeButton').addEventListener('click', function() {
		jsfxgui.randomize();
	});
	document.getElementById('playButton').addEventListener('click', function() {
		jsfxgui.play();
	});
	document.getElementById('toLibraryButton').addEventListener('click', function() {
		jsfxgui.paramsToLibrary();
	});
	
	document.getElementById('loadButton').addEventListener('click', function() {
		jsfxgui.paramsFromFieldAndPlay();
	});
	
});