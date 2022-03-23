/**
 * External plugin to be added to draw.io
 */

 Draw.loadPlugin(function(ui) {

    if (ui.editor.isChromelessView()) {
        return;
    }
    
	updateShapesLib();
	/*
    // Add sidebar Stencil
    ui.sidebar.addStencilPalette('flowchart', 'M.Video ABB', 'https://yacdn.org/serve/https://raw.githubusercontent.com/CoolZeroNL/draw-io-plugins/master/%23%20Draw-io-plugin-Security-Icons/stencil-security.xml?maxAge=10', ';fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');

    // Collapses default sidebar entry and inserts this before
    var c = ui.sidebar.container;
    c.firstChild.click();
    c.insertBefore(c.lastChild, c.firstChild);
    c.insertBefore(c.lastChild, c.firstChild);
    c.firstChild.click();
	*/
	function updateShapesLib() {
		getShapes(function(abbs, req) {
			alert('Resp: '+req.responseText);
			// Create custom library
			ui.sidebar.addPalette('mvideo', 'М.Видео', true, function(content) {
				alert('in1');
				alert(abbs.toString);
				for (var i in abbs) {
					alert(JSON[i].title);
				}
			});
			//alert(JSON.toString());
			alert('123456');
		});
	}

	function getShapes(fn)
	{
		alert('getShapes');
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://raw.githubusercontent.com/dacuan/mvdrawio-test/main/abb.json');
		
		xhr.onload = function ()
		{
			alert('on-load');
			if (xhr.status >= 200 && xhr.status <= 299)
			{
				alert(xhr.responseText);
				fn(JSON.parse(xhr.responseText), xhr);
			}
			else
			{
				alert('Status: '+xhr.status+' :: ' + xhr.statusText);
				fn(null, xhr);
			}
		};
		
		xhr.onerror = function ()
		{
            alert("Error!: "+xhr.status);
			/*
            for (k in xhr) {
                alert("xhr."+k+": '"+xhr[k].toString+"'");
            }
			*/
			fn(null, xhr);
		};

		xhr.send();
		alert('getShapes done');
	};
});
