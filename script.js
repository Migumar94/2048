/*let matriz = [[document.getElementById('item1').innerText, document.getElementById('item2').innerText,
	 document.getElementById('item3').innerText,document.getElementById('item4').innerText], 
	[document.getElementById('item5').innerText, document.getElementById('item6').innerText,
	document.getElementById('item7').innerText, document.getElementById('item8').innerText], 
	[document.getElementById('item9').innerText, document.getElementById('item10').innerText,
	document.getElementById('item11').innerText, document.getElementById('item12').innerText],
	[document.getElementById('item13').innerText, document.getElementById('item14').innerText,
	document.getElementById('item15').innerText, document.getElementById('item16').innerText]];*/

	document.addEventListener("DOMContentLoaded", (event) => {
		let elements = document.getElementsByClassName("grid-item");
		let array = Array.from(elements).map((element, index) => element.innerText);
		let matriz = [];
		for(let i = 0; i < 4; i++){
			matriz.push(array.slice(i * 4, i * 4 + 4));
		}
		start(matriz);
		document.addEventListener("keydown", (ev) => {
			if(ev.key === "ArrowUp"){
				moveUp(matriz, true);
			}
			if(ev.key === "ArrowDown"){
				moveDown(matriz, true);
			}
			if(ev.key === "ArrowLeft"){
				moveLeft(matriz, true);
			}
			if(ev.key === "ArrowRight"){
				moveRight(matriz, true);
			}
			generateRandom(matriz);
			render(matriz);
			if(checkLose(matriz)){
				document.getElementById("lose").style.visibility = "visible";
			}
		});
		document.getElementById("restart-btn").addEventListener("click", () => {
			document.getElementById("lose").style.visibility = "hidden";
			for(let i = 0; i < 4; i++){
				for(let j = 0; j < 4; j++){
					matriz[i][j] = "";
				}
			}
			start(matriz);
			document.getElementById("score").innerText = 0;
		});

	});
	
	

	function moveUp(matriz, merge){
		let move = false;
		for(let i = 0; i <= 3; i++){
			for(let j = 0; j <= 3; j++){
				if(matriz[i][j] != ""){
					if( i>0 && matriz[i - 1][j] === ""){
						matriz[i - 1][j] = matriz[i][j];
						matriz[i][j] = "";
						move = true;
						movement(document.getElementById("item" + (i * 4 + j + 1)), -100, "Y");
					}
				}
			}
		}
		for(let i = 0; i <= 3; i++){
			for(let j = 0; j <= 3; j++){
				if(matriz[i][j] != ""){
					if( i>0 &&matriz[i - 1][j] == matriz[i][j] && merge){
						matriz[i - 1][j] = matriz[i][j] * 2;
						matriz[i][j] = "";
						document.getElementById("score").innerText = parseInt(document.getElementById("score").innerText) + matriz[i - 1][j];
						move = true;
						movement(document.getElementById("item" + (i * 4 + j + 1)), -100, "Y");
					}
				}
			}
		}
		if(move){
			moveUp(matriz,false);
			console.log(matriz);
		}
	}

	function moveDown(matriz,merge){
		let move = false;
		for(let i = 3; i >= 0; i--){
			for(let j = 3; j >= 0; j--){
				if(matriz[i][j] != ""){
					if( i<3 && matriz[i + 1][j] === ""){
						matriz[i + 1][j] = matriz[i][j];
						matriz[i][j] = "";
						move = true;
						movement(document.getElementById("item" + (i * 4 + j + 1)), +100, "Y");
					}
				}
			}
		}
		for(let i = 3; i >= 0; i--){
			for(let j = 3; j >= 0; j--){
				if(matriz[i][j] != ""){
					if( i<3 &&matriz[i + 1][j] == matriz[i][j] && merge){
						matriz[i + 1][j] = matriz[i][j] * 2;
						matriz[i][j] = "";
						move = true;
						document.getElementById("score").innerText = parseInt(document.getElementById("score").innerText) + matriz[i + 1][j];
						movement(document.getElementById("item" + (i * 4 + j + 1)), +100, "Y");
					}
				}
			}
		}
		if(move){
			moveDown(matriz,false);
			console.log(matriz);
		}
	}

	function moveLeft(matriz, merge){
		let move = false;
		for(let i = 0; i <= 3; i++){
			for(let j = 0; j <= 3; j++){
				if(matriz[i][j] != ""){
					if( j > 0 && matriz[i][j - 1] === ""){
						matriz[i][j - 1] = matriz[i][j];
						matriz[i][j] = "";
						//añadir movimiento pero que vuelva a su posicion original
						movement(document.getElementById("item" + (i * 4 + j + 1)), -100, "X");
			  
						move = true;
					}
				}
			}
		}
		for(let i = 0; i <= 3; i++){
			for(let j = 0; j <= 3; j++){
				if(matriz[i][j] != ""){
					if( j > 0 && matriz[i][j - 1] == matriz[i][j] && merge){
						matriz[i][j - 1] = matriz[i][j] * 2;
						matriz[i][j] = "";
						move = true;
						movement(document.getElementById("item" + (i * 4 + j + 1)), -100, "X");
						document.getElementById("score").innerText = parseInt(document.getElementById("score").innerText) + matriz[i][j + 1];
					}
				}
			}
		}
		if(move){
			moveLeft(matriz,false);
			console.log(matriz);
		}
	}

	function moveRight(matriz, merge){
		let move = false;
		for(let i = 3; i >= 0; i--){
			for(let j = 3; j >= 0; j--){
				if(matriz[i][j] != ""){
					if( j < 3 && matriz[i][j + 1] === ""){
						matriz[i][j + 1] = matriz[i][j];
						matriz[i][j] = "";
						move = true;
						movement(document.getElementById("item" + (i * 4 + j + 1)), +100, "X");
					}
				}
			}
		}
		for(let i = 3; i >= 0; i--){
			for(let j = 3; j >= 0; j--){
				if(matriz[i][j] != ""){
					if( j < 3 && matriz[i][j + 1] == matriz[i][j] && merge){
						matriz[i][j + 1] = matriz[i][j] * 2;
						matriz[i][j] = "";
						move = true;
						document.getElementById("score").innerText = parseInt(document.getElementById("score").innerText) + matriz[i][j + 1];
						movement(document.getElementById("item" + (i * 4 + j + 1)), +100, "X");
					}
				}
			}
		}
		if(move){
			moveRight(matriz,false);
			console.log(matriz);
		}
	}
	
	function start(matriz)
	{
		num = 2;
		while(num!=0)
		{
			let i = Math.floor(Math.random() * 4);
			let j = Math.floor(Math.random() * 4);
			console.log(matriz[i][j]);
			if(matriz [i][j]=="")
			{
				if( Math.floor(Math.random() * 4)%2 == 0)
				{
					matriz[i][j]=2;
				}
				else{
					matriz[i][j]=4;
				}
				num--;
			}
		}
		render(matriz);
		console.log(matriz);
	}

	function render(matriz){
		for(let i = 0; i < 4; i++){
			for(let j = 0; j < 4; j++){
				document.getElementById("item" + (i * 4 + j + 1)).innerText = matriz[i][j];
				switch(matriz[i][j]){
					case "":
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#cdc1b4";
						break;
					case 2:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#eee4da";
						break;
					case 4:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#ede0c8";
						break;
					case 8:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#f2b179";
						break;
					case 16:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#f59563";
						break;
					case 32:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#f67c5f";
						break;
					case 64:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#f65e3b";
						break;
					case 128:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#edcf72";
						break;
					case 256:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#edcc61";
						break;
					case 512:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#edc850";
						break;
					case 1024:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#edc53f";
						break;
					case 2048:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#edc22e";
						break;
					default:
						document.getElementById("item" + (i * 4 + j + 1)).style.backgroundColor = "#3c3a32";
						break;
				}
				
			}
		}
	}

	function generateRandom(matriz){
		if(matriz.flat().includes("")){
			let i = Math.floor(Math.random() * 4);
			let j = Math.floor(Math.random() * 4);
			while(matriz[i][j] != ""){
				i = Math.floor(Math.random() * 4);
				j = Math.floor(Math.random() * 4);
			}
			if(Math.floor(Math.random() * 4)%2==0)
				matriz[i][j] = 2;
			else
				matriz[i][j] = 4;
		}
	}

	function checkLose(matriz){
		if(matriz.flat().includes("")){return false;}

		for(let i = 0; i < 4; i++){
			for(let j = 0; j < 4; j++){
				if(i < 3 && matriz[i][j] === matriz[i + 1][j] || j < 3 && matriz[i][j] === matriz[i][j + 1]){
					return false;
				}
			}
		}
		return true;
	}
	movement = (element, distance,axis ) => {
		element.style.transition = "all 0.05s";
		element.style.transform = `translate${axis}(${distance}px)`;
		setTimeout(() => {
			element.style.transition = "none";
			element.style.transform = `translate${axis}(0px)`;
		},50);




		
	}