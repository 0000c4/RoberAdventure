document.getElementById("gameHtml").style.display = 'none';//изначатльно отключаем игру
document.getElementById("gameOver").style.display = 'none';//изначатльно отключаем игру
//глобальные переменные и константы

const WIDTH = 18
const HEIGHT = 28;

const playerChar = "◪";
const chestChar = "⬓";
const downChar = "d";
const healthChar = "h";

var time = 0;

var chestActive = 1;//открывался ли сундук ранее ?
var chestX = 0;
var chestY = 0;

var healthActive = 1;//открывался ли сундук ранее ?
var healthX = 0;
var heatlhY = 0;

var downX = 0;//кординаты спуска вниз
var downY = 0;

var roomId1 = 0;
var roomId2 = 0;
var roomId3 = 0;
var roomId4 = 0;
var roomId5 = 0;
var roomId6 = 0;

var level = 1;//текущий уровень
var monsterKill = 0;//счетчик убитых монстров
var loop;//инициализация цикла
//stats
var player = {//игрок
	x: 3,
	y: 2,
	hp: 100,//здоровье
	atk: 1,//атака
	step: 0,//ход(врага или игрока)
	wpn: "none",//оружие
	life(){
		if(this.hp <= 0){gameOver();}//cмерть
	},
};

//graphic
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "background.png";

const stone = new Image();
stone.src = "stone.png";

const door = new Image();
door.src = "door.png";

const chestIMG = new Image();
chestIMG.src = "chest.png";

const down = new Image();
down.src = "down.png";

const playerIMG = new Image();
playerIMG.src = "player.png";

const healthIMG = new Image();
healthIMG.src = "healthKit.png";

const enemy1IMG = new Image();
enemy1IMG.src = "slime.png";
const enemy1IMG2 = new Image();
enemy1IMG2.src = "slime2.png";

const enemy2IMG = new Image();
enemy2IMG.src = "slime.png";
const enemy2IMG2 = new Image();
enemy2IMG2.src = "slime2.png";

const enemy3IMG = new Image();
enemy3IMG.src = "slime.png";
const enemy3IMG2 = new Image();
enemy3IMG2.src = "slime2.png";

const enemy4IMG = new Image();
enemy4IMG.src = "slime.png";
const enemy4IMG2 = new Image();
enemy4IMG2.src = "slime2.png";

const enemy5IMG = new Image();
enemy5IMG.src = "slime.png";
const enemy5IMG2 = new Image();
enemy5IMG2.src = "slime2.png";

const enemy6IMG = new Image();
enemy6IMG.src = "slime.png";
const enemy6IMG2 = new Image();
enemy6IMG2.src = "slime2.png";

const enemy7IMG = new Image();
enemy7IMG.src = "slime.png";
const enemy7IMG2 = new Image();
enemy7IMG2.src = "slime2.png";

const enemy8IMG = new Image();
enemy8IMG.src = "slime.png";
const enemy8IMG2 = new Image();
enemy8IMG2.src = "slime2.png";

const enemy9IMG = new Image();
enemy9IMG.src = "slime.png";
const enemy9IMG2 = new Image();
enemy9IMG2.src = "slime2.png";

const enemy10IMG = new Image();
enemy10IMG.src = "slime.png";
const enemy10IMG2 = new Image();
enemy10IMG2.src = "slime2.png";

var field = [
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "],
[" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
];
function makefld(x,y){
	for(var i = 0;i<y;i++){
		for(var j = 0; j<x;j++){
			field[i][j] = "□";
		}
	}
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class enemy{//для врагов выбран класс вместо структуры(как у player) из за возможности создавать несколько экземпляров 
	hp = 0
	atk = 0
	life = 1
	x = 0
	y = 0
	char = " "
	active = 0
	anim = false //false - первый кадр, true - второй кадр
	
	constructor(mx,my,hp,atk,char){//конструктор класса для создания монстра
		this.x = mx;
		this.y = my;
		this.hp = hp;
		this.atk = atk;
		this.char = char;
		field[this.y][this.x] = this.char;
	}
	moving(){
		if(this.active == 1 && this.life == 1 && time == 10){//действует когда жив и активирован
			this.anim = !this.anim;//изменение кадра каждый ход
			if(player.y > this.y && field[this.y + 1][this.x] == "□"){//движение врага
				field[this.y][this.x] = "□"
				this.y++;
				field[this.y][this.x] = this.char
			}
		
			else if(player.y < this.y && field[this.y - 1][this.x] == "□"){
				field[this.y][this.x] = "□"
				this.y--;
				field[this.y][this.x] = this.char
			}
		
			if(player.x > this.x && field[this.y][this.x + 1] == "□"){
				field[this.y][this.x] = "□"
				this.x++;
				field[this.y][this.x] = this.char
			}
		
			else if(player.x < this.x && field[this.y][this.x - 1] == "□"){
				field[this.y][this.x] = "□"
				this.x--;
				field[this.y][this.x] = this.char
			
			}
			//battle
			if(this.hp <= 0){this.active = 0;this.life = 0; field[this.y][this.x] = "□"; monsterKill++;}//dead
			
			if(field[this.y][this.x - 1] == playerChar || field[this.y][this.x + 1] == playerChar ||
			field[this.y - 1][this.x] == playerChar || field[this.y + 1][this.x] == playerChar){
				if(player.step == 0){player.hp = player.hp - this.atk; player.step = 1;}//ход врага
			}
			
		}
	}
}
//отрисовка графики
function output(){
	ctx.drawImage(ground,0,0);
	for (var i = 0; i < HEIGHT; i++)
		for (var j = 0; j < WIDTH; j++)
		{
			if (field[i][j] == playerChar){ctx.drawImage(playerIMG,j*24,i*24)}
			
			if (field[i][j] == 'm1' && monster1.active == 1 && monster1.anim == false){ctx.drawImage(enemy1IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm1' && monster1.active == 1 && monster1.anim == true){ctx.drawImage(enemy1IMG2,j*24,i*24)}//вывод тайтла врага если он активен
			
			if (field[i][j] == 'm2' && monster2.active == 1 && monster2.anim == false){ctx.drawImage(enemy2IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm2' && monster2.active == 1 && monster2.anim == true){ctx.drawImage(enemy2IMG2,j*24,i*24)}//вывод тайтла врага если он активен
			
			if (field[i][j] == 'm3' && monster3.active == 1 && monster3.anim == false){ctx.drawImage(enemy3IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm3' && monster3.active == 1 && monster3.anim == true){ctx.drawImage(enemy3IMG2,j*24,i*24)}//вывод тайтла врага если он активен
			
			if (field[i][j] == 'm4' && monster4.active == 1 && monster4.anim == false){ctx.drawImage(enemy4IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm4' && monster4.active == 1 && monster4.anim == true){ctx.drawImage(enemy4IMG2,j*24,i*24)}
			
			if (field[i][j] == 'm5' && monster5.active == 1 && monster5.anim == false){ctx.drawImage(enemy5IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm5' && monster5.active == 1 && monster5.anim == true){ctx.drawImage(enemy5IMG2,j*24,i*24)}
			
			if (field[i][j] == 'm6' && monster6.active == 1 && monster6.anim == false){ctx.drawImage(enemy6IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm6' && monster6.active == 1 && monster6.anim == true){ctx.drawImage(enemy6IMG2,j*24,i*24)}
			
			if (field[i][j] == 'm7' && monster7.active == 1 && monster7.anim == false){ctx.drawImage(enemy7IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm7' && monster7.active == 1 && monster7.anim == true){ctx.drawImage(enemy7IMG2,j*24,i*24)}
			
			if (field[i][j] == 'm8' && monster8.active == 1 && monster8.anim == false){ctx.drawImage(enemy8IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm8' && monster8.active == 1 && monster8.anim == true){ctx.drawImage(enemy8IMG2,j*24,i*24)}
			
			if (field[i][j] == 'm9' && monster9.active == 1 && monster9.anim == false){ctx.drawImage(enemy9IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm9' && monster9.active == 1 && monster9.anim == true){ctx.drawImage(enemy9IMG2,j*24,i*24)}
			
			if (field[i][j] == 'm10' && monster10.active == 1 && monster10.anim == false){ctx.drawImage(enemy10IMG,j*24,i*24)}//вывод тайтла врага если он активен
			else if (field[i][j] == 'm10' && monster10.active == 1 && monster10.anim == true){ctx.drawImage(enemy10IMG2,j*24,i*24)}
			if (field[i][j] == chestChar){ctx.drawImage(chestIMG,j*24,i*24)}
			if (field[i][j] == downChar){ctx.drawImage(down,j*24,i*24)}
			if (field[i][j] == healthChar){ctx.drawImage(healthIMG,j*24,i*24)}
			if (field[i][j] == '■'){ctx.drawImage(stone,j*24,i*24)}
			if (field[i][j] == '▩'){ctx.drawImage(door,j*24,i*24)}

		}
}
function init(){
	//появление персонажа
	field[player.y][player.x] = playerChar;
	//инициализация кнопок
    var button = document.getElementById("ok")
    button.onclick = btnOk;
     
    var button = document.getElementById("up")
    button.onclick = btnUp;
    
    var button = document.getElementById("down")
    button.onclick = btnDown;
    
    var button = document.getElementById("left")
    button.onclick = btnLeft;
    
    var button = document.getElementById("right")
    button.onclick = btnRight;
    
    var button = document.getElementById("returnMenu")
    button.onclick = returnMenu;
}
//логика кнопок
function returnMenu(){//возвращение в меню
        console.log("dick")
        document.getElementById("gameOver").style.display = 'none';//изначатльно отключаем игру
        document.getElementById("menu").style.display = 'block';//изначатльно отключаем игру
}
function gameRetry(){//попробовать заново
    document.getElementById("gameHtml").style.display = 'block';//актививация игры
    document.getElementById("gameOver").style.display = 'none';//закрытие меню
    		//перерисовка спрайтов
	enemy1IMG.src = "slime.png";
	enemy1IMG2.src = "slime2.png";
	enemy2IMG.src = "slime.png";
	enemy2IMG2.src = "slime2.png";
	enemy3IMG.src = "slime.png";
	enemy3IMG2.src = "slime2.png";
	enemy4IMG.src = "slime.png";
	enemy4IMG2.src = "slime2.png";
	enemy5IMG.src = "slime.png";
	enemy5IMG2.src = "slime2.png";
	enemy6IMG.src = "slime.png";
	enemy6IMG2.src = "slime2.png";
	enemy7IMG.src = "slime.png";
	enemy7IMG2.src = "slime2.png";
	enemy8IMG.src = "slime.png";
	enemy8IMG2.src = "slime2.png";
	enemy9IMG.src = "slime.png";
	enemy9IMG2.src = "slime2.png";
	enemy10IMG.src = "slime.png";
	enemy10IMG2.src = "slime2.png";
    //выход из цикла
    clearInterval(loop);
    //удаление врагов
    delete monster1;
    delete monster2;
    delete monster3;
    delete monster4;
    delete monster5;
    delete monster6;
    delete monster7;
    delete monster8;
    delete monster9;
    delete monster10;
    	//сброс всех переменных
	chestActive = 1;
	chestX = 0;
	chestY = 0;
	healthActive = 1;
	healthX = 0;
	heatlhY = 0;
	downX = 0;
	downY = 0;
	roomId1 = 0;
	roomId2 = 0;
	roomId3 = 0;
	roomId4 = 0;
	roomId5 = 0;
	roomId6 = 0;
	level = 1;
	monsterKill = 0;
	player.x = 3;
	player.y = 2;
	player.hp = 100;
	player.atk = 1;
	player.step = 0;
	player.wpn = "none";
	lvl1();//запуск первого уровня
}
function gameOver(){//сообщение о проигрыше
    document.getElementById("gameHtml").style.display = 'none';//отключаем игру
    document.getElementById("gameOver").style.display = 'block';//вывод меню о проигрыше
}
function new_game(){//запуск игры
	document.getElementById("menu").style.display = 'none';//выход из меню
	document.getElementById("gameHtml").style.display = 'block';//запуск игры
	document.getElementById("gameOver").style.display = 'none';//вывод меню о проигрыше
		//перерисовка спрайтов
	enemy1IMG.src = "slime.png";
	enemy1IMG2.src = "slime2.png";
	enemy2IMG.src = "slime.png";
	enemy2IMG2.src = "slime2.png";
	enemy3IMG.src = "slime.png";
	enemy3IMG2.src = "slime2.png";
	enemy4IMG.src = "slime.png";
	enemy4IMG2.src = "slime2.png";
	enemy5IMG.src = "slime.png";
	enemy5IMG2.src = "slime2.png";
	enemy6IMG.src = "slime.png";
	enemy6IMG2.src = "slime2.png";
	enemy7IMG.src = "slime.png";
	enemy7IMG2.src = "slime2.png";
	enemy8IMG.src = "slime.png";
	enemy8IMG2.src = "slime2.png";
	enemy9IMG.src = "slime.png";
	enemy9IMG2.src = "slime2.png";
	enemy10IMG.src = "slime.png";
	enemy10IMG2.src = "slime2.png";
	    //выход из цикла
    clearInterval(loop);
    //удаление врагов
    delete monster1;
    delete monster2;
    delete monster3;
    delete monster4;
    delete monster5;
    delete monster6;
    delete monster7;
    delete monster8;
    delete monster9;
    delete monster10;
	    	//сброс всех переменных
	chestActive = 1;
	chestX = 0;
	chestY = 0;
	healthActive = 1;
	healthX = 0;
	heatlhY = 0;
	downX = 0;
	downY = 0;
	roomId1 = 0;
	roomId2 = 0;
	roomId3 = 0;
	roomId4 = 0;
	roomId5 = 0;
	roomId6 = 0;
	level = 1;
	monsterKill = 0;
	player.x = 3;
	player.y = 2;
	player.hp = 100;
	player.atk = 1;
	player.step = 0;
	player.wpn = "none";
	lvl1();//запуск первого уровня
	
}//запуск игры из меню
function btnOk() {
   if(field[player.y][player.x+1] == chestChar || field[player.y][player.x-1] == chestChar || field[player.y-1][player.x] == chestChar ||//если игрок рядом с сундуком
   field[player.y+1][player.x] == chestChar || field[player.y-1][player.x+1] == chestChar || field[player.y+1][player.x+1] == chestChar ||
    field[player.y-1][player.x-1] == chestChar || field[player.y+1][player.x-1] == chestChar){//открытие сундука
		field[chestY][chestX] = "□";//удаление сундука

		var foo = Math.random() * 100;
		if (foo < 45){
			player.atk = 2;
			player.wpn = "wooden stick";
		}
		else if (foo < 80){
			player.atk = 4;
			player.wpn = "rusty ax";
		}
		else if (foo < 98){
			player.atk = 7;
			player.wpn = "silver spear";
		}
		else{
			player.atk = 12;
			player.wpn = "magic sword";
		}
	}
   if(field[player.y][player.x+1] == healthChar || field[player.y][player.x-1] == healthChar || field[player.y-1][player.x] == healthChar ||//если игрок рядом с сундуком
   field[player.y+1][player.x] == healthChar || field[player.y-1][player.x+1] == healthChar || field[player.y+1][player.x+1] == healthChar ||
    field[player.y-1][player.x-1] == healthChar || field[player.y+1][player.x-1] == healthChar){
		field[healthY][healthX] = "□";//удаление аптечки
		player.hp = player.hp + 50;
		if(player.hp > 100){player.hp = 100;}
	}
	   if(field[player.y][player.x+1] == downChar || field[player.y][player.x-1] == downChar || field[player.y-1][player.x] == downChar ||//если игрок рядом с сундуком
   field[player.y+1][player.x] == downChar || field[player.y-1][player.x+1] == downChar || field[player.y+1][player.x+1] == downChar ||
    field[player.y-1][player.x-1] == downChar || field[player.y+1][player.x-1] == downChar){//переход на соелующий этаж
		console.log(monsterKill);
		if(monsterKill == 5 && level == 1){clearInterval(loop);lvl2();}
		else if(monsterKill == 15 && level == 2){clearInterval(loop);lvl3();}
		}
		
   if(field[player.y][player.x+1] == monster1.char || field[player.y][player.x-1] == monster1.char || field[player.y-1][player.x] == monster1.char ||//если игрок рядом с врагом
   field[player.y+1][player.x] == monster1.char || field[player.y-1][player.x+1] == monster1.char || field[player.y+1][player.x+1] == monster1.char ||
    field[player.y-1][player.x-1] == monster1.char || field[player.y+1][player.x-1] == monster1.char){//начало битвы
	if(player.step == 1){monster1.hp = monster1.hp - player.atk; player.step = 0;}//ход игрока
   }//первый монстр
   
   if(field[player.y][player.x+1] == monster2.char || field[player.y][player.x-1] == monster2.char || field[player.y-1][player.x] == monster2.char ||//если игрок рядом с врагом
   field[player.y+1][player.x] == monster2.char || field[player.y-1][player.x+1] == monster2.char || field[player.y+1][player.x+1] == monster2.char ||
    field[player.y-1][player.x-1] == monster2.char || field[player.y+1][player.x-1] == monster2.char){//начало битвы
	if(player.step == 1){monster2.hp = monster2.hp - player.atk; player.step = 0;}//ход игрока
   }//второй монстр
   if(field[player.y][player.x+1] == monster3.char || field[player.y][player.x-1] == monster3.char || field[player.y-1][player.x] == monster3.char ||//если игрок рядом с врагом
   field[player.y+1][player.x] == monster3.char || field[player.y-1][player.x+1] == monster3.char || field[player.y+1][player.x+1] == monster3.char ||
    field[player.y-1][player.x-1] == monster3.char || field[player.y+1][player.x-1] == monster3.char){//начало битвы
	if(player.step == 1){monster3.hp = monster3.hp - player.atk;player.step = 0;}//ход игрока
   }//третий монстр
      if(field[player.y][player.x+1] == monster4.char || field[player.y][player.x-1] == monster4.char || field[player.y-1][player.x] == monster4.char ||//если игрок рядом с врагом
   field[player.y+1][player.x] == monster4.char || field[player.y-1][player.x+1] == monster4.char || field[player.y+1][player.x+1] == monster4.char ||
    field[player.y-1][player.x-1] == monster4.char || field[player.y+1][player.x-1] == monster4.char){//начало битвы
	if(player.step == 1){monster4.hp = monster4.hp - player.atk;player.step = 0;}//ход игрока
   }//четвертый монстр
   if(field[player.y][player.x+1] == monster5.char || field[player.y][player.x-1] == monster5.char || field[player.y-1][player.x] == monster5.char ||//если игрок рядом с врагом
   field[player.y+1][player.x] == monster5.char || field[player.y-1][player.x+1] == monster5.char || field[player.y+1][player.x+1] == monster5.char ||
    field[player.y-1][player.x-1] == monster5.char || field[player.y+1][player.x-1] == monster5.char){//начало битвы
	if(player.step == 1){monster5.hp = monster5.hp - player.atk;player.step = 0;}//ход игрока
   }//пятый монстр
   if(typeof monster6 != "undefined"){//проверка на существование
		if(field[player.y][player.x+1] == monster6.char || field[player.y][player.x-1] == monster6.char || field[player.y-1][player.x] == monster6.char ||//если игрок рядом с врагом
		field[player.y+1][player.x] == monster6.char || field[player.y-1][player.x+1] == monster6.char || field[player.y+1][player.x+1] == monster6.char ||
		field[player.y-1][player.x-1] == monster6.char || field[player.y+1][player.x-1] == monster6.char){//начало битвы
			if(player.step == 1){monster6.hp = monster6.hp - player.atk;player.step = 0;}//ход игрока
		}
   }//шестой монстр
   if(typeof monster7 != "undefined"){//проверка на существование
		if(field[player.y][player.x+1] == monster7.char || field[player.y][player.x-1] == monster7.char || field[player.y-1][player.x] == monster7.char ||//если игрок рядом с врагом
		field[player.y+1][player.x] == monster7.char || field[player.y-1][player.x+1] == monster7.char || field[player.y+1][player.x+1] == monster7.char ||
		field[player.y-1][player.x-1] == monster7.char || field[player.y+1][player.x-1] == monster7.char){//начало битвы
			if(player.step == 1){monster7.hp = monster7.hp - player.atk;player.step = 0;}//ход игрока
		}
   }//седьмой монстр
   if(typeof monster8 != "undefined"){//проверка на существование
		if(field[player.y][player.x+1] == monster8.char || field[player.y][player.x-1] == monster8.char || field[player.y-1][player.x] == monster8.char ||//если игрок рядом с врагом
		field[player.y+1][player.x] == monster8.char || field[player.y-1][player.x+1] == monster8.char || field[player.y+1][player.x+1] == monster8.char ||
		field[player.y-1][player.x-1] == monster8.char || field[player.y+1][player.x-1] == monster8.char){//начало битвы
			if(player.step == 1){monster8.hp = monster8.hp - player.atk;player.step = 0;}//ход игрока
		}
   }//восьмой монстр
   if(typeof monster9 != "undefined"){//проверка на существование
		if(field[player.y][player.x+1] == monster9.char || field[player.y][player.x-1] == monster9.char || field[player.y-1][player.x] == monster9.char ||//если игрок рядом с врагом
		field[player.y+1][player.x] == monster9.char || field[player.y-1][player.x+1] == monster9.char || field[player.y+1][player.x+1] == monster9.char ||
		field[player.y-1][player.x-1] == monster9.char || field[player.y+1][player.x-1] == monster9.char){//начало битвы
			if(player.step == 1){monster9.hp = monster9.hp - player.atk;player.step = 0;}//ход игрока
		}
   }//девятый монстр
   if(typeof monster10 != "undefined"){//проверка на существование
		if(field[player.y][player.x+1] == monster10.char || field[player.y][player.x-1] == monster10.char || field[player.y-1][player.x] == monster10.char ||//если игрок рядом с врагом
		field[player.y+1][player.x] == monster10.char || field[player.y-1][player.x+1] == monster10.char || field[player.y+1][player.x+1] == monster10.char ||
		field[player.y-1][player.x-1] == monster10.char || field[player.y+1][player.x-1] == monster10.char){//начало битвы
			if(player.step == 1){monster10.hp = monster10.hp - player.atk;player.step = 0;}//ход игрока
		}
   }//десятый монстр
}
function btnUp() {
   if(field[player.y - 1][player.x] == "□"){
	    field[player.y][player.x] = "□";
		player.y = player.y - 1;
		field[player.y][player.x] = playerChar;
		player.step = 0;
		output();
	}
}

function btnDown() {
   if(field[player.y + 1][player.x] == "□"){
		field[player.y][player.x] = "□";
		player.y = player.y + 1;
		field[player.y][player.x] = playerChar;
		player.step = 0;
		output();
	}
}

function btnLeft() {
	if(field[player.y][player.x - 1] == "□"){
		field[player.y][player.x] = "□";
		player.x = player.x - 1;
		field[player.y][player.x] = playerChar;
		player.step = 0;
		output();
	}
}

function btnRight() {
	if(field[player.y][player.x + 1] == "□" && player.x+1 <= 17){//ограничитель для "правой" части массива
		field[player.y][player.x] = "□";
		player.x = player.x + 1;
		field[player.y][player.x] = playerChar;
		player.step = 0;
		output();
	}
}

var room = {
square: [
["■","■","■","▩","▩","■","■","■"],
["■","□","□","□","□","□","□","■"],
["▩","□","□","□","□","□","□","▩"],
["▩","□","□","□","□","□","□","▩"],
["■","□","□","□","□","□","□","■"],
["■","■","■","▩","▩","■","■","■"]
],

leftTopSquare: [
["□","□","■","▩","▩","■","■","■"],
["□","□","■","□","□","□","□","■"],
["■","■","■","□","□","□","□","▩"],
["▩","□","□","□","□","□","□","▩"],
["▩","□","□","□","□","□","□","■"],
["■","■","■","▩","▩","■","■","■"]
],

leftBottomSquare: [
["■","■","■","▩","▩","■","■","■"],
["▩","□","□","□","□","□","□","■"],
["▩","□","□","□","□","□","□","▩"],
["■","■","■","□","□","□","□","▩"],
["□","□","■","□","□","□","□","■"],
["□","□","■","▩","▩","■","■","■"]
],
rightTopSquare: [
["■","■","■","▩","▩","■","□","□"],
["■","□","□","□","□","■","□","□"],
["▩","□","□","□","□","■","■","■"],
["▩","□","□","□","□","□","□","▩"],
["■","□","□","□","□","□","□","▩"],
["■","■","■","▩","▩","■","■","■"]
],

rightBottomSquare: [
["■","■","■","▩","▩","■","■","■"],
["■","□","□","□","□","□","□","▩"],
["▩","□","□","□","□","□","□","▩"],
["▩","□","□","□","□","■","■","■"],
["■","□","□","□","□","■","□","□"],
["■","■","■","▩","▩","■","□","□"]
],

topRectangle: [
["■","■","■","□","□","■","■","■"],
["■","□","■","▩","▩","■","□","■"],
["▩","□","□","□","□","□","□","▩"],
["▩","□","□","□","□","□","□","▩"],
["■","□","□","□","□","□","□","■"],
["■","■","■","▩","▩","■","■","■"]
],

bottomRectangle: [
["■","■","■","▩","▩","■","■","■"],
["■","□","□","□","□","□","□","■"],
["▩","□","□","□","□","□","□","▩"],
["▩","□","□","□","□","□","□","▩"],
["■","□","■","▩","▩","■","□","■"],
["■","■","■","□","□","■","■","■"]
],

shape: [
["□","■","■","▩","▩","■","■","□"],
["■","□","□","□","□","□","□","■"],
["▩","□","□","□","□","□","□","▩"],
["▩","□","□","□","□","□","□","▩"],
["■","□","□","□","□","□","□","■"],
["□","■","■","▩","▩","■","■","□"]
],
	make(y,x,type){
		if(type == 0){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.square[i][j]; 
				}
			}
		}
		
		else if(type == 1){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.leftTopSquare[i][j]; 
				}
			}
		}
		
		else if(type == 2){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.leftBottomSquare[i][j]; 
				}
			}
		}
		else if(type == 3){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.rightTopSquare[i][j]; 
				}
			}
		}

		else if(type == 4){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.rightBottomSquare[i][j]; 
				}
			}
		}
		
		else if(type == 5){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.topRectangle[i][j]; 
				}
			}
		}
		
		else if(type == 6){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.bottomRectangle[i][j]; 
				}
			}
		}
		
		else if(type == 7){
			for(var i = 0;i<6;i++){
				for(var j = 0;j<8;j++){
					field[y + i][x + j] = this.shape[i][j]; 
				}
			}
		}
	
	},
};
function doors(){
		//НИЖНЯЯ ДВЕРЬ 1 КОМНАТА
		if(roomId1 != 6){ //для первой нижней двери
			if(field[4][3] == playerChar || field[4][4] == playerChar //если игрок рядом с первой дверью
			|| field[6][3] == playerChar || field[6][4] == playerChar)
			{	
				field[5][3] = "□";
				field[5][4] = "□";
			}
			else if(field[5][3] == playerChar || field[5][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
			}
			else{//если игрока поблизости нет
				field[5][3] = "▩";
				field[5][4] = "▩";
			}
		}
		else if(roomId1 == 6){ //для первой нижней двери если bottomRectangle
			if(field[3][3] == playerChar || field[3][4] == playerChar //если игрок рядом с первой дверью
			|| field[5][3] == playerChar || field[5][4] == playerChar)
			{
				field[4][3] = "□";
				field[4][4] = "□";
			}
			else if(field[4][3] == playerChar || field[4][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
			}
			else{//если игрока поблизости нет
				field[4][3] = "▩";
				field[4][4] = "▩";
			}
		}
		//БОКОВАЯ ДВЕРЬ 1 КОМНАТА
		if(roomId1 != 3 && roomId1 != 4){ //для первой боковой двери
			if(field[2][6] == playerChar || field[3][6] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[2][8] == playerChar || field[3][8] == playerChar)//снаружи
			{
				field[2][7] = "□";
				field[3][7] = "□";
			}
			else if(field[2][7] == playerChar || field[3][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
			}
			else{//если игрока поблизости нет
				field[2][7] = "▩";
				field[3][7] = "▩";
			}
		}
		else if(roomId1 == 3){ //для первой боковой двери если rightTopSquare
			if(field[3][6] == playerChar || field[4][6] == playerChar//внутри //если игрок рядом с дверью
			|| field[3][8] == playerChar || field[4][8] == playerChar)//снаружи
			{
				field[3][7] = "□";
				field[4][7] = "□";
			}
			else if(field[3][7] == playerChar || field[4][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
			}
			else{//если игрока поблизости нет
				field[3][7] = "▩";
				field[4][7] = "▩";
			}
		}
		else if(roomId1 == 4){ //для первой боковой двери если rightBottomSquare
			if(field[1][6] == playerChar || field[2][6] == playerChar//внутри //если игрок рядом с дверью
			|| field[1][8] == playerChar || field[2][8] == playerChar)//снаружи
			{
				field[1][7] = "□";
				field[2][7] = "□";
			}
			else if(field[1][7] == playerChar || field[2][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
			}
			else{//если игрока поблизости нет
				field[1][7] = "▩";
				field[2][7] = "▩";
			}
		}
		//////комната 2
//вторая нижняя дверь
		if(roomId2 != 6){ //для второй нижней двери
			if(field[4][13] == playerChar || field[4][14] == playerChar //если игрок рядом с дверью
			|| field[6][13] == playerChar || field[6][14] == playerChar)
			{
				field[5][13] = "□";
				field[5][14] = "□";
			}
			else if(field[5][13] == playerChar || field[5][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster1.active = 1;//активация врагов
				if(typeof monster6 != "undefined"){monster6.active = 1;} //проверка существует ли монстр ? если да активирует
				if(chestX == 14 && chestY == 3 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(healthX == 14 && healthY == 3 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}//появление аптечки если игрок зашел в комнату
				if(downX == 14 && downY == 3){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[5][13] = "▩";
				field[5][14] = "▩";
			}
		}
		else if(roomId2 == 6){ //для второй нижней двери если bottomRectangle
			if(field[3][13] == playerChar || field[3][14] == playerChar //если игрок рядом с дверью
			|| field[5][13] == playerChar || field[5][14] == playerChar)
			{
				field[4][13] = "□";
				field[4][14] = "□";
			}
			else if(field[4][13] == playerChar || field[4][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster1.active = 1;
				if(healthX == 14 && healthY == 3 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}//появление аптечки если игрок зашел в комнату
				if(typeof monster6 != "undefined"){monster6.active = 1;} //проверка существует ли монстр ? если да активирует
				if(chestX == 14 && chestY == 3 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 3){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[4][13] = "▩";
				field[4][14] = "▩";
			}
		}
		//БОКОВАЯ ДВЕРЬ 2 КОМНАТА
		if(roomId2 != 1 && roomId2 != 2){ //для второй боковой двери
			if(field[2][9] == playerChar || field[3][9] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[2][11] == playerChar || field[3][11] == playerChar)//снаружи
			{
				field[2][10] = "□";
				field[3][10] = "□";
			}
			else if(field[2][10] == playerChar || field[3][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster1.active = 1;
				if(typeof monster6 != "undefined"){monster6.active = 1;} //проверка существует ли монстр ? если да активирует
				if(chestX == 14 && chestY == 3 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(healthX == 14 && healthY == 3 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}//появление аптечки если игрок зашел в комнату
				if(downX == 14 && downY == 3){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[2][10] = "▩";
				field[3][10] = "▩";
			}
		}
		else if(roomId2 == 1){ //для второй боковой двери если rightTopSquare
			if(field[3][9] == playerChar || field[4][9] == playerChar//внутри //если игрок рядом с дверью
			|| field[3][11] == playerChar || field[4][11] == playerChar)//снаружи
			{
				field[3][10] = "□";
				field[4][10] = "□";
			}
			else if(field[3][10] == playerChar || field[4][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster1.active = 1;
				if(typeof monster6 != "undefined"){monster6.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 3 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}//появление аптечки если игрок зашел в комнату
				if(chestX == 14 && chestY == 3 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 3){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[3][10] = "▩";
				field[4][10] = "▩";
			}
		}
		else if(roomId2 == 2){ //для первой боковой двери если rightBottomSquare
			if(field[1][9] == playerChar || field[2][9] == playerChar//внутри //если игрок рядом с дверью
			|| field[1][11] == playerChar || field[2][11] == playerChar)//снаружи
			{
				field[1][10] = "□";
				field[2][10] = "□";
			}
			else if(field[1][10] == playerChar || field[2][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster1.active = 1;
				if(typeof monster6 != "undefined"){monster6.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 3 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}//появление аптечки если игрок зашел в комнату
				if(chestX == 14 && chestY == 3 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 3){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[1][10] = "▩";
				field[2][10] = "▩";
			}
		}
		////////////////////////////////////////////////////////////////////////////
		//3 ДВЕРЬ
		if(roomId3 != 5){ //для вверхней двери
			if(field[6][3] == playerChar || field[6][4] == playerChar//снаружи //если игрок рядом с первой дверью
			|| field[8][3] == playerChar || field[8][4] == playerChar)//внутри
			{
				field[7][3] = "□";
				field[7][4] = "□";
			}
			else if(field[7][3] == playerChar || field[7][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster2.active = 1;
				if(typeof monster7 != "undefined"){monster7.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}//появление аптечки если игрок зашел в комнату
				if(chestX == 4 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[7][3] = "▩";
				field[7][4] = "▩";
			}
		}
		else if(roomId3 == 5){ //для вверхней двери если topRectangle
			if(field[7][3] == playerChar || field[7][4] == playerChar //если игрок рядом с первой дверью
			|| field[9][3] == playerChar || field[9][4] == playerChar)
			{
				field[8][3] = "□";
				field[8][4] = "□";
			}
			else if(field[8][3] == playerChar || field[8][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster2.active = 1;
				if(typeof monster7 != "undefined"){monster7.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 10  && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[8][3] = "▩";
				field[8][4] = "▩";
			}
		}
		if(roomId3 != 6){ //для нижней двери
			if(field[11][3] == playerChar || field[11][4] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[13][3] == playerChar || field[13][4] == playerChar)//снаружи
			{
				field[12][3] = "□";
				field[12][4] = "□";
			}
			else if(field[12][3] == playerChar || field[12][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster2.active = 1;
				if(typeof monster7 != "undefined"){monster7.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[12][3] = "▩";
				field[12][4] = "▩";
			}
		}
		if(roomId3 == 6){ //для второй нижней двери если bottomRectangle
			if(field[10][3] == playerChar || field[10][4] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[12][3] == playerChar || field[12][4] == playerChar)//снаружи
			{
				field[11][3] = "□";
				field[11][4] = "□";
			}
			else if(field[11][3] == playerChar || field[11][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster2.active = 1;
				if(typeof monster7 != "undefined"){monster7.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[11][3] = "▩";
				field[11][4] = "▩";
			}
		}
//////////////////////////////////////////////////////////////////////////////////
if(roomId3 != 3 && roomId3 != 4){ //для боковой двери
			if(field[9][6] == playerChar || field[10][6] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[9][8] == playerChar || field[10][8] == playerChar)//снаружи
			{
				field[9][7] = "□";
				field[10][7] = "□";
			}
			else if(field[9][7] == playerChar || field[10][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster2.active = 1;
				if(typeof monster7 != "undefined"){monster7.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[9][7] = "▩";
				field[10][7] = "▩";
			}
		}
		else if(roomId3 == 3){ //для боковой двери если rightTopSquare
			if(field[10][6] == playerChar || field[11][6] == playerChar//внутри //если игрок рядом с дверью
			|| field[10][8] == playerChar || field[11][8] == playerChar)//снаружи
			{
				field[10][7] = "□";
				field[11][7] = "□";
			}
			else if(field[10][7] == playerChar || field[11][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster2.active = 1;
				if(typeof monster7 != "undefined"){monster7.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[10][7] = "▩";
				field[11][7] = "▩";
			}
		}
		else if(roomId3 == 4){ //для боковой двери если rightBottomSquare
			if(field[8][6] == playerChar || field[9][6] == playerChar//внутри //если игрок рядом с дверью
			|| field[8][8] == playerChar || field[9][8] == playerChar)//снаружи
			{
				field[8][7] = "□";
				field[9][7] = "□";
			}
			else if(field[8][7] == playerChar || field[9][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster2.active = 1;
				if(typeof monster7 != "undefined"){monster7.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[8][7] = "▩";
				field[9][7] = "▩";
			}
		}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////4 КОМНАТА
	if(roomId4 != 5){ //для вверхней двери
			if(field[6][13] == playerChar || field[6][14] == playerChar//снаружи //если игрок рядом с дверью
			|| field[8][13] == playerChar || field[8][14] == playerChar) //внути 
			{
				field[7][13] = "□";
				field[7][14] = "□";
			}
			else if(field[7][13] == playerChar || field[7][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster3.active = 1;
				if(typeof monster8 != "undefined"){monster8.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[7][13] = "▩";
				field[7][14] = "▩";
			}
		}
		else if(roomId4 == 5){ //для второй нижней двери если topRectangle
			if(field[7][13] == playerChar || field[7][14] == playerChar //если игрок рядом с дверью
			|| field[9][13] == playerChar || field[9][14] == playerChar)
			{
				field[8][13] = "□";
				field[8][14] = "□";
			}
			else if(field[8][13] == playerChar || field[8][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				if(typeof monster8 != "undefined"){monster8.active = 1;} //проверка существует ли монстр ? если да активирует
				monster3.active = 1;
				if(healthX == 14 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[8][13] = "▩";
				field[8][14] = "▩";
			}
		}
//////////////////////////////////////
	if(roomId4 != 6){ //для НИЖНЕЙ двери
			if(field[11][13] == playerChar || field[11][14] == playerChar//внутри //если игрок рядом с дверью
			|| field[13][13] == playerChar || field[13][14] == playerChar) //снаружи 
			{
				field[12][13] = "□";
				field[12][14] = "□";
			}
			else if(field[12][13] == playerChar || field[12][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				if(typeof monster8 != "undefined"){monster8.active = 1;} //проверка существует ли монстр ? если да активирует
				monster3.active = 1;
				if(healthX == 14 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[12][13] = "▩";
				field[12][14] = "▩";
			}
		}
		else if(roomId4 == 6){ //для второй нижней двери если bottomRectangle
			if(field[10][13] == playerChar || field[10][14] == playerChar //если игрок рядом с дверью
			|| field[12][13] == playerChar || field[12][14] == playerChar)
			{
				field[11][13] = "□";
				field[11][14] = "□";
			}
			else if(field[11][13] == playerChar || field[12][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster3.active = 1;
				if(typeof monster8 != "undefined"){monster8.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[11][13] = "▩";
				field[11][14] = "▩";
			}          
		}
/////////////////////////////////////////////////////////
		if(roomId4 != 1 && roomId4 != 2){ //для боковой двери
			if(field[9][9] == playerChar || field[10][9] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[9][11] == playerChar || field[10][11] == playerChar)//снаружи
			{
				field[9][10] = "□";
				field[10][10] = "□";
			}
			else if(field[9][10] == playerChar || field[10][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster3.active = 1;
				if(typeof monster8 != "undefined"){monster8.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[9][10] = "▩";
				field[10][10] = "▩";
			}
		}
		else if(roomId4 == 1){ //для боковой двери если rightTopSquare
			if(field[10][9] == playerChar || field[11][9] == playerChar//внутри //если игрок рядом с дверью
			|| field[10][11] == playerChar || field[11][11] == playerChar)//снаружи
			{
				field[10][10] = "□";
				field[11][10] = "□";
			}
			else if(field[10][10] == playerChar || field[11][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster3.active = 1;
				if(typeof monster8 != "undefined"){monster8.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[10][10] = "▩";
				field[11][10] = "▩";
			}
		}
		else if(roomId4 == 2){ //для боковой двери если rightBottomSquare
			if(field[8][9] == playerChar || field[9][9] == playerChar//внутри //если игрок рядом с дверью
			|| field[8][11] == playerChar || field[9][11] == playerChar)//снаружи
			{
				field[8][10] = "□";
				field[9][10] = "□";
			}
			else if(field[8][10] == playerChar || field[9][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster3.active = 1;
				if(typeof monster8 != "undefined"){monster8.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 10 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 10 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 10){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[8][10] = "▩";
				field[9][10] = "▩";
			}
		}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//5 дверь
		if(roomId5 != 5){ //для вверхней двери
			if(field[13][3] == playerChar || field[13][4] == playerChar//снаружи //если игрок рядом с первой дверью
			|| field[15][3] == playerChar || field[15][4] == playerChar)//внутри
			{
				field[14][3] = "□";
				field[14][4] = "□";
			}
			else if(field[14][3] == playerChar || field[14][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster4.active = 1;
				if(typeof monster9 != "undefined"){monster9.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[14][3] = "▩";
				field[14][4] = "▩";
			}
		}
		else if(roomId5 == 5){ //для вверхней двери hestесли topRectangle
			if(field[14][3] == playerChar || field[14][4] == playerChar //если игрок рядом с первой дверью
			|| field[16][3] == playerChar || field[16][4] == playerChar)
			{
				field[15][3] = "□";
				field[15][4] = "□";
			}
			else if(field[15][3] == playerChar || field[15][4] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster4.active = 1;
				if(typeof monster9 != "undefined"){monster9.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[15][3] = "▩";
				field[15][4] = "▩";
			}
		}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(roomId5 != 3 && roomId5 != 4){ //для боковой двери
			if(field[16][6] == playerChar || field[17][6] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[16][8] == playerChar || field[17][8] == playerChar)//снаружи
			{
				field[16][7] = "□";
				field[17][7] = "□";
			}
			else if(field[16][7] == playerChar || field[17][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster4.active = 1;
				if(typeof monster9 != "undefined"){monster9.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[16][7] = "▩";
				field[17][7] = "▩";
			}
		}
		else if(roomId5 == 3){ //для боковой двери если rightTopSquare
			if(field[17][6] == playerChar || field[18][6] == playerChar//внутри //если игрок рядом с дверью
			|| field[17][8] == playerChar || field[18][8] == playerChar)//снаружи
			{
				field[17][7] = "□";
				field[18][7] = "□";
			}
			else if(field[17][7] == playerChar || field[18][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster4.active = 1;
				if(typeof monster9 != "undefined"){monster9.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[17][7] = "▩";
				field[18][7] = "▩";
			}
		}
		else if(roomId5 == 4){ //для боковой двери если rightBottomSquare
			if(field[15][6] == playerChar || field[16][6] == playerChar//внутри //если игрок рядом с дверью
			|| field[15][8] == playerChar || field[16][8] == playerChar)//снаружи
			{
				field[15][7] = "□";
				field[16][7] = "□";
			}
			else if(field[15][7] == playerChar || field[16][7] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster4.active = 1;
				if(typeof monster9 != "undefined"){monster9.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 4 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 4 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 4 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[15][7] = "▩";
				field[16][7] = "▩";
			}
		}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//6 комната
	if(roomId6 != 5){ //для вверхней двери
			if(field[13][13] == playerChar || field[13][14] == playerChar//снаружи //если игрок рядом с дверью
			|| field[15][13] == playerChar || field[15][14] == playerChar) //внути 
			{
				field[14][13] = "□";
				field[14][14] = "□";
			}
			else if(field[14][13] == playerChar || field[14][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster5.active = 1;
				if(typeof monster10 != "undefined"){monster9.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[14][13] = "▩";
				field[14][14] = "▩";
			}
		}
		else if(roomId6 == 5){ //если topRectangle
			if(field[14][13] == playerChar || field[14][14] == playerChar //если игрок рядом с дверью
			|| field[16][13] == playerChar || field[16][14] == playerChar)
			{
				field[15][13] = "□";
				field[15][14] = "□";
			}
			else if(field[15][13] == playerChar || field[15][14] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster5.active = 1;
				if(typeof monster10 != "undefined"){monster10.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[15][13] = "▩";
				field[15][14] = "▩";
			}
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(roomId6 != 1 && roomId6 != 2){ //для боковой двери
			if(field[16][9] == playerChar || field[17][9] == playerChar//внутри //если игрок рядом с первой дверью
			|| field[16][11] == playerChar || field[17][11] == playerChar)//снаружи
			{
				field[16][10] = "□";
				field[17][10] = "□";
			}
			else if(field[16][10] == playerChar || field[17][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster5.active = 1;
				if(typeof monster10 != "undefined"){monster10.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 17){field[downY][downX] =
				downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[16][10] = "▩";
				field[17][10] = "▩";
			}
		}
		else if(roomId6 == 1){ //для боковой двери если rightTopSquare
			if(field[17][9] == playerChar || field[18][9] == playerChar//внутри //если игрок рядом с дверью
			|| field[17][11] == playerChar || field[18][11] == playerChar)//снаружи
			{
				field[17][10] = "□";
				field[18][10] = "□";
			}
			else if(field[17][10] == playerChar || field[18][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster5.active = 1;
				if(typeof monster10 != "undefined"){monster10.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[17][10] = "▩";
				field[18][10] = "▩";
			}
		}
		else if(roomId6 == 2){ //для боковой двери если rightBottomSquare
			if(field[15][9] == playerChar || field[16][9] == playerChar//внутри //если игрок рядом с дверью
			|| field[15][11] == playerChar || field[16][11] == playerChar)//снаружи
			{
				field[15][10] = "□";
				field[16][10] = "□";
			}
			else if(field[15][10] == playerChar || field[16][10] == playerChar){//если игрок проходит через дверь
				field[player.y][player.x] = playerChar;
				monster5.active = 1;
				if(typeof monster10 != "undefined"){monster10.active = 1;} //проверка существует ли монстр ? если да активирует
				if(healthX == 14 && healthY == 17 && healthActive == 1){field[healthY][healthX] = healthChar; healthActive = 0;}
				if(chestX == 14 && chestY == 17 && chestActive == 1){field[chestY][chestX] = chestChar; chestActive = 0;}//появление сундука если игрок зашел в комнату
				if(downX == 14 && downY == 17){field[downY][downX] = downChar;}//появление спуска если игрок зашел в комнату
			}
			else{//если игрока поблизости нет
				field[15][10] = "▩";
				field[16][10] = "▩";
			}
		}
}
	function cycle(){
	    monster1.moving();//запуск ИИ врагов
        monster2.moving();//5 монстров - минимальное колво, поэтому в проверке не требуется
        monster3.moving();
        monster4.moving();
        monster5.moving();
		if(typeof monster6 != "undefined"){monster6.moving();} //проверка существует ли монстр ? если да запускает ИИ
		if(typeof monster7 != "undefined"){monster7.moving();} //проверка существует ли монстр ? если да запускает ИИ
		if(typeof monster8 != "undefined"){monster8.moving();} //проверка существует ли монстр ? если да запускает ИИ
		if(typeof monster9 != "undefined"){monster9.moving();} //проверка существует ли монстр ? если да запускает ИИ
		if(typeof monster10 != "undefined"){monster10.moving();} //проверка существует ли монстр ? если да запускает ИИ

		doors();
		player.life();
		output();
		document.getElementById("statsHP").innerHTML="hp:" + player.hp;//вывод статистики
		document.getElementById("statsATK").innerHTML=" atk:" + player.atk
		document.getElementById("statsWEAPON").innerHTML=" weapon:" + player.wpn
		document.getElementById("statsFLOOR").innerHTML=" floor:" + level;
		//вывод статистики
	    if(time >= 10){//после прохождения 1 секунды(100х10 = 1000millis) таймер сбрасываеться
        		time = 0;
		}
	    time = time + 1;//одна еденица равна 100 миллисекунд
}

function items(mode){
	//генерация предметов
	var roomChest  = random(0,6);
	var roomHealth = random(0,6);
	var roomDown = random(0,5);
	console.log(roomDown)
	console.log(roomChest)
	console.log(roomHealth)
	if(mode == "chest"){//chest
		if(roomDown == roomChest){
			while(roomDown == roomChest){roomDown = random(0,5);console.log(roomDown)}//если комната сундука и спуска совпадает выбрать другую
		}
		if(roomChest == 0){chestY = 3;chestX = 4;field[chestY][chestX] = chestChar;}
		else if(roomChest == 1){chestY = 3;chestX = 14;}
		else if(roomChest == 2){chestY = 10;chestX = 4;}
		else if(roomChest == 3){chestY = 10;chestX = 14;}
		else if(roomChest == 4){chestY = 17;chestX = 4;}
		else if(roomChest == 5){chestY = 17;chestX = 14;}
		chestActive = 1;
	}
	if(mode == "health"){//health
		if(roomDown == roomChest){
			while(roomDown == roomHealth){roomDown = random(0,5);}
		}
		if(roomHealth == 0){healthY = 3;healthX = 4;field[healthY][healthX] = healthChar;}
		else if(roomHealth == 1){healthY = 3;healthX = 14;}
		else if(roomHealth == 2){heatlhY = 10;healthX = 4;}
		else if(roomHealth == 3){healthY = 10;healthX = 14;}
		else if(roomHealth == 4){healthY = 17;healthX = 4;}
		else if(roomHealth == 5){healthY = 17;healthX = 14;}
		healthActive = 1;
	}
	
	if(roomDown == 0){downY = 3;downX = 14;}//находиться на каждом уровне поэтому особого аргумента не требует
	else if(roomDown == 1){downY = 10;downX = 4;}
	else if(roomDown == 2){downY = 10;downX = 14;}
	else if(roomDown == 3){downY = 17;downX = 4;}
	else if(roomDown == 4){downY = 17;downX = 14;}
}
//levels
function lvl1(){
	makefld(18,20);
	roomId1 = random(0,8);
	roomId2 = random(0,8);
	roomId3 = random(0,8);
	roomId4 = random(0,8);
	roomId5 = random(0,8);
	roomId6 = random(0,8);

	room.make(0,0,roomId1);
	room.make(0,10,roomId2);
	room.make(7,0,roomId3);
	room.make(7,10,roomId4);
	room.make(14,0,roomId5);
	room.make(14,10,roomId6);
	items("chest");
	init();
	output();
	window.monster1 = new enemy(14,2,4,2,"m1");//монстры 
	window.monster2 = new enemy(4,9,4,2,"m2");//виндов - создание глобальныъ переменных
	window.monster3 = new enemy(14,9,4,2,"m3");
	window.monster4 = new enemy(4,16,4,2,"m4");
	window.monster5 = new enemy(14,16,4,2,"m5");
	loop = setInterval(cycle,100);
}
function lvl2(){
	level = 2;
	player.x = 3;
	player.y = 2;
	makefld(18,20);
	roomId1 = random(0,8);
	roomId2 = random(0,8);
	roomId3 = random(0,8);
	roomId4 = random(0,8);
	roomId5 = random(0,8);
	roomId6 = random(0,8);

	room.make(0,0,roomId1);
	room.make(0,10,roomId2);
	room.make(7,0,roomId3);
	room.make(7,10,roomId4);
	room.make(14,0,roomId5);
	room.make(14,10,roomId6);
	items("health");
	init();
	output();
	
	if(random(0,20) == 1){ 
		enemy1IMG.src = "skeleton.png"
		enemy1IMG2.src = "skeleton2.png"
		window.monster1 = new enemy(14,2,8,3,"m1");}
	else{window.monster1 = new enemy(14,2,4,2,"m1");}
	
	if(random(0,20) == 1){ 
		enemy2IMG.src = "skeleton.png"
		enemy2IMG2.src = "skeleton2.png"
		window.monster2 = new enemy(4,9,8,3,"m2");}
	else{window.monster2 = new enemy(4,9,4,2,"m2");}
	
	if(random(0,20) == 1){
		enemy3IMG.src = "skeleton.png"
		enemy3IMG2.src = "skeleton2.png"
		window.monster3 = new enemy(14,9,8,3,"m3");}
	else{window.monster3 = new enemy(14,9,4,2,"m3");}
	
	if(random(0,20) == 1){
		enemy4IMG.src = "skeleton.png"
		enemy4IMG2.src = "skeleton2.png"
		window.monster4 = new enemy(4,16,8,3,"m4");}
	else{window.monster4 = new enemy(4,16,4,2,"m4");}
	
	if(random(0,20) == 1){
		enemy5IMG.src = "skeleton.png"
		enemy5IMG2.src = "skeleton2.png"
		window.monster5 = new enemy(14,16,8,3,"m5");}
	else{window.monster5 = new enemy(14,16,4,2,"m5");}
	
	if(random(0,20) == 1){
		enemy6IMG.src = "skeleton.png"
		enemy6IMG2.src = "skeleton2.png"
		window.monster6 = new enemy(13,2,8,3,"m6");}
	else{window.monster6 = new enemy(13,2,4,2,"m6");}

	if(random(0,20) == 1){
		enemy7IMG.src = "skeleton.png"
		enemy7IMG2.src = "skeleton2.png"
		window.monster7 = new enemy(3,9,8,3,"m7");}
	else{window.monster7 = new enemy(3,9,4,2,"m7");}

	if(random(0,20) == 1){
		enemy8IMG.src = "skeleton.png"
		enemy8IMG2.src = "skeleton2.png"
		window.monster8 = new enemy(13,9,8,3,"m8");}
	else{window.monster8 = new enemy(13,9,4,2,"m8");}

	if(random(0,20) == 1){
		enemy9IMG.src = "skeleton.png"
		enemy9IMG2.src = "skeleton2.png"
		window.monster9 = new enemy(3,16,8,3,"m9");}
	else{window.monster9 = new enemy(3,16,4,2,"m9");}
	
	if(random(0,20) == 1){
		enemy10IMG.src = "skeleton.png"
		enemy10IMG2.src = "skeleton2.png"
		window.monster10 = new enemy(13,16,8,3,"m10");}
	else{window.monster10 = new enemy(13,16,4,2,"m10");}

	loop = setInterval(cycle,100);
}
///////////////
function lvl3(){
	level = 3;
	player.x = 3;
	player.y = 2;
	makefld(18,20);
	roomId1 = random(0,8);
	roomId2 = random(0,8);
	roomId3 = random(0,8);
	roomId4 = random(0,8);
	roomId5 = random(0,8);
	roomId6 = random(0,8);

	room.make(0,0,roomId1);
	room.make(0,10,roomId2);
	room.make(7,0,roomId3);
	room.make(7,10,roomId4);
	room.make(14,0,roomId5);
	room.make(14,10,roomId6);
	init();
	output();
	
	if(random(0,10) == 1){ 
		enemy1IMG.src = "skeleton.png"
		enemy1IMG2.src = "skeleton2.png"
		window.monster1 = new enemy(14,2,8,3,"m1");}
	else{
		enemy1IMG.src = "slime.png"
		enemy1IMG2.src = "slime2.png"
		window.monster1 = new enemy(14,2,4,2,"m1");}
	
	if(random(0,10) == 1){ 
		enemy2IMG.src = "skeleton.png"
		enemy2IMG2.src = "skeleton2.png"
		window.monster2 = new enemy(4,9,8,3,"m2");}
	else{
		enemy2IMG.src = "slime.png"
		enemy2IMG2.src = "slime2.png"
		window.monster2 = new enemy(4,9,4,2,"m2");}
	
	if(random(0,10) == 1){
		enemy3IMG.src = "skeleton.png"
		enemy3IMG2.src = "skeleton2.png"
		window.monster3 = new enemy(14,9,8,3,"m3");}
	else{
		enemy3IMG.src = "slime.png"
		enemy3IMG2.src = "slime2.png"
		window.monster3 = new enemy(14,9,4,2,"m3");}
	
	if(random(0,10) == 1){
		enemy4IMG.src = "skeleton.png"
		enemy4IMG2.src = "skeleton2.png"
		window.monster4 = new enemy(4,16,8,3,"m4");}
	else{
		enemy4IMG.src = "slime.png"
		enemy4IMG2.src = "slime2.png"
		window.monster4 = new enemy(4,16,4,2,"m4");}
	
	if(random(0,10) == 1){
		enemy5IMG.src = "skeleton.png"
		enemy5IMG2.src = "skeleton2.png"
		window.monster5 = new enemy(14,16,8,3,"m5");}
	else{
		enemy5IMG.src = "slime.png"
		enemy5IMG2.src = "slime2.png"
		window.monster5 = new enemy(14,16,4,2,"m5");}
	
	if(random(0,10) == 1){
		enemy6IMG.src = "skeleton.png"
		enemy6IMG2.src = "skeleton2.png"
		window.monster6 = new enemy(13,2,8,3,"m6");}
	else{
		enemy6IMG.src = "slime.png"
		enemy6IMG2.src = "slime2.png"
		window.monster6 = new enemy(13,2,4,2,"m6");}

	if(random(0,10) == 1){
		enemy7IMG.src = "skeleton.png"
		enemy7IMG2.src = "skeleton2.png"
		window.monster7 = new enemy(3,9,8,3,"m7");}
	else{
		enemy7IMG.src = "slime.png"
		enemy7IMG2.src = "slime2.png"
		window.monster7 = new enemy(3,9,4,2,"m7");}

	if(random(0,10) == 1){
		enemy8IMG.src = "skeleton.png"
		enemy8IMG2.src = "skeleton2.png"
		window.monster8 = new enemy(13,9,8,3,"m8");}
	else{
		enemy8IMG.src = "slime.png"
		enemy8IMG2.src = "slime2.png"
		window.monster8 = new enemy(13,9,4,2,"m8");}

	if(random(0,10) == 1){
		enemy9IMG.src = "skeleton.png"
		enemy9IMG2.src = "skeleton2.png"
		window.monster9 = new enemy(3,16,8,3,"m9");}
	else{
		enemy9IMG.src = "slime.png"
		enemy9IMG2.src = "slime2.png"
		window.monster9 = new enemy(3,16,4,2,"m9");}
	
	if(random(0,10) == 1){
		enemy10IMG.src = "skeleton.png"
		enemy10IMG2.src = "skeleton2.png"
		window.monster10 = new enemy(13,16,8,3,"m10");}
	else{
		enemy10IMG.src = "slime.png"
		enemy10IMG2.src = "slime2.png"
		window.monster10 = new enemy(13,16,4,2,"m10");}

	loop = setInterval(cycle,100);
}
lvl1();

