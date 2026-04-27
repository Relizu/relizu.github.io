// @ts-check

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("background"));
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
canvas.height = 2000
canvas.width = window.innerWidth
ctx.imageSmoothingEnabled = false;

const blip = new Audio("blip.wav");

window.addEventListener("keydown", (e) => {
    if(e.key=="s" || e.key=="ArrowDown"){
        blip.play();
        down.name="downon.png";
        current+=1;
        if(current>=items.length) current=0;
    }
    if(e.key=="w"|| e.key=="ArrowUp"){
        blip.play();
        up.name="upon.png";
        current-=1;
        if(current<0) current=items.length-1;
    }
    
});
window.addEventListener("keyup", (e) => {
    if(e.key=="s"|| e.key=="ArrowDown"){
        down.name="downoff.png";
    }
    if(e.key=="w"|| e.key=="ArrowUp"){
        up.name="upoff.png"
    }
    
});
let pfp= new Image()
pfp.src="me.jpg";
let down={name:"downoff.png"};
let up={name:"upoff.png"};
let ProfileIcon=new Image();
ProfileIcon.src="profile.png"
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
    ctx.drawImage(ProfileIcon,125,25,150,150)

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
    ctx.drawImage(img1,500,y+250,200,200)
    ctx.drawImage(img2,500,y+50,200,200)
    ctx.fillStyle="#9999"
    ctx.fillRect(x,y,500,500)
    ctx.fillStyle="#000000"
    if(items[current]=="Profile"){
        drawProfile(x,y)
    }
    
    ctx.font = '50px Fixedsys'
    ctx.fillText(items[current],x+175,y,1000)
}

function drawProfile(x=0,y=0){
    ctx.fillText("Hi!",x+150,y+50,500)
    ctx.font = '30px Fixedsys';
    ctx.fillText("It's me! Mohamed Ekramy(20)",x+10,y+100,50000)
    ctx.font = '25px Fixedsys';
    ctx.fillText("I'm a developer who learns and likes working-",x+10,y+150,50000)
    ctx.fillText("alone!",x+10,y+200,50000)
    ctx.fillText("This website is not complete yet.",x+10,y+250,50000)
    ctx.fillText("Note: I made this 100% without ai from scratch",x+10,y+300,50000)
    ctx.fillText("IN Canvas",x+10,y+350,50000)
    ctx.fillText("Everything you've seen so far is just drawing",x+10,y+400,50000)
    ctx.fillText("That's why you can copy/select text.",x+10,y+450,50000)

}
draw();