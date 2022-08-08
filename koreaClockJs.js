	let koreaClock = [
		["한", "두", "세", "네", "다", "섯"],
		["여", "섯", "일", "곱", "여", "덟"],
		["아", "홉", "열", "한", "두", "시"],
		["자", "이", "삼", "사", "오", "십"],
		["정", "일", "이", "삼", "사", "육"],
		["오", "오", "칠", "팔", "구", "분"],
	];
	
	const hoursIndex = [
		{hour:0, index:[{x:2,y:2},{x:2,y:4},{x:2,y:5}]},
		{hour:1, index:[{x:0,y:0},{x:2,y:5}]},
		{hour:2, index:[{x:0,y:1},{x:2,y:5}]},
		{hour:3, index:[{x:0,y:2},{x:2,y:5}]},
		{hour:4, index:[{x:0,y:3},{x:2,y:5}]},
		{hour:5, index:[{x:0,y:4},{x:0,y:5},{x:2,y:5}]},
		{hour:6, index:[{x:1,y:0},{x:1,y:1},{x:2,y:5}]},
		{hour:7, index:[{x:1,y:2},{x:1,y:3},{x:2,y:5}]},
		{hour:8, index:[{x:1,y:4},{x:1,y:5},{x:2,y:5}]},
		{hour:9, index:[{x:2,y:0},{x:2,y:1},{x:2,y:5}]},
		{hour:10, index:[{x:2,y:2},{x:2,y:5}]},
		{hour:11, index:[{x:2,y:2},{x:2,y:3},{x:2,y:5}]},
		{hour:12, index:[{x:2,y:2},{x:2,y:4},{x:2,y:5}]}
	];
	
	const minuteTensIndex = [
		{ten:0, index:[]},
		{ten:10, index:[{x:3,y:5}]},
		{ten:20, index:[{x:3,y:1},{x:3,y:5}]},
		{ten:30, index:[{x:3,y:2},{x:3,y:5}]},
		{ten:40, index:[{x:3,y:3},{x:3,y:5}]},
		{ten:50, index:[{x:3,y:4},{x:3,y:5}]},
	];
	
	const minuteUnitsIndex = [
		{unit:0, index:[]},
		{unit:1, index:[{x:4,y:1}]},
		{unit:2, index:[{x:4,y:2}]},
		{unit:3, index:[{x:4,y:3}]},
		{unit:4, index:[{x:4,y:4}]},
		{unit:5, index:[{x:5,y:1}]},
		{unit:6, index:[{x:4,y:5}]},
		{unit:7, index:[{x:5,y:2}]},
		{unit:8, index:[{x:5,y:3}]},
		{unit:9, index:[{x:5,y:4}]},
	];
	
    let jsonSave = null;
	
	koreaClockInit();
	
	setInterval( () => {
		updates();
	},1000);
	
	
	function koreaClockInit(){
		let div = document.getElementById('div-korean-clock');
		let newTable = document.createElement('table');
		let newTr = document.createElement('tr');
		let newTd = document.createElement('td');
		
		//table
		newTable.setAttribute('id','div-korean-clock-table');
		newTable.setAttribute('border','1');
		newTable.setAttribute('style','width:500px;height:500px;text-align:center;font-size:50px;font-weight:700;color:rgb(227 227 227);');
		div.appendChild(newTable);
		
		let newdiv = document.getElementById('div-korean-clock-table');
		
		for(var i=1;i<=6;i++){
			newTr.setAttribute('id','div-korean-clock-table-ro' + i);
			newdiv.appendChild(newTr);
			newTr = document.createElement('tr');
		}
		
		for(var i=1;i<=6;i++){
			let newTableTr = document.getElementById('div-korean-clock-table-ro'+i);
			
			for(var j=0;j<=5;j++){
				newTd.setAttribute('id','x_' + (i-1) +'_y_'+j);
				newTableTr.appendChild(newTd);
				newTd = document.createElement('td');
			}
		
		}
		
		// 글자 삽입
		for(var i=0;i<=5;i++){
			for(var j=0;j<=5;j++){
				let tempDiv = document.getElementById('x_' + i +'_y_'+j);
				tempDiv.innerText = koreaClock[i][j];
			}
		}
	}
	
	
    const updates = async() => {
        let json = getListIndex();
		for(var i in jsonSave){
			let isEq =false;
			for(var j in json){
				if( jsonSave[i].x == json[j].x &&
					jsonSave[i].y == json[j].y){
					isEq = true;
					break;
				}
			} 
			if(!isEq){
				findIndex(jsonSave[i].x,jsonSave[i].y)
			    .style.color = 'rgb(227 227 227)';
			}
		}

		for(var i in json){
			findIndex(json[i].x,json[i].y)
			.style.color = 'rgb(65 237 245)';
		}
		jsonSave = json;
    }

    function getListIndex(){
		let time = new Date();
		let hourJson=[];
		let minutesTenJson=[];
		let minutesUnitJson=[];
		let resultJson=[];
		
		let hours = time.getHours();
		let minutes = time.getMinutes();
		let minutesTen = Math.floor(minutes / 10)* 10;
		let minutesUnit = minutes % 10;
		
		if(hours == 12 && minutes == 0){
			return [{x:5,y:0},{x:4,y:0}];
		}else if(hours == 0 && minutes == 0){
			return [{x:3,y:0},{x:4,y:0}];
		}
		if(minutes > 0){
			resultJson = [{x:5,y:5}];
		}
		
		for(var i in hoursIndex){
			if(hours%12 == hoursIndex[i].hour){
				hourJson = hoursIndex[i].index;
				break;
			}
		}
		
		for(var i in minuteTensIndex){
			if(minutesTen == minuteTensIndex[i].ten){
				minutesTenJson = minuteTensIndex[i].index;
				break;
			}
		}
		
		for(var i in minuteUnitsIndex){
			if(minutesUnit == minuteUnitsIndex[i].unit){
				minutesUnitJson = minuteUnitsIndex[i].index;
				break;
			}
		}
		
		return [...resultJson , ...hourJson, ...minutesTenJson, ...minutesUnitJson];
    }
	function findIndex(x,y){
        return document.getElementById("x_"+ x +"_y_"+ y);
    }

