// @ts-check

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("background"));
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
canvas.height = 2000
canvas.width = window.innerWidth
ctx.imageSmoothingEnabled = false;


window.addEventListener("keydown", (e) => {
    if(e.key=="s"){
        down.name="downon.png";
        current+=1;
        if(current>=items.length) current=0;
    }
    if(e.key=="w"){
        up.name="upon.png";
        current-=1;
        if(current<0) current=items.length-1;
    }
    
});
window.addEventListener("keyup", (e) => {
    if(e.key=="s"){
        down.name="downoff.png";
    }
    if(e.key=="w"){
        up.name="upoff.png"
    }
    
});

let down={name:"downoff.png"};
let up={name:"upoff.png"};

let items=["Profile","Contact","Projects"];
let current = 0;
let chooser={name:"chooser.png",d:200,y:0,targety:0,max:0}
let chooserimage=new Image();
chooserimage.src=chooser.name;
chooser.max=items.length*chooser.d
let cardp = window.scrollY+70;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCard((canvas.width-550),cardp);
    ctx.fillStyle="grey";
    ctx.fillRect(50,0,300,9999999)
    ctx.fillStyle="blue"
    ctx.fillRect(100,25,200,200)

    chooser.targety=chooser.d*current;
    if(chooser.y<chooser.targety){
        chooser.y+= (chooser.targety - chooser.y)/4;
    }else if (chooser.y>chooser.targety){
        chooser.y -= (chooser.y-chooser.targety)/4;
    }
    ctx.drawImage(chooserimage,400,chooser.y+100,64,64)
    
    if(cardp<window.scrollY+70){
        cardp+= (window.scrollY+70 - cardp)/4;
    }else if (cardp>window.scrollY+70){
        cardp -= (cardp-window.scrollY-70)/4;
    }
    requestAnimationFrame(draw);

}
function drawCard(x=0, y=0){
    let img1 = new Image()
    img1.src=down.name;
    let img2 = new Image()
    img2.src=up.name;
    ctx.drawImage(img1,700,y+250,200,200)
    ctx.drawImage(img2,700,y+50,200,200)
    ctx.fillStyle="#9999"
    ctx.fillRect(x,y,500,500)
    ctx.fillStyle="#000000"
    ctx.font = "50px papyrus"
    ctx.fillText(items[current],x+175,y,1000)
}

draw();