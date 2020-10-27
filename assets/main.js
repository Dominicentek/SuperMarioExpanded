var developerMode = false

var randomLevelConfig = {"width": 10, "height": 10, "solidRate": 1, "resetterRate": 1, "iceRate": 1, "hasLever": true, "moneybagAmount": 3, "spotlight": false, "seed": ""}
var editorConfig = {"width": 10, "height": 10, "spotlight": false}
var editor = {"x": 0, "y": 0, "item": "solid", "data": [], "origData": []}
var screen;
var scenario = "title"
var cursorPos = {"x": 0, "y": 0}
var elm;
var playerPos = {"x": 0, "y": 0}
var tileData = []
var origTileData = []
var moneybags = 0
var maxmoneybags = 3
var levelsfinished = 0
var isRandom = false
var isEditor = false
var movingElms = []
var isSpotlight = false
var isTorchSpotlight = false
var hasPickaxe = false
var world = 1
var level = 1
var blinking = true;
var data = {
	"images": {
		"solid": new Image,
		"lever": {
			"on": new Image,
			"off": new Image
		},
		"moneybag": new Image,
		"door": new Image,
		"mario": new Image,
		"resetter": new Image,
		"flag": new Image,
		"wall": new Image,
		"ice": new Image,
		"torch": new Image,
		"pickaxe": new Image,
		"arrow": new Image,
		"flippedArrow": new Image,
		"title": new Image,
		"dong": new Image,
		"editor": {
			"cell": new Image,
			"selected": new Image
		},
		"spotlight": new Image,
		"torch_spotlight": new Image,
		"buttons": {
			"playtext": new Image,
			"play": new Image,
			"back": new Image,
			"wrl1": new Image,
			"wrl2": new Image,
			"wrl3": new Image,
			"wrl4": new Image,
			"wrl5": new Image,
			"lvl1": new Image,
			"lvl2": new Image,
			"lvl3": new Image,
			"lvl4": new Image,
			"lvl5": new Image,
			"random": new Image,
			"sldspawnrate": new Image,
			"rstspawnrate": new Image,
			"icespawnrate": new Image,
			"mnbgamount": new Image,
			"spwnlvranddoor": new Image,
			"true": new Image,
			"false": new Image,
			"width": new Image,
			"height": new Image,
			"generate": new Image,
			"longback": new Image,
			"editor": new Image,
			"edit": new Image,
			"spotlight": new Image,
			"editorbacktext": new Image,
			"seed": new Image,
			"numbers": {
				"zero": new Image,
				"one": new Image,
				"two": new Image,
				"three": new Image,
				"four": new Image,
				"five": new Image,
				"six": new Image,
				"seven": new Image,
				"eight": new Image,
				"nine": new Image,
				"ten": new Image,
				"eleven": new Image,
				"twelve": new Image,
				"thirteen": new Image,
				"fourteen": new Image,
				"fifteen": new Image
			}
		}
	},
	"sound": {
		"collectmoneybag": new Audio("./assets/sound/collectmoneybag.wav"),
		"finish": new Audio("./assets/sound/finish.wav"),
		"select": new Audio("./assets/sound/select.wav"),
		"ok": new Audio("./assets/sound/ok.wav"),
		"back": new Audio("./assets/sound/back.wav"),
		"block": new Audio("./assets/sound/block.wav"),
		"switchlever": new Audio("./assets/sound/switchlever.wav"),
		"music": {
			"title": "./assets/sound/music/title.mp3",
			"menu": "./assets/sound/music/menu.mp3",
			"level": "./assets/sound/music/level.mp3",
			"spotlight": "./assets/sound/music/spotlight.mp3"
		}
	},
	"levels": {
		"world1": {
			"level1": [[4,1,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,2,0,0,0,0,0,0,0],[0,0,1,1,0,0,2,0,0,0,0,0,4],[0,0,0,0,1,0,0,5,0,0,0,0,1],[0,8,0,0,1,1,0,1,2,2,2,0,1],[1,1,0,0,0,0,0,1,2,0,0,0,1],[1,1,0,0,0,0,0,1,2,4,0,0,1]],
			"level2": [[0,0,0,0,1,0,0,4],[0,0,0,0,1,0,0,0],[0,0,0,0,7,0,0,0],[1,4,1,1,1,1,1,1],[1,0,1,0,0,0,0,6],[5,0,0,0,0,0,0,2],[2,0,2,4,0,0,2,1],[2,0,2,1,1,2,1,1],[2,8,2,1,1,1,1,1]],
			"level3": [[0,4,1,6,3,0,0,0,0],[7,2,1,1,1,1,0,0,0],[0,0,3,4,2,3,0,0,4],[0,0,1,1,1,1,0,2,2],[8,0,0,0,0,0,0,3,5]],
			"level4": [[4,0,0,0,7,0,7,0,7,7,0,0,0,0],[3,1,0,0,7,0,0,0,0,0,0,0,0,0],[3,1,0,0,7,7,7,7,0,2,0,0,1,3],[3,1,0,7,7,0,0,0,0,2,0,0,1,3],[3,1,0,0,0,0,7,7,7,1,0,0,1,4],[3,1,7,7,0,0,7,0,7,1,1,0,1,1],[3,1,0,7,0,0,7,0,0,1,0,0,0,0],[3,1,2,2,1,0,7,0,1,1,1,1,0,0],[8,7,5,2,3,0,0,0,7,0,4,1,6,0]],
			"level5": [[5,3,0,2,2],[2,2,0,3,4],[2,4,7,2,2],[2,3,0,3,0],[8,0,4,2,6]]
		},
		"world2": {
			"level1": [[1,5,7,0,0,8,7,7,1,4],[1,1,2,0,0,0,7,1,1,3],[2,3,4,3,0,0,7,7,2,0],[1,1,2,0,0,0,0,7,2,7],[1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,7,0,7],[0,0,1,0,0,0,0,7,0,7],[4,1,1,0,0,0,0,7,6,7]],
			"level2": [[2,2,2,2,2,2,3,4,3,0,0],[2,3,4,3,0,0,0,3,0,0,0],[2,2,2,1,0,0,0,0,0,0,0],[1,1,1,7,7,7,7,7,7,7,7],[1,1,0,0,0,3,0,7,0,0,0],[1,8,0,0,0,7,4,7,0,7,0],[1,1,0,0,0,7,7,7,0,7,0],[1,1,1,0,5,0,0,0,0,7,6]],
			"level3": [[1,1,1,1,1,1,1,1,0,0],[1,1,2,3,0,2,5,1,0,0],[1,0,1,1,0,2,3,1,0,0],[1,0,10,1,4,0,0,1,1,1],[1,1,0,1,1,2,0,0,0,0],[1,1,0,4,1,0,1,1,1,0],[1,1,0,1,2,0,0,0,0,0],[1,1,0,1,3,0,1,2,0,1],[1,1,0,0,0,0,3,4,1,1],[1,1,1,1,1,1,1,1,1,1]],
			"level4": [[10,0,0,0,0,0,3,2,1,1,1],[1,1,0,2,0,0,1,1,1,1,1],[0,4,0,1,0,0,7,0,0,0,0],[0,2,2,1,0,0,7,0,0,0,0],[0,0,0,1,0,2,7,0,0,0,0],[7,7,7,1,0,1,7,0,0,5,0],[0,11,0,1,4,1,2,2,2,2,2],[1,1,1,1,0,1,0,0,0,0,6],[0,0,0,0,0,0,0,0,0,0,0],[3,3,3,3,3,3,3,3,3,3,3],[2,2,4,2,2,2,2,2,2,2,2]],
			"level5": [[0,7,0,0,0,0,0,0,7,4],[5,7,0,0,0,0,0,0,7,7],[7,7,0,0,0,0,0,0,0,0],[0,7,0,0,0,0,0,0,0,0],[0,1,3,3,3,3,3,2,7,7],[4,1,0,0,0,0,0,2,0,0],[1,1,0,0,0,0,0,2,0,0],[8,0,0,2,2,2,3,1,0,0],[1,1,1,2,2,2,3,1,0,0],[6,0,0,0,0,0,0,1,0,4]]
		},
		"world3": {
			"level1": [[0,0,0,0,0,0,7,7,0,0,0,1,1],[0,4,0,0,0,0,7,7,0,0,0,1,1],[0,0,0,0,0,0,7,7,0,5,0,1,1],[0,0,0,0,0,0,7,7,1,1,1,1,6],[1,1,1,1,1,1,1,1,1,1,1,1,1],[0,0,7,7,0,0,0,0,0,0,0,0,4],[0,0,7,7,0,0,0,0,0,0,0,0,0],[4,0,7,7,0,0,0,0,0,0,0,12,0],[12,0,7,7,0,8,0,0,0,0,0,0,0]],
			"level2": [[2,0,4,4,2],[2,0,5,4,2],[2,1,2,2,2],[2,0,0,0,2],[2,12,0,8,2]],
			"level3": [[1,12,1,12,1,12,1,12,1,12,1,12,1,12,2,12,4],[12,1,12,1,12,2,12,2,12,1,12,2,12,4,12,2,12],[1,12,1,12,2,12,2,12,1,12,2,12,2,12,2,12,1],[12,1,12,2,12,2,12,2,12,1,12,1,12,2,12,1,12],[1,12,1,12,1,12,2,12,2,12,2,12,2,12,2,12,1],[12,2,12,1,12,2,12,2,12,2,12,1,12,1,12,1,12],[2,12,4,12,2,12,1,12,1,12,1,12,1,12,2,12,1],[12,2,12,2,12,1,12,2,12,2,12,1,12,1,12,2,12],[2,12,2,12,1,12,2,12,2,12,2,12,1,12,2,12,2],[12,2,12,1,12,2,12,1,12,1,12,2,12,1,12,2,12],[2,12,1,12,1,12,2,12,5,12,2,12,1,12,2,12,2],[12,2,12,1,12,2,12,1,12,2,12,1,12,2,12,2,12],[2,12,1,12,1,12,2,12,2,12,1,12,2,12,2,12,2],[12,2,12,1,12,2,12,1,12,1,12,2,12,2,12,2,12],[2,8,12,12,2,12,2,12,2,12,2,12,2,12,2,12,2]],
			"level4": [[0,0,0,7,7,12,2,0,0,0,0,0,12],[0,0,0,7,7,0,2,0,0,0,0,0,4],[4,0,12,7,7,0,2,1,2,2,2,2,2],[1,1,1,7,0,0,2,3,2,4,0,0,0],[0,1,1,0,0,0,0,0,0,0,0,0,0],[12,1,1,1,0,0,0,0,0,0,0,0,1],[11,1,1,5,1,0,10,0,0,0,0,1,6]],
			"level5": []
		},
		"world4": {
			"level1": [],
			"level2": [],
			"level3": [],
			"level4": [],
			"level5": []
		},
		"world5": {
			"level1": [],
			"level2": [],
			"level3": [],
			"level4": [],
			"level5": [[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,8,4,5,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]] 
		}
	}
}
data.images.solid.src = "./assets/images/solid.png"
data.images.lever.on.src = "./assets/images/lever/on.png"
data.images.lever.off.src = "./assets/images/lever/off.png"
data.images.moneybag.src = "./assets/images/moneybag.png"
data.images.door.src = "./assets/images/door.png"
data.images.mario.src = "./assets/images/mario.png"
data.images.resetter.src = "./assets/images/resetter.png"
data.images.flag.src = "./assets/images/flag.png"
data.images.wall.src = "./assets/images/wall.png"
data.images.ice.src = "./assets/images/ice.png"
data.images.torch.src = "./assets/images/torch.png"
data.images.pickaxe.src = "./assets/images/pickaxe.png"
data.images.arrow.src = "./assets/images/arrow.png"
data.images.flippedArrow.src = "./assets/images/flippedArrow.png"
data.images.title.src = "./assets/images/title.png"
data.images.dong.src = "./assets/images/dong.png"
data.images.editor.cell.src = "./assets/images/editor/cell.png"
data.images.editor.selected.src = "./assets/images/editor/selected.png"
data.images.spotlight.src = "./assets/images/spotlight.png"
data.images.torch_spotlight.src = "./assets/images/torch_spotlight.png"
data.images.buttons.play.src = "./assets/images/buttons/play.png"
data.images.buttons.playtext.src = "./assets/images/buttons/playtext.png"
data.images.buttons.back.src = "./assets/images/buttons/back.png"
data.images.buttons.wrl1.src = "./assets/images/buttons/wrl1.png"
data.images.buttons.wrl2.src = "./assets/images/buttons/wrl2.png"
data.images.buttons.wrl3.src = "./assets/images/buttons/wrl3.png"
data.images.buttons.wrl4.src = "./assets/images/buttons/wrl4.png"
data.images.buttons.wrl5.src = "./assets/images/buttons/wrl5.png"
data.images.buttons.lvl1.src = "./assets/images/buttons/lvl1.png"
data.images.buttons.lvl2.src = "./assets/images/buttons/lvl2.png"
data.images.buttons.lvl3.src = "./assets/images/buttons/lvl3.png"
data.images.buttons.lvl4.src = "./assets/images/buttons/lvl4.png"
data.images.buttons.lvl5.src = "./assets/images/buttons/lvl5.png"
data.images.buttons.random.src = "./assets/images/buttons/random.png"
data.images.buttons.sldspawnrate.src = "./assets/images/buttons/sldspawnrate.png"
data.images.buttons.rstspawnrate.src = "./assets/images/buttons/rstspawnrate.png"
data.images.buttons.icespawnrate.src = "./assets/images/buttons/icespawnrate.png"
data.images.buttons.mnbgamount.src = "./assets/images/buttons/mnbgamount.png"
data.images.buttons.spwnlvranddoor.src = "./assets/images/buttons/spwnlvranddoor.png"
data.images.buttons.true.src = "./assets/images/buttons/true.png"
data.images.buttons.false.src = "./assets/images/buttons/false.png"
data.images.buttons.width.src = "./assets/images/buttons/width.png"
data.images.buttons.height.src = "./assets/images/buttons/height.png"
data.images.buttons.generate.src = "./assets/images/buttons/generate.png"
data.images.buttons.longback.src = "./assets/images/buttons/longback.png"
data.images.buttons.editor.src = "./assets/images/buttons/editor.png"
data.images.buttons.edit.src = "./assets/images/buttons/edit.png"
data.images.buttons.editorbacktext.src = "./assets/images/buttons/editorbacktext.png"
data.images.buttons.spotlight.src = "./assets/images/buttons/spotlight.png"
data.images.buttons.seed.src = "./assets/images/buttons/seed.png"
data.images.buttons.numbers.zero.src = "./assets/images/buttons/numbers/zero.png"
data.images.buttons.numbers.one.src = "./assets/images/buttons/numbers/one.png"
data.images.buttons.numbers.two.src = "./assets/images/buttons/numbers/two.png"
data.images.buttons.numbers.three.src = "./assets/images/buttons/numbers/three.png"
data.images.buttons.numbers.four.src = "./assets/images/buttons/numbers/four.png"
data.images.buttons.numbers.five.src = "./assets/images/buttons/numbers/five.png"
data.images.buttons.numbers.six.src = "./assets/images/buttons/numbers/six.png"
data.images.buttons.numbers.seven.src = "./assets/images/buttons/numbers/seven.png"
data.images.buttons.numbers.eight.src = "./assets/images/buttons/numbers/eight.png"
data.images.buttons.numbers.nine.src = "./assets/images/buttons/numbers/nine.png"
data.images.buttons.numbers.ten.src = "./assets/images/buttons/numbers/ten.png"
data.images.buttons.numbers.eleven.src = "./assets/images/buttons/numbers/eleven.png"
data.images.buttons.numbers.twelve.src = "./assets/images/buttons/numbers/twelve.png"
data.images.buttons.numbers.thirteen.src = "./assets/images/buttons/numbers/thirteen.png"
data.images.buttons.numbers.fourteen.src = "./assets/images/buttons/numbers/fourteen.png"
data.images.buttons.numbers.fifteen.src = "./assets/images/buttons/numbers/fifteen.png"
window.onkeydown = function(event) {
executeKeyInput(event.keyCode, event.code)
}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x,y]
}
var btnAvailable = false
var phone = false
function start(onphone) {
if (onphone) phone = true
elm = document.getElementsByTagName('canvas')[0]
screen = elm.getContext('2d')
elm.setAttribute('width', window.innerWidth)
elm.setAttribute('height', window.innerHeight)
setTimeout(function() {
screen.drawImage(data.images.title, (elm.width - (elm.width / 2)) - (678 / 2), 100)
screen.drawImage(data.images.buttons.play, (elm.width - (elm.width / 2)) - (248 / 2), 350)
btnAvailable = true
}, 1000)
}
function displayLevelSelect() {
if (!btnAvailable) return
changeMusic(data.sound.music.menu)
scenario = "menu01"
data.sound.ok.play()
updateSelection(true, 0, true)
}
function updateSelection(isWorldSelect, index, disableSFX) {
screen.clearRect(0, 0, elm.width, elm.height)
if (!disableSFX) data.sound.select.play()
var width = 181
var height = 224
if (isWorldSelect) height += 32
var x = (elm.width - (elm.width / 2)) - (width / 2)
var y = (elm.height - (elm.height / 2)) - (height / 2)
if (isWorldSelect) {
screen.drawImage(data.images.buttons.wrl1, x + 32, y)
screen.drawImage(data.images.buttons.wrl2, x + 32, y + 32)
screen.drawImage(data.images.buttons.wrl3, x + 32, y + 64)
screen.drawImage(data.images.buttons.wrl4, x + 32, y + 96)
screen.drawImage(data.images.buttons.wrl5, x + 32, y + 128)
screen.drawImage(data.images.buttons.random, x + 32, y + 160)
screen.drawImage(data.images.buttons.editor, x + 32, y + 192)
screen.drawImage(data.images.arrow, x, y + (index * 32))
}
else {
if (scenario.substr(4, 1) == '1') screen.drawImage(data.images.buttons.wrl1, (elm.width - (elm.width / 2) - (150 / 2)), y - 64)
if (scenario.substr(4, 1) == '2') screen.drawImage(data.images.buttons.wrl2, (elm.width - (elm.width / 2) - (150 / 2)), y - 64)
if (scenario.substr(4, 1) == '3') screen.drawImage(data.images.buttons.wrl3, (elm.width - (elm.width / 2) - (150 / 2)), y - 64)
if (scenario.substr(4, 1) == '4') screen.drawImage(data.images.buttons.wrl4, (elm.width - (elm.width / 2) - (150 / 2)), y - 64)
if (scenario.substr(4, 1) == '5') screen.drawImage(data.images.buttons.wrl5, (elm.width - (elm.width / 2) - (150 / 2)), y - 64)
screen.drawImage(data.images.buttons.lvl1, x + 32, y)
screen.drawImage(data.images.buttons.lvl2, x + 32, y + 32)
screen.drawImage(data.images.buttons.lvl3, x + 32, y + 64)
screen.drawImage(data.images.buttons.lvl4, x + 32, y + 96)
screen.drawImage(data.images.buttons.lvl5, x + 32, y + 128)
screen.drawImage(data.images.buttons.back, x + 32, y + 160)
screen.drawImage(data.images.arrow, x, y + (index * 32))
}
}
function changeMusic(music) {
document.getElementById('music').src = music
document.getElementById('music').parentNode.load()
}
function generateRandomLevel(width, height, solidRate, resetterRate, iceRate, hasLever, moneybagAmount, spotlight) {
Math.seedrandom()
if (randomLevelConfig.seed == "" || randomLevelConfig.seed == null) randomLevelConfig.seed = "" + Math.floor(Math.random() * 9223372036854775807)
Math.seedrandom(randomLevelConfig.seed)
isRandom = true
isEditor = false
isTorchSpotlight = false
isSpotlight = spotlight
moneybags = 0
maxmoneybags = moneybagAmount
scenario = 'level'
origTileData = []
changeMusic(data.sound.music.level)
screen.clearRect(0, 0, elm.width, elm.height)
var y = (elm.height - (elm.height / 2)) - (height * 16)
var x = (elm.width - (elm.width / 2)) - (width * 16)
tileData = []
for (var i = -1; i < width + 1; i++) {
screen.drawImage(data.images.wall, x + (i * 32), y - 32)
}
for (var i = 0; i < height; i++) {
screen.drawImage(data.images.wall, x - 32, y + (i * 32))
tileData.push([])
for (var j = 0; j < width; j++) {
var block = Math.floor(Math.random() * 10)
if (block == 9 && solidRate >= 1) tileData[i].push(1)
else if (block == 8 && solidRate >= 2) tileData[i].push(1)
else if (block == 7 && solidRate >= 3) tileData[i].push(1)
else if (block == 6 && resetterRate >= 1) tileData[i].push(2)
else if (block == 5 && resetterRate >= 2) tileData[i].push(2)
else if (block == 4 && resetterRate >= 3) tileData[i].push(2)
else if (block == 3 && iceRate >= 1) tileData[i].push(3)
else if (block == 2 && iceRate >= 2) tileData[i].push(3)
else if (block == 1 && iceRate >= 3) tileData[i].push(3)
else tileData[i].push(0)
}
screen.drawImage(data.images.wall, x + (width * 32), y + (i * 32))
}
for (var i = -1; i < width + 1; i++) {
screen.drawImage(data.images.wall, x + (i * 32), y + (height * 32))
}
for (var i = 0; i < 1; i++) {
var row = Math.floor(Math.random() * height)
var column = Math.floor(Math.random() * width)
if (tileData[row][column] != 0) i--
else tileData[row][column] = 8
}
for (var i = 0; i < moneybagAmount; i++) {
var row = Math.floor(Math.random() * height)
var column = Math.floor(Math.random() * width)
if (tileData[row][column] != 0) i--
else tileData[row][column] = 4
}
if (hasLever) {
for (var i = 0; i < 1; i++) {
var row = Math.floor(Math.random() * height)
var column = Math.floor(Math.random() * width)
if (tileData[row][column] != 0) i--
else tileData[row][column] = 6
}
for (var i = 0; i < 1; i++) {
var row = Math.floor(Math.random() * height)
var column = Math.floor(Math.random() * width)
if (tileData[row][column] != 0) i--
else tileData[row][column] = 7
}
}
for (var i = 0; i < 1; i++) {
var row = Math.floor(Math.random() * height)
var column = Math.floor(Math.random() * width)
if (tileData[row][column] != 0) i--
else tileData[row][column] = 5
}
for (var i = 0; i < 1; i++) {
var row = Math.floor(Math.random() * height)
var column = Math.floor(Math.random() * width)
if (tileData[row][column] != 0) i--
else tileData[row][column] = 11
}
for (var i = 0; i < tileData.length; i++) {
origTileData.push([])
for (var j = 0; j < tileData[i].length; j++) {
origTileData[i].push(tileData[i][j])
if (tileData[i][j] == 1) screen.drawImage(data.images.solid, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 2) screen.drawImage(data.images.resetter, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 3) screen.drawImage(data.images.ice, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 4) screen.drawImage(data.images.moneybag, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 5) screen.drawImage(data.images.flag, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 6) screen.drawImage(data.images.lever.off, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 7) screen.drawImage(data.images.door, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 8) {
	if (spotlight) tileData[i][j] == 10
	screen.drawImage(data.images.mario, x + (j * 32), y + (i * 32))
	playerPos.x = j
	playerPos.y = i
}
if (tileData[i][j] == 11) screen.drawImage(data.images.torch, x + (j * 32), y + (i * 32))
if (tileData[i][j] == 12) screen.drawImage(data.images.pickaxe,x + (j * 32), y + (i * 32))
}
}
if (spotlight) {
	drawRectangleWithHole(screen, "black", 0, 0, elm.width, elm.height, x + ((playerPos.x * 32) - 32), y + ((playerPos.y * 32) - 32), 96, 96)
	screen.drawImage(data.images.spotlight, x + (playerPos.x * 32) - 32, y + (playerPos.y * 32) - 32)
	changeMusic(data.sound.music.spotlight)
}
if (document.getElementById('developerMenu')) document.getElementById('developerMenu').innerHTML = "<div style=\"overflow: scroll; width: 100%; height: calc(100% - 26px)\">" + getTileData() + "<br><input type=\"text\" id=\"getVariable\"><button onclick=\"getVar(document.getElementById('getVariable').value)\">Get variable</button><br><input type=\"text\" id=\"setVariable\"><button onclick=\"setVar(document.getElementById('setVariable').value)\">Set variable</button></div><button onclick=\"document.getElementById('developerMenu').remove()\" style=\"width: 100%; height: 21px; bottom: 0px; left: 0px; postion: absolute\">Close</button>"
}
function randomCustomization(width, height, solidRate, resetterRate, iceRate, hasLever, moneybagAmount, spotlight, index) {
	scenario = "randomconfig" + index
	screen.clearRect(0, 0, elm.width, elm.height)
	var menuwidth = 502
	var menuheight = 352
	var x = (elm.width - (elm.width / 2)) - (menuwidth / 2)
	var y = (elm.height - (elm.height / 2)) - (menuheight / 2)
	screen.drawImage(data.images.arrow, x, y + (index * 32))
	screen.drawImage(data.images.buttons.width, x + 32, y)
	screen.drawImage(data.images.buttons.height, x + 32, y + 32)
	screen.drawImage(data.images.buttons.sldspawnrate, x + 32, y + 64)
	screen.drawImage(data.images.buttons.rstspawnrate, x + 32, y + 96)
	screen.drawImage(data.images.buttons.icespawnrate, x + 32, y + 128)
	screen.drawImage(data.images.buttons.mnbgamount, x + 32, y + 160)
	screen.drawImage(data.images.buttons.spwnlvranddoor, x + 32, y + 192)
	screen.drawImage(data.images.buttons.spotlight, x + 32, y + 224)
	screen.drawImage(data.images.buttons.seed, x + 32, y + 256)
	screen.drawImage(data.images.buttons.generate, x + 32, y + 288)
	screen.drawImage(data.images.buttons.longback, x + 32, y + 320)
	if (index >= 0 && index <= 5) {
		screen.drawImage(data.images.flippedArrow, x + 392, y + (index * 32))
		screen.drawImage(data.images.arrow, x + 470, y + (index * 32))
	}
	if (width == 5) screen.drawImage(data.images.buttons.numbers.five, x + 424, y)
	if (width == 6) screen.drawImage(data.images.buttons.numbers.six, x + 424, y)
	if (width == 7) screen.drawImage(data.images.buttons.numbers.seven, x + 424, y)
	if (width == 8) screen.drawImage(data.images.buttons.numbers.eight, x + 424, y)
	if (width == 9) screen.drawImage(data.images.buttons.numbers.nine, x + 424, y)
	if (width == 10) screen.drawImage(data.images.buttons.numbers.ten, x + 424, y)
	if (width == 11) screen.drawImage(data.images.buttons.numbers.eleven, x + 424, y)
	if (width == 12) screen.drawImage(data.images.buttons.numbers.twelve, x + 424, y)
	if (width == 13) screen.drawImage(data.images.buttons.numbers.thirteen, x + 424, y)
	if (width == 14) screen.drawImage(data.images.buttons.numbers.fourteen, x + 424, y)
	if (width == 15) screen.drawImage(data.images.buttons.numbers.fifteen, x + 424, y)
	if (height == 5) screen.drawImage(data.images.buttons.numbers.five, x + 424, y + 32)
	if (height == 6) screen.drawImage(data.images.buttons.numbers.six, x + 424, y + 32)
	if (height == 7) screen.drawImage(data.images.buttons.numbers.seven, x + 424, y + 32)
	if (height == 8) screen.drawImage(data.images.buttons.numbers.eight, x + 424, y + 32)
	if (height == 9) screen.drawImage(data.images.buttons.numbers.nine, x + 424, y + 32)
	if (height == 10) screen.drawImage(data.images.buttons.numbers.ten, x + 424, y + 32)
	if (height == 11) screen.drawImage(data.images.buttons.numbers.eleven, x + 424, y + 32)
	if (height == 12) screen.drawImage(data.images.buttons.numbers.twelve, x + 424, y + 32)
	if (height == 13) screen.drawImage(data.images.buttons.numbers.thirteen, x + 424, y + 32)
	if (height == 14) screen.drawImage(data.images.buttons.numbers.fourteen, x + 424, y + 32)
	if (height == 15) screen.drawImage(data.images.buttons.numbers.fifteen, x + 424, y + 32)
	if (solidRate == 0) screen.drawImage(data.images.buttons.numbers.zero, x + 424, y + 64)
	if (solidRate == 1) screen.drawImage(data.images.buttons.numbers.one, x + 424, y + 64)
	if (solidRate == 2) screen.drawImage(data.images.buttons.numbers.two, x + 424, y + 64)
	if (solidRate == 3) screen.drawImage(data.images.buttons.numbers.three, x + 424, y + 64)
	if (resetterRate == 0) screen.drawImage(data.images.buttons.numbers.zero, x + 424, y + 96)
	if (resetterRate == 1) screen.drawImage(data.images.buttons.numbers.one, x + 424, y + 96)
	if (resetterRate == 2) screen.drawImage(data.images.buttons.numbers.two, x + 424, y + 96)
	if (resetterRate == 3) screen.drawImage(data.images.buttons.numbers.three, x + 424, y + 96)
	if (iceRate == 0) screen.drawImage(data.images.buttons.numbers.zero, x + 424, y + 128)
	if (iceRate == 1) screen.drawImage(data.images.buttons.numbers.one, x + 424, y + 128)
	if (iceRate == 2) screen.drawImage(data.images.buttons.numbers.two, x + 424, y + 128)
	if (iceRate == 3) screen.drawImage(data.images.buttons.numbers.three, x + 424, y + 128)
	if (moneybagAmount == 1) screen.drawImage(data.images.buttons.numbers.one, x + 424, y + 160)
	if (moneybagAmount == 2) screen.drawImage(data.images.buttons.numbers.two, x + 424, y + 160)
	if (moneybagAmount == 3) screen.drawImage(data.images.buttons.numbers.three, x + 424, y + 160)
	if (moneybagAmount == 4) screen.drawImage(data.images.buttons.numbers.four, x + 424, y + 160)
	if (moneybagAmount == 5) screen.drawImage(data.images.buttons.numbers.five, x + 424, y + 160)
	if (hasLever) screen.drawImage(data.images.buttons.true, x + 392, y + 192)
	if (!hasLever) screen.drawImage(data.images.buttons.false, x + 392, y + 192)
	if (spotlight) screen.drawImage(data.images.buttons.true, x + 392, y + 224)
	if (!spotlight) screen.drawImage(data.images.buttons.false, x + 392, y + 224)
}
function renderLevel(levelData, isRandomPlay, isEditorPlay) {
	isRandom = false
	isEditor = false
	isTorchSpotlight = false
	if (isRandomPlay) isRandom = true
	if (isEditorPlay) isEditor = true
	if (!isRandomPlay || !isEditorPlay) world = parseInt(scenario.charAt(4))
	if (!isRandomPlay || !isEditorPlay) level = parseInt(scenario.charAt(5))
	maxmoneybags = 3
	if (scenario == "menu55") maxmoneybags = 223
	if (isEditorPlay) maxmoneybags = scan("moneybag")
	if (isRandomPlay) maxmoneybags = randomLevelConfig.moneybagAmount
	moneybags = 0
	tileData = [].concat(levelData)
	origTileData = []
	screen.clearRect(0, 0, elm.width, elm.height)
	scenario = "level"
	changeMusic(data.sound.music.level)
	var x = (elm.width - (elm.width / 2)) - (levelData[0].length * 16)
	var y = (elm.height - (elm.height / 2)) - (levelData.length * 16)
	for (var i = -1; i < levelData[0].length + 1; i++) {
		screen.drawImage(data.images.wall, x + (i * 32), y - 32)
	}
	for (var i = 0; i < levelData.length; i++) {
		screen.drawImage(data.images.wall, x - 32, y + (i * 32))
		origTileData.push([])
		for (var j = 0; j < levelData[0].length; j++) {
			origTileData[i].push(levelData[i][j])
			if (levelData[i][j] == 1) screen.drawImage(data.images.solid, x + (j * 32), y + (i * 32))
			if (levelData[i][j] == 2) screen.drawImage(data.images.resetter, x + (j * 32), y + (i * 32))
			if (levelData[i][j] == 3) screen.drawImage(data.images.ice, x + (j * 32), y + (i * 32))
			if (levelData[i][j] == 4) screen.drawImage(data.images.moneybag, x + (j * 32), y + (i * 32))
			if (levelData[i][j] == 5) screen.drawImage(data.images.flag, x + (j * 32), y + (i * 32))
			if (levelData[i][j] == 6) screen.drawImage(data.images.lever.off, x + (j * 32), y + (i * 32))
			if (levelData[i][j] == 7) screen.drawImage(data.images.door, x + (j * 32), y + (i * 32))
			if (levelData[i][j] == 8 || levelData[i][j] == 10) {
				screen.drawImage(data.images.mario, x + (j * 32), y + (i * 32))
				playerPos.x = j
				playerPos.y = i
			}
			if (levelData[i][j] == 10) isSpotlight = true
			if (levelData[i][j] == 8) isSpotlight = false
			if (tileData[i][j] == 11) screen.drawImage(data.images.torch, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 12) screen.drawImage(data.images.pickaxe, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 13) setBlinking(j, i, 1);
			if (tileData[i][j] == 14) setBlinking(j, i, 2);
		}
		screen.drawImage(data.images.wall, x + (levelData[0].length * 32), y + (i * 32))
	}
	for (var i = -1; i < levelData[0].length + 1; i++) {
		screen.drawImage(data.images.wall, x + (i * 32), y + (levelData.length * 32))
	}
	if (isRandomPlay) isSpotlight = randomLevelConfig.spotlight
	if (isSpotlight) {
		drawRectangleWithHole(screen, "black", 0, 0, elm.width, elm.height, x + ((playerPos.x * 32) - 32), y + ((playerPos.y * 32) - 32), 96, 96)
		screen.drawImage(data.images.spotlight, x + (playerPos.x * 32) - 32, y + (playerPos.y * 32) - 32)
		changeMusic(data.sound.music.spotlight)
	}
	if (document.getElementById('developerMenu')) document.getElementById('developerMenu').innerHTML = "<div style=\"overflow: scroll; width: 100%; height: calc(100% - 26px)\">" + getTileData() + "<br><input type=\"text\" id=\"getVariable\"><button onclick=\"getVar(document.getElementById('getVariable').value)\">Get variable</button><br><input type=\"text\" id=\"setVariable\"><button onclick=\"setVar(document.getElementById('setVariable').value)\">Set variable</button></div><button onclick=\"document.getElementById('developerMenu').remove()\" style=\"width: 100%; height: 21px; bottom: 0px; left: 0px; postion: absolute\">Close</button>"
}
function move(dir) {
	if (dir == 'up') {
		playerPos.y--
		if (playerPos.y == -1) playerPos.y++
		if (tileData[playerPos.y][playerPos.x] == 1 || tileData[playerPos.y][playerPos.x] == 7) {
			playerPos.y++
			if (hasPickaxe) {
				hasPickaxe = false
				tileData[playerPos.y - 1][playerPos.x] = 0
				data.sound.switchlever.play()
			}
		}
		if (tileData[playerPos.y][playerPos.x] == 3) {
			tileData[playerPos.y][playerPos.x] = 0
			move('up')
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 6) activateLever()
		if (tileData[playerPos.y][playerPos.x] == 4) {
			tileData[playerPos.y][playerPos.x] = 0
			moneybags++
			data.sound.collectmoneybag.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 5) {
			finishLevel()
			if (maxmoneybags == moneybags) return
		}
		if (tileData[playerPos.y][playerPos.x] == 2) {
			if (!isEditor) renderLevel(origTileData, isRandom, false)
			else renderLevel(editor.origData, false, true)
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 11) {
			tileData[playerPos.y][playerPos.x] = 0
			isTorchSpotlight = true
			data.sound.ok.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 12) {
			tileData[playerPos.y][playerPos.x] = 0
			hasPickaxe = true
			data.sound.ok.play()
		}
	}
	if (dir == 'down') {
		playerPos.y++
		if (playerPos.y == tileData.length) playerPos.y--
		if (tileData[playerPos.y][playerPos.x] == 1 || tileData[playerPos.y][playerPos.x] == 7) {
			playerPos.y--
			if (hasPickaxe) {
				hasPickaxe = false
				tileData[playerPos.y + 1][playerPos.x] = 0
				data.sound.switchlever.play()
			}
		}
		if (tileData[playerPos.y][playerPos.x] == 3) {
			tileData[playerPos.y][playerPos.x] = 0
			move('down')
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 6) activateLever()
		if (tileData[playerPos.y][playerPos.x] == 4) {
			tileData[playerPos.y][playerPos.x] = 0
			moneybags++
			data.sound.collectmoneybag.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 5) {
			finishLevel()
			if (maxmoneybags == moneybags) return
		}
		if (tileData[playerPos.y][playerPos.x] == 2) {
			if (!isEditor) renderLevel(origTileData, isRandom, false)
			else renderLevel(editor.origData, false, true)
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 11) {
			tileData[playerPos.y][playerPos.x] = 0
			isTorchSpotlight = true
			data.sound.ok.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 12) {
			tileData[playerPos.y][playerPos.x] = 0
			hasPickaxe = true
			data.sound.ok.play()
		}
	}
	if (dir == 'left') {
		playerPos.x--
		if (playerPos.x == -1) playerPos.x++
		if (tileData[playerPos.y][playerPos.x] == 1 || tileData[playerPos.y][playerPos.x] == 7) {
			playerPos.x++
			if (hasPickaxe) {
				hasPickaxe = false
				tileData[playerPos.y][playerPos.x - 1] = 0
				data.sound.switchlever.play()
			}
		}
		if (tileData[playerPos.y][playerPos.x] == 3) {
			tileData[playerPos.y][playerPos.x] = 0
			move('left')
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 6) activateLever()
		if (tileData[playerPos.y][playerPos.x] == 4) {
			tileData[playerPos.y][playerPos.x] = 0
			moneybags++
			data.sound.collectmoneybag.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 5) {
			finishLevel()
			if (maxmoneybags == moneybags) return
		}
		if (tileData[playerPos.y][playerPos.x] == 2) {
			if (!isEditor) renderLevel(origTileData, isRandom, false)
			else renderLevel(editor.origData, false, true)
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 11) {
			tileData[playerPos.y][playerPos.x] = 0
			isTorchSpotlight = true
			data.sound.ok.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 12) {
			tileData[playerPos.y][playerPos.x] = 0
			hasPickaxe = true
			data.sound.ok.play()
		}
	}
	if (dir == 'right') {
		playerPos.x++
		if (playerPos.x == tileData[0].length) playerPos.x--
		if (tileData[playerPos.y][playerPos.x] == 1 || tileData[playerPos.y][playerPos.x] == 7) {
			playerPos.x--
			if (hasPickaxe) {
				hasPickaxe = false
				tileData[playerPos.y][playerPos.x + 1] = 0
				data.sound.switchlever.play()
			}
		}
		if (tileData[playerPos.y][playerPos.x] == 3) {
			tileData[playerPos.y][playerPos.x] = 0
			move('right')
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 6) activateLever()
		if (tileData[playerPos.y][playerPos.x] == 4) {
			tileData[playerPos.y][playerPos.x] = 0
			moneybags++
			data.sound.collectmoneybag.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 5) {
			finishLevel()
			if (maxmoneybags == moneybags) return
		}
		if (tileData[playerPos.y][playerPos.x] == 2) {
			if (!isEditor) renderLevel(origTileData, isRandom, false)
			else renderLevel(editor.origData, false, true)
			return
		}
		if (tileData[playerPos.y][playerPos.x] == 11) {
			tileData[playerPos.y][playerPos.x] = 0
			isTorchSpotlight = true
			data.sound.ok.play()
		}
		if (tileData[playerPos.y][playerPos.x] == 12) {
			tileData[playerPos.y][playerPos.x] = 0
			hasPickaxe = true
			data.sound.ok.play()
		}
	}
	screen.clearRect(0, 0, elm.width, elm.height)
	var x = (elm.width - (elm.width / 2)) - (tileData[0].length * 16)
	var y = (elm.height - (elm.height / 2)) - (tileData.length * 16)
	for (var i = -1; i < tileData[0].length + 1; i++) {
		screen.drawImage(data.images.wall, x + (i * 32), y - 32)
	}
	for (var i = 0; i < tileData.length; i++) {
		screen.drawImage(data.images.wall, x - 32, y + (i * 32))
		for (var j = 0; j < tileData[0].length; j++) {
			if (tileData[i][j] == 1) screen.drawImage(data.images.solid, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 2) screen.drawImage(data.images.resetter, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 3) screen.drawImage(data.images.ice, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 4) screen.drawImage(data.images.moneybag, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 5) screen.drawImage(data.images.flag, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 6) screen.drawImage(data.images.lever.off, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 7) screen.drawImage(data.images.door, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 8 || tileData[i][j] == 10) screen.drawImage(data.images.mario, x + (playerPos.x * 32), y + (playerPos.y * 32))
			if (tileData[i][j] == 9) screen.drawImage(data.images.lever.on, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 11) screen.drawImage(data.images.torch, x + (j * 32), y + (i * 32))
			if (tileData[i][j] == 12) screen.drawImage(data.images.pickaxe, x + (j * 32), y + (i * 32))
		}
		screen.drawImage(data.images.wall, x + (tileData[0].length * 32), y + (i * 32))
	}
	for (var i = -1; i < tileData[0].length + 1; i++) {
		screen.drawImage(data.images.wall, x + (i * 32), y + (tileData.length * 32))
	}
	if (isSpotlight) {
		if (isTorchSpotlight) {
			drawRectangleWithHole(screen, "black", 0, 0, elm.width, elm.height, x + ((playerPos.x * 32) - 64), y + ((playerPos.y * 32) - 64), 160, 160)
			screen.drawImage(data.images.torch_spotlight, x + (playerPos.x * 32) - 64, y + (playerPos.y * 32) - 64)
		}
		else {
			drawRectangleWithHole(screen, "black", 0, 0, elm.width, elm.height, x + ((playerPos.x * 32) - 32), y + ((playerPos.y * 32) - 32), 96, 96)
			screen.drawImage(data.images.spotlight, x + (playerPos.x * 32) - 32, y + (playerPos.y * 32) - 32)
		}
	}
	if (document.getElementById('developerMenu')) document.getElementById('developerMenu').innerHTML = "<div style=\"overflow: scroll; width: 100%; height: calc(100% - 26px)\">" + getTileData() + "<br><input type=\"text\" id=\"getVariable\"><button onclick=\"getVar(document.getElementById('getVariable').value)\">Get variable</button><br><input type=\"text\" id=\"setVariable\"><button onclick=\"setVar(document.getElementById('setVariable').value)\">Set variable</button></div><button onclick=\"document.getElementById('developerMenu').remove()\" style=\"width: 100%; height: 21px; bottom: 0px; left: 0px; postion: absolute\">Close</button>"
}
function drawRectangleWithHole(ctx, color, x, y, width, height, holeX, holeY, holeWidth, holeHeight) {
	ctx.fillStyle = color
	ctx.fillRect(x, y, holeX, height)
	ctx.fillRect(x, y, width, holeY)
	ctx.fillRect(x + holeX + holeWidth, y, width - (holeX + holeWidth), height)
	ctx.fillRect(x, y + holeY + holeHeight, width, height - (holeY + holeHeight))
}
function finishLevel() {
	if (moneybags != maxmoneybags) return
	if (!isRandom && !isEditor) levelsfinished++
	if (isEditor) {
		returnToEditor()
		return
	}
	scenario = "menu01"
	updateSelection(true, 0, true)
	changeMusic(data.sound.music.menu)
	data.sound.finish.play()
}
function activateLever() {
	tileData[playerPos.y][playerPos.x] = 9
	data.sound.switchlever.play()
	for (var i = 0; i < tileData.length; i++) {
		for (var j = 0; j < tileData[i].length; j++) {
			if (tileData[i][j] == 7) tileData[i][j] = 0
		}
	}
}
function openEditor(width, height, isSpotlight, index) {
	screen.clearRect(0, 0, elm.width, elm.height)
	scenario = "editor" + index
	var menuwidth = 260
	var menuheight = 64
	// 118
	var x = (elm.width - (elm.width / 2)) - (menuwidth / 2)
	var y = (elm.height - (elm.height / 2)) - (menuheight / 2)
	screen.drawImage(data.images.buttons.width, x + 32, y)
	screen.drawImage(data.images.buttons.height, x + 32, y + 32)
	screen.drawImage(data.images.buttons.spotlight, x + 32, y + 64)
	screen.drawImage(data.images.buttons.edit, x + 32, y + 96)
	screen.drawImage(data.images.buttons.longback, x + 32, y + 128)
	screen.drawImage(data.images.arrow, x, y + (index * 32))
	if (index == 0 || index == 1) {
		screen.drawImage(data.images.flippedArrow, x + 150, y + (index * 32))
		screen.drawImage(data.images.arrow, x + 228, y + (index * 32))
	}
	if (width == 5) screen.drawImage(data.images.buttons.numbers.five, x + 182, y)
	if (width == 6) screen.drawImage(data.images.buttons.numbers.six, x + 182, y)
	if (width == 7) screen.drawImage(data.images.buttons.numbers.seven, x + 182, y)
	if (width == 8) screen.drawImage(data.images.buttons.numbers.eight, x + 182, y)
	if (width == 9) screen.drawImage(data.images.buttons.numbers.nine, x + 182, y)
	if (width == 10) screen.drawImage(data.images.buttons.numbers.ten, x + 182, y)
	if (width == 11) screen.drawImage(data.images.buttons.numbers.eleven, x + 182, y)
	if (width == 12) screen.drawImage(data.images.buttons.numbers.twelve, x + 182, y)
	if (width == 13) screen.drawImage(data.images.buttons.numbers.thirteen, x + 182, y)
	if (width == 14) screen.drawImage(data.images.buttons.numbers.fourteen, x + 182, y)
	if (width == 15) screen.drawImage(data.images.buttons.numbers.fifteen, x + 182, y)
	if (height == 5) screen.drawImage(data.images.buttons.numbers.five, x + 182, y + 32)
	if (height == 6) screen.drawImage(data.images.buttons.numbers.six, x + 182, y + 32)
	if (height == 7) screen.drawImage(data.images.buttons.numbers.seven, x + 182, y + 32)
	if (height == 8) screen.drawImage(data.images.buttons.numbers.eight, x + 182, y + 32)
	if (height == 9) screen.drawImage(data.images.buttons.numbers.nine, x + 182, y + 32)
	if (height == 10) screen.drawImage(data.images.buttons.numbers.ten, x + 182, y + 32)
	if (height == 11) screen.drawImage(data.images.buttons.numbers.eleven, x + 182, y + 32)
	if (height == 12) screen.drawImage(data.images.buttons.numbers.twelve, x + 182, y + 32)
	if (height == 13) screen.drawImage(data.images.buttons.numbers.thirteen, x + 182, y + 32)
	if (height == 14) screen.drawImage(data.images.buttons.numbers.fourteen, x + 182, y + 32)
	if (height == 15) screen.drawImage(data.images.buttons.numbers.fifteen, x + 182, y + 32)
	if (isSpotlight) screen.drawImage(data.images.buttons.true, x + 225, y + 64)
	if (!isSpotlight) screen.drawImage(data.images.buttons.false, x + 225, y + 64)
}
function openEditorGrid(selX, selY, reset) {
	if (reset) {
		editor.x = 0
		editor.y = 0
		editor.item = "solid"
		editor.data = []
	}
	scenario = "editorgrid"
	screen.clearRect(0, 0, elm.width, elm.height)
	var width = editorConfig.width
	var height = editorConfig.height
	var x = (elm.width - (elm.width / 2)) - (width * 16)
	var y = (elm.height - (elm.height / 2)) - (height * 16)
	var emptyData = false
	if (editor.data.length == 0) emptyData = true
	for (var i = 0; i < editorConfig.height; i++) {
		if (emptyData) editor.data.push([])
		for (var j = 0; j < editorConfig.width; j++) {
			if (emptyData) editor.data[i].push(0)
			screen.drawImage(data.images.editor.cell, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 1) screen.drawImage(data.images.solid, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 2) screen.drawImage(data.images.resetter, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 3) screen.drawImage(data.images.ice, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 4) screen.drawImage(data.images.moneybag, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 5) screen.drawImage(data.images.flag, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 6) screen.drawImage(data.images.lever.off, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 7) screen.drawImage(data.images.door, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 8 || editor.data[i][j] == 10) screen.drawImage(data.images.mario, x + (j * 32), y + (i * 32))
			if (editor.data[i][j] == 11) screen.drawImage(data.images.torch, x + (j * 32), y + (i * 32))
			if (i == selY && j == selX) screen.drawImage(data.images.editor.selected, x + (j * 32), y + (i * 32))
		}
	}
	editor.origData = []
	for (var i = 0; i < editor.data.length; i++) {
		editor.origData.push([])
		for (var j = 0; j < editor.data[i].length; j++) {
			editor.origData[i].push(editor.data[i][j])
		}
	}
	screen.drawImage(data.images.buttons.numbers.one, 16, 16)
	screen.drawImage(data.images.buttons.numbers.two, 16, 48)
	screen.drawImage(data.images.buttons.numbers.three, 16, 80)
	screen.drawImage(data.images.buttons.numbers.four, 16, 112)
	screen.drawImage(data.images.buttons.numbers.five, 16, 144)
	screen.drawImage(data.images.buttons.numbers.six, 16, 176)
	screen.drawImage(data.images.buttons.numbers.seven, 16, 208)
	screen.drawImage(data.images.buttons.numbers.eight, 16, 240)
	screen.drawImage(data.images.buttons.numbers.nine, 16, 272)
	screen.drawImage(data.images.buttons.numbers.zero, 16, 304)
	screen.drawImage(data.images.solid, 64, 16)
	screen.drawImage(data.images.resetter, 64, 48)
	screen.drawImage(data.images.ice, 64, 80)
	screen.drawImage(data.images.moneybag, 64, 112)
	screen.drawImage(data.images.flag, 64, 144)
	screen.drawImage(data.images.lever.off, 64, 176)
	screen.drawImage(data.images.door, 64, 208)
	screen.drawImage(data.images.mario, 64, 240)
	screen.drawImage(data.images.torch, 64, 272)
	screen.drawImage(data.images.buttons.playtext, 48, 304)
	screen.drawImage(data.images.buttons.editorbacktext, 16, elm.height - 42)
}
function scan(item) {
	var found = false
	if (item == "mario") {
		for (var i = 0; i < editor.data.length; i++) {
			for (var j = 0; j < editor.data[i].length; j++) {
				if (editor.data[i][j] == 8 || editor.data[i][j] == 10) found = true
			}
		}
	}
	if (item == "lever") {
		for (var i = 0; i < editor.data.length; i++) {
			for (var j = 0; j < editor.data[i].length; j++) {
				if (editor.data[i][j] == 6) found = true
			}
		}
	}
	if (item == "flag") {
		for (var i = 0; i < editor.data.length; i++) {
			for (var j = 0; j < editor.data[i].length; j++) {
				if (editor.data[i][j] == 5) found = true
			}
		}
	}
	if (item == "moneybag") {
		found = 0
		for (var i = 0; i < editor.origData.length; i++) {
			for (var j = 0; j < editor.origData[i].length; j++) {
				if (editor.origData[i][j] == 4) found++
			}
		}
	}
	return found
}
function returnToEditor() {
	editor.data = []
	for (var i = 0; i < editor.origData.length; i++) {
		editor.data.push([])
		for (var j = 0; j < editor.origData[i].length; j++) {
			editor.data[i].push(editor.origData[i][j])
		}
	}
	changeMusic(data.sound.music.menu)
	openEditorGrid(editor.x, editor.y)
}
function exportToArray() {
	var string = "[[" 
	for (var i = 0; i < editor.data.length; i++) {
		for (var j = 0; j < editor.data[i].length; j++) {
			if (j + 1 < editor.data[i].length) string += editor.data[i][j] + ","
			else string += editor.data[i][j]
		}
		if (i + 1 < editor.data.length) string += "],["
		else string += "]]"
	}
	return string
}
function setBlinking(x, y, tileID) {
	console.log(y)
	console.log(x)
	console.log(tileID)
	setInterval(function() {
		if (blinking && tileData[y][x] != tileID) tileData[y][x] == tileID
		else if (blinking && tileData[y][x] == tileID) tileData[y][x] == 0
		screen.clearRect(0, 0, elm.width, elm.height)
		var x = (elm.width - (elm.width / 2)) - (tileData[0].length * 16)
		var y = (elm.height - (elm.height / 2)) - (tileData.length * 16)
		for (var i = -1; i < tileData[0].length + 1; i++) {
			screen.drawImage(data.images.wall, x + (i * 32), y - 32)
		}
		for (var i = 0; i < tileData.length; i++) {
			screen.drawImage(data.images.wall, x - 32, y + (i * 32))
			for (var j = 0; j < tileData[0].length; j++) {
				if (tileData[i][j] == 1) screen.drawImage(data.images.solid, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 2) screen.drawImage(data.images.resetter, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 3) screen.drawImage(data.images.ice, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 4) screen.drawImage(data.images.moneybag, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 5) screen.drawImage(data.images.flag, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 6) screen.drawImage(data.images.lever.off, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 7) screen.drawImage(data.images.door, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 8 || tileData[i][j] == 10) screen.drawImage(data.images.mario, x + (playerPos.x * 32), y + (playerPos.y * 32))
				if (tileData[i][j] == 9) screen.drawImage(data.images.lever.on, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 11) screen.drawImage(data.images.torch, x + (j * 32), y + (i * 32))
				if (tileData[i][j] == 12) screen.drawImage(data.images.pickaxe, x + (j * 32), y + (i * 32))
			}
			screen.drawImage(data.images.wall, x + (tileData[0].length * 32), y + (i * 32))
		}
		for (var i = -1; i < tileData[0].length + 1; i++) {
			screen.drawImage(data.images.wall, x + (i * 32), y + (tileData.length * 32))
		}
		if (isSpotlight) {
			if (isTorchSpotlight) {
				drawRectangleWithHole(screen, "black", 0, 0, elm.width, elm.height, x + ((playerPos.x * 32) - 64), y + ((playerPos.y * 32) - 64), 160, 160)
				screen.drawImage(data.images.torch_spotlight, x + (playerPos.x * 32) - 64, y + (playerPos.y * 32) - 64)
			}
			else {
				drawRectangleWithHole(screen, "black", 0, 0, elm.width, elm.height, x + ((playerPos.x * 32) - 32), y + ((playerPos.y * 32) - 32), 96, 96)
				screen.drawImage(data.images.spotlight, x + (playerPos.x * 32) - 32, y + (playerPos.y * 32) - 32)
			}
		}
	}, 500)
}
function executeKeyInput(keycode, keyname) {
if (scenario == 'menu01' && keycode == 40) {
updateSelection(true, 1)
scenario = 'menu02'
return
}
if (scenario == 'menu02' && keycode == 40) {
updateSelection(true, 2)
scenario = 'menu03'
return
}
if (scenario == 'menu03' && keycode == 40) {
updateSelection(true, 3)
scenario = 'menu04'
return
}
if (scenario == 'menu04' && keycode == 40) {
updateSelection(true, 4)
scenario = 'menu05'
return
}
if (scenario == 'menu05' && keycode == 40) {
updateSelection(true, 5)
scenario = 'menu06'
return
}
if (scenario == 'menu06' && keycode == 40) {
updateSelection(true, 6)
scenario = 'menu07'
return
}
if (scenario == 'menu02' && keycode == 38) {
updateSelection(true, 0)
scenario = 'menu01'
return
}
if (scenario == 'menu03' && keycode == 38) {
updateSelection(true, 1)
scenario = 'menu02'
return
}
if (scenario == 'menu04' && keycode == 38) {
updateSelection(true, 2)
scenario = 'menu03'
return
}
if (scenario == 'menu05' && keycode == 38) {
updateSelection(true, 3)
scenario = 'menu04'
return
}
if (scenario == 'menu06' && keycode == 38) {
updateSelection(true, 4)
scenario = 'menu05'
return
}
if (scenario == 'menu07' && keycode == 38) {
updateSelection(true, 5)
scenario = 'menu06'
return
}
if ((scenario == 'menu11' || scenario == 'menu21' || scenario == 'menu31' || scenario == 'menu41' || scenario == 'menu51') && keycode == 40) {
updateSelection(false, 1)
if (scenario == 'menu11') scenario = 'menu12'
if (scenario == 'menu21') scenario = 'menu22'
if (scenario == 'menu31') scenario = 'menu32'
if (scenario == 'menu41') scenario = 'menu42'
if (scenario == 'menu51') scenario = 'menu52'
return
}
if ((scenario == 'menu12' || scenario == 'menu22' || scenario == 'menu32' || scenario == 'menu42' || scenario == 'menu52') && keycode == 40) {
updateSelection(false, 2)
if (scenario == 'menu12') scenario = 'menu13'
if (scenario == 'menu22') scenario = 'menu23'
if (scenario == 'menu32') scenario = 'menu33'
if (scenario == 'menu42') scenario = 'menu43'
if (scenario == 'menu52') scenario = 'menu53'
return
}
if ((scenario == 'menu13' || scenario == 'menu23' || scenario == 'menu33' || scenario == 'menu43' || scenario == 'menu53') && keycode == 40) {
updateSelection(false, 3)
if (scenario == 'menu13') scenario = 'menu14'
if (scenario == 'menu23') scenario = 'menu24'
if (scenario == 'menu33') scenario = 'menu34'
if (scenario == 'menu43') scenario = 'menu44'
if (scenario == 'menu53') scenario = 'menu54'
return
}
if ((scenario == 'menu14' || scenario == 'menu24' || scenario == 'menu34' || scenario == 'menu44' || scenario == 'menu54') && keycode == 40) {
updateSelection(false, 4)
if (scenario == 'menu14') scenario = 'menu15'
if (scenario == 'menu24') scenario = 'menu25'
if (scenario == 'menu34') scenario = 'menu35'
if (scenario == 'menu44') scenario = 'menu45'
if (scenario == 'menu54') scenario = 'menu55'
return
}
if ((scenario == 'menu15' || scenario == 'menu25' || scenario == 'menu35' || scenario == 'menu45' || scenario == 'menu55') && keycode == 40) {
updateSelection(false, 5)
if (scenario == 'menu15') scenario = 'menu16'
if (scenario == 'menu25') scenario = 'menu26'
if (scenario == 'menu35') scenario = 'menu36'
if (scenario == 'menu45') scenario = 'menu46'
if (scenario == 'menu55') scenario = 'menu56'
return
}
if ((scenario == 'menu12' || scenario == 'menu22' || scenario == 'menu32' || scenario == 'menu42' || scenario == 'menu52') && keycode == 38) {
updateSelection(false, 0)
if (scenario == 'menu12') scenario = 'menu11'
if (scenario == 'menu22') scenario = 'menu21'
if (scenario == 'menu32') scenario = 'menu31'
if (scenario == 'menu42') scenario = 'menu41'
if (scenario == 'menu52') scenario = 'menu51'
return
}
if ((scenario == 'menu13' || scenario == 'menu23' || scenario == 'menu33' || scenario == 'menu43' || scenario == 'menu53') && keycode == 38) {
updateSelection(false, 1)
if (scenario == 'menu13') scenario = 'menu12'
if (scenario == 'menu23') scenario = 'menu22'
if (scenario == 'menu33') scenario = 'menu32'
if (scenario == 'menu43') scenario = 'menu42'
if (scenario == 'menu53') scenario = 'menu52'
return
}
if ((scenario == 'menu14' || scenario == 'menu24' || scenario == 'menu34' || scenario == 'menu44' || scenario == 'menu54') && keycode == 38) {
updateSelection(false, 2)
if (scenario == 'menu14') scenario = 'menu13'
if (scenario == 'menu24') scenario = 'menu23'
if (scenario == 'menu34') scenario = 'menu33'
if (scenario == 'menu44') scenario = 'menu43'
if (scenario == 'menu54') scenario = 'menu53'
return
}
if ((scenario == 'menu15' || scenario == 'menu25' || scenario == 'menu35' || scenario == 'menu45' || scenario == 'menu55') && keycode == 38) {
updateSelection(false, 3)
if (scenario == 'menu15') scenario = 'menu14'
if (scenario == 'menu25') scenario = 'menu24'
if (scenario == 'menu35') scenario = 'menu34'
if (scenario == 'menu45') scenario = 'menu44'
if (scenario == 'menu55') scenario = 'menu54'
return
}
if ((scenario == 'menu16' || scenario == 'menu26' || scenario == 'menu36' || scenario == 'menu46' || scenario == 'menu56') && keycode == 38) {
updateSelection(false, 4)
if (scenario == 'menu16') scenario = 'menu15'
if (scenario == 'menu26') scenario = 'menu25'
if (scenario == 'menu36') scenario = 'menu35'
if (scenario == 'menu46') scenario = 'menu45'
if (scenario == 'menu56') scenario = 'menu55'
return
}
if (scenario.includes('randomconfig')) {
	var index = parseInt(scenario.substr(12, 2))
	if (keycode == 40 && index != 10) index++
	if (keycode == 38 && index != 0) index--
	if (keycode == 37) {
		if (index == 0 && randomLevelConfig.width != 5) randomLevelConfig.width--
		if (index == 1 && randomLevelConfig.height != 5) randomLevelConfig.height--
		if (index == 2 && randomLevelConfig.solidRate != 0) randomLevelConfig.solidRate--
		if (index == 3 && randomLevelConfig.resetterRate != 0) randomLevelConfig.resetterRate--
		if (index == 4 && randomLevelConfig.iceRate != 0) randomLevelConfig.iceRate--
		if (index == 5 && randomLevelConfig.moneybagAmount != 1) randomLevelConfig.moneybagAmount--
	}
	if (keycode == 39) {
		if (index == 0 && randomLevelConfig.width != 15) randomLevelConfig.width++
		if (index == 1 && randomLevelConfig.height != 15) randomLevelConfig.height++
		if (index == 2 && randomLevelConfig.solidRate != 3) randomLevelConfig.solidRate++
		if (index == 3 && randomLevelConfig.resetterRate != 3) randomLevelConfig.resetterRate++
		if (index == 4 && randomLevelConfig.iceRate != 3) randomLevelConfig.iceRate++
		if (index == 5 && randomLevelConfig.moneybagAmount != 5) randomLevelConfig.moneybagAmount++
	}
	if (keycode == 13 && index == 6 && randomLevelConfig.hasLever) randomLevelConfig.hasLever = false
	else if (keycode == 13 && index == 6 && !randomLevelConfig.hasLever) randomLevelConfig.hasLever = true
	if (keycode == 13 && index == 7 && randomLevelConfig.spotlight) randomLevelConfig.spotlight = false
	else if (keycode == 13 && index == 7 && !randomLevelConfig.spotlight) randomLevelConfig.spotlight = true
	if (keycode == 13 && index == 8) randomLevelConfig.seed = prompt('Enter seed (Blank for random)')
	if (keycode == 13 && index == 9) {
		generateRandomLevel(randomLevelConfig.width, randomLevelConfig.height, randomLevelConfig.solidRate, randomLevelConfig.resetterRate, randomLevelConfig.iceRate, randomLevelConfig.hasLever, randomLevelConfig.moneybagAmount, randomLevelConfig.spotlight)
		return
	}
	if (keycode == 13 && index == 10) {
		updateSelection(true, 0, true)
		scenario = "menu01"
		data.sound.back.play()
		return
	}
	data.sound.select.play()
	randomCustomization(randomLevelConfig.width, randomLevelConfig.height, randomLevelConfig.solidRate, randomLevelConfig.resetterRate, randomLevelConfig.iceRate, randomLevelConfig.hasLever, randomLevelConfig.moneybagAmount, randomLevelConfig.spotlight, index)
}
if (scenario.includes('menu') && keycode == 13) {
if (scenario != 'menu06' && scenario.includes('6')) {
updateSelection(true, 0, true)
data.sound.back.play()
scenario = 'menu01'
}
else {
if (scenario == 'menu01') {
scenario = 'menu11'
updateSelection(false, 0, true)
data.sound.ok.play()
return
}
if (scenario == 'menu02') {
scenario = 'menu21'
updateSelection(false, 0, true)
data.sound.ok.play()
return
}
if (scenario == 'menu03') {
scenario = 'menu31'
updateSelection(false, 0, true)
data.sound.ok.play()
return
}
if (scenario == 'menu04') {
scenario = 'menu41'
updateSelection(false, 0, true)
data.sound.ok.play()
return
}
if (scenario == 'menu05') {
scenario = 'menu51'
updateSelection(false, 0, true)
data.sound.ok.play()
return
}
if (scenario == 'menu06') {
randomLevelConfig.seed = ""
randomCustomization(randomLevelConfig.width, randomLevelConfig.height, randomLevelConfig.solidRate, randomLevelConfig.resetterRate, randomLevelConfig.iceRate, randomLevelConfig.hasLever, randomLevelConfig.moneybagAmount, randomLevelConfig.spotlight, 0)
data.sound.ok.play()
return
}
if (scenario.substr(4, 1) == "1" && scenario.substr(5, 1) == "1" && levelsfinished == 0) renderLevel(data.levels.world1.level1)
else if (scenario.substr(4, 1) == "1" && scenario.substr(5, 1) == "2" && levelsfinished == 1) renderLevel(data.levels.world1.level2)
else if (scenario.substr(4, 1) == "1" && scenario.substr(5, 1) == "3" && levelsfinished == 2) renderLevel(data.levels.world1.level3)
else if (scenario.substr(4, 1) == "1" && scenario.substr(5, 1) == "4" && levelsfinished == 3) renderLevel(data.levels.world1.level4)
else if (scenario.substr(4, 1) == "1" && scenario.substr(5, 1) == "5" && levelsfinished == 4) renderLevel(data.levels.world1.level5)
else if (scenario.substr(4, 1) == "2" && scenario.substr(5, 1) == "1" && levelsfinished == 5) renderLevel(data.levels.world2.level1)
else if (scenario.substr(4, 1) == "2" && scenario.substr(5, 1) == "2" && levelsfinished == 6) renderLevel(data.levels.world2.level2)
else if (scenario.substr(4, 1) == "2" && scenario.substr(5, 1) == "3" && levelsfinished == 7) renderLevel(data.levels.world2.level3)
else if (scenario.substr(4, 1) == "2" && scenario.substr(5, 1) == "4" && levelsfinished == 8) renderLevel(data.levels.world2.level4)
else if (scenario.substr(4, 1) == "2" && scenario.substr(5, 1) == "5" && levelsfinished == 9) renderLevel(data.levels.world2.level5)
else if (scenario.substr(4, 1) == "3" && scenario.substr(5, 1) == "1" && levelsfinished == 10) renderLevel(data.levels.world3.level1)
else if (scenario.substr(4, 1) == "3" && scenario.substr(5, 1) == "2" && levelsfinished == 11) renderLevel(data.levels.world3.level2)
else if (scenario.substr(4, 1) == "3" && scenario.substr(5, 1) == "3" && levelsfinished == 12) renderLevel(data.levels.world3.level3)
else if (scenario.substr(4, 1) == "3" && scenario.substr(5, 1) == "4" && levelsfinished == 13) renderLevel(data.levels.world3.level4)
else if (scenario.substr(4, 1) == "3" && scenario.substr(5, 1) == "5" && levelsfinished == 14) renderLevel(data.levels.world3.level5)
else if (scenario.substr(4, 1) == "4" && scenario.substr(5, 1) == "1" && levelsfinished == 15) renderLevel(data.levels.world4.level1)
else if (scenario.substr(4, 1) == "4" && scenario.substr(5, 1) == "2" && levelsfinished == 16) renderLevel(data.levels.world4.level2)
else if (scenario.substr(4, 1) == "4" && scenario.substr(5, 1) == "3" && levelsfinished == 17) renderLevel(data.levels.world4.level3)
else if (scenario.substr(4, 1) == "4" && scenario.substr(5, 1) == "4" && levelsfinished == 18) renderLevel(data.levels.world4.level4)
else if (scenario.substr(4, 1) == "4" && scenario.substr(5, 1) == "5" && levelsfinished == 19) renderLevel(data.levels.world4.level5)
else if (scenario.substr(4, 1) == "5" && scenario.substr(5, 1) == "1" && levelsfinished == 20) renderLevel(data.levels.world5.level1)
else if (scenario.substr(4, 1) == "5" && scenario.substr(5, 1) == "2" && levelsfinished == 21) renderLevel(data.levels.world5.level2)
else if (scenario.substr(4, 1) == "5" && scenario.substr(5, 1) == "3" && levelsfinished == 22) renderLevel(data.levels.world5.level3)
else if (scenario.substr(4, 1) == "5" && scenario.substr(5, 1) == "4" && levelsfinished == 23) renderLevel(data.levels.world5.level4)
else if (scenario.substr(4, 1) == "5" && scenario.substr(5, 1) == "5" && levelsfinished == 24) renderLevel(data.levels.world5.level5)
else if (scenario.substr(4, 1) == "0" && scenario.substr(5, 1) == "7" && !phone) {
	openEditor(editorConfig.width, editorConfig.height, editorConfig.spotlight, 0)
	data.sound.ok.play()
}
else data.sound.block.play()
}
}
if (scenario == 'title') {
	if (btnAvailable && keycode == 13) {
		updateSelection(true, 0, true)
		data.sound.ok.play()
		scenario = "menu01"
		changeMusic(data.sound.music.menu)
	}
}
if (scenario == 'level') {
	if (keycode == 37) move('left')
	if (keycode == 38) move('up')
	if (keycode == 39) move('right')
	if (keycode == 40) move('down')
	if (keycode == 16 && keyname != "ShiftRight") {
		updateSelection(true, 0, true)
		scenario = "menu01"
		changeMusic(data.sound.music.menu)
		data.sound.back.play()
		if (isRandom || isEditor) return
		data.levels['world' + world]['level' + level] = []
		for (var i = 0; i < origTileData.length; i++) {
			data.levels['world' + world]['level' + level].push([])
			for (var j = 0; j < origTileData[i].length; j++) {
				data.levels['world' + world]['level' + level][i].push(origTileData[i][j])
			}
		}
	}
	if (keycode == 81 && isRandom) alert('Seed: ' + randomLevelConfig.seed + '\nWidth: ' + randomLevelConfig.width + '\nHeight: ' + randomLevelConfig.height + '\nSolid Spawn Rate: ' + randomLevelConfig.solidRate + '\nResetter Spawn Rate: ' + randomLevelConfig.resetterRate + '\nIce Spawn Rate: ' + randomLevelConfig.iceRate + '\nHas Lever Generated: ' + randomLevelConfig.hasLever + '\nMoneybag Amount: ' + randomLevelConfig.moneybagAmount + '\nSpotlight: ' + randomLevelConfig.spotlight)
}
if (scenario.includes('editor') && scenario != "editorgrid") {
	var index = parseInt(scenario.substr(6, 1))
	if (keycode == 37 && index == 0 && editorConfig.width != 5) editorConfig.width--
	if (keycode == 37 && index == 1 && editorConfig.height != 5) editorConfig.height--
	if (keycode == 38 && index != 0) index--
	if (keycode == 39 && index == 0 && editorConfig.width != 15) editorConfig.width++
	if (keycode == 39 && index == 1 && editorConfig.height != 15) editorConfig.height++
	if (keycode == 13 && index == 2 && editorConfig.spotlight) editorConfig.spotlight = false
	else if (keycode == 13 && index == 2 && !editorConfig.spotlight) editorConfig.spotlight = true
	if (keycode == 40 && index != 4) index++
	if (keycode == 13 && index == 3) {
		openEditorGrid(0, 0, true)
		data.sound.ok.play()
		return
	}
	if (keycode == 13 && index == 4) {
		updateSelection(true, 0, true)
		data.sound.back.play()
		scenario = "menu01"
		return
	}
	data.sound.select.play()
	openEditor(editorConfig.width, editorConfig.height, editorConfig.spotlight, index)
}
if (scenario == "editorgrid") {
	if (keycode == 37 && editor.x != 0) editor.x--
	if (keycode == 38 && editor.y != 0) editor.y--
	if (keycode == 39 && editor.x != editorConfig.width - 1) editor.x++
	if (keycode == 40 && editor.y != editorConfig.height - 1) editor.y++
	if (keycode == 49) editor.item = "solid"
	if (keycode == 50) editor.item = "resetter"
	if (keycode == 51) editor.item = "ice"
	if (keycode == 52) editor.item = "moneybag"
	if (keycode == 53) editor.item = "flag"
	if (keycode == 54) editor.item = "lever"
	if (keycode == 55) editor.item = "door"
	if (keycode == 56) editor.item = "mario"
	if (keycode == 57) editor.item = "torch"
	if (keycode == 48) {
		if (scan("flag") && scan("mario")) renderLevel(editor.data, false, true)
		else data.sound.block.play()
		return
	}
	if (keycode == 16 && keyname != "ShiftRight") {
		scenario = "menu01"
		updateSelection(true, 0, true)
		data.sound.back.play()
		return
	}
	if (keycode == 13) {
		if (editor.data[editor.y][editor.x] == 0) {
			if (editor.item == "solid") editor.data[editor.y][editor.x] = 1
			else if (editor.item == "resetter") editor.data[editor.y][editor.x] = 2
			else if (editor.item == "ice") editor.data[editor.y][editor.x] = 3
			else if (editor.item == "moneybag") editor.data[editor.y][editor.x] = 4
			else if (editor.item == "flag") editor.data[editor.y][editor.x] = 5
			else if (editor.item == "lever" && !scan("lever")) editor.data[editor.y][editor.x] = 6
			else if (editor.item == "door") editor.data[editor.y][editor.x] = 7
			else if (editor.item == "mario" && !scan("mario") && !editorConfig.spotlight) editor.data[editor.y][editor.x] = 8
			else if (editor.item == "mario" && !scan("mario") && editorConfig.spotlight) editor.data[editor.y][editor.x] = 10
			else if (editor.item == "torch") editor.data[editor.y][editor.x] = 11
			else data.sound.block.play()
		}
		else editor.data[editor.y][editor.x] = 0
	}
	if (keycode == 81) {
		alert(exportToArray())
		return
	}
	openEditorGrid(editor.x, editor.y)
}
if (keycode == 9 && developerMode) {
	var div = document.createElement('div')
	div.setAttribute('id', 'developerMenu')
	div.setAttribute('style', 'top: 5px; left: 5px; position: absolute; padding: 5px; width: 300px; height: 250px; border: 1px solid black; background-color: white')
	div.innerHTML = "<div style=\"overflow: scroll; width: 100%; height: calc(100% - 26px)\">" + getTileData() + "<br><input type=\"text\" id=\"getVariable\"><button onclick=\"getVar(document.getElementById('getVariable').value)\">Get variable</button><br><input type=\"text\" id=\"setVariable\"><button onclick=\"setVar(document.getElementById('setVariable').value)\">Set variable</button></div><button onclick=\"document.getElementById('developerMenu').remove()\" style=\"width: 100%; height: 21px; bottom: 0px; left: 0px; postion: absolute\">Close</button>"
	document.body.appendChild(div)
}
}
function getVar(varName) {
	var value = eval(varName)
	alert(value + "\nType: " + typeof eval(varName))
}
function setVar(varName) {
	var value
	if (typeof eval(varName) == "number") value = parseInt(prompt('New value\nType: number'))
	if (typeof eval(varName) == "boolean") {
		var value = prompt('New value\nType: boolean')
		if (value == "true") value = true
		else value = false
	}
	if (typeof eval(varName) == "object") value = JSON.parse(prompt('New value\nType: object'))
	if (typeof eval(varName) == "string") value = prompt('New alue\nType: string')
	eval(varName + ' = ' + value)
	alert('Changed variable ' + varName + ' to ' + value + '.')
}
function getTileData() {
	var html = ""
	var index = 0
	for (var i = 0; i < tileData.length; i++) {
		html += "<div style=\"width: " + (tileData[i].length * 30) + "px\">"
		for (var j = 0; j < tileData[i].length; j++) {
			html += "<button style=\"height: 21px; width: 30px\" id=\"tileDataButton" + index + "\" onclick=\"setTileData(" + index + ", " + j + ", " + i + ")\">" + tileData[i][j] + "</button>"
			index++
		}
		html += "</div>"
	}
	return html
}
function setTileData(index, x, y) {
	document.getElementById('tileDataButton' + index)
	tileData[y][x] = parseInt(prompt('Set a new integer value'))
	if (isNaN(tileData[y][x])) tileData[y][x] = 0
	document.getElementById('tileDataButton' + index).innerHTML = tileData[y][x]
	document.getElementById('tileDataButton' + index).blur()
}
