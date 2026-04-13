// @ts-check

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("background"));
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext("2d"));
canvas.height = 2500
canvas.width = window.innerWidth
ctx.imageSmoothingEnabled = false;

let wordlist=["Scroll down ;>.","live laugh love","Hi!","I'm an engineer","isn't this cool?","may 10th is a special day", "Egypt","I LOVE CATS!","Canvas","Machine Learning","Patience!",""]

let mouse={x:0,y:0}
document.addEventListener('mousemove', (event) => {
  mouse.x=event.pageX;
  mouse.y=event.pageY;
});
let transition = false;
let transa=0;
canvas.addEventListener("click", (e) => {
    if(Math.sqrt(Math.pow(e.pageX-(canvas.width/2),2)+Math.pow(e.pageY-boxanim.Pos-50,2))<100){
        transition=true;
    }
});
let boxdir={x:0,y:0};
let boxdirnorm=0;


const drop = new Image();
drop.src = "drop.png";

const cloud = new Image();
cloud.src = "cloud.png";

const road = new Image();
road.src = "road.png";

const box = new Image();
box.src = "box.png";

const finder = new Image();
finder.src="finder.png";

let droplist={x:[1],y:[1]};
let cloudx =[0,200,400,600,800,1000,1200,1400];
let texts={size:[20],direction:[0],x:[1],y:[1],contents:[""]};
let boxanim={direction:true,Pos:1500};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let sy = Math.min(255, Math.floor(window.scrollY / 5));
    let hex = sy.toString(16).padStart(2, "0");
    ctx.fillStyle = `#${hex}${hex}${hex}`;
    ctx.fillRect(0,-200,canvas.width, canvas.height+1000)
    ctx.fillStyle="#ffffff";
    ctx.font = "80px Consolas"; 
    ctx.fillText("Welcome",(canvas.width-300)/2,300,1000);
    ctx.fillText("To",(canvas.width-50)/2,370,1000);
    ctx.fillText("My Mind.~",(canvas.width-250)/2,440,1000);

    ctx.drawImage(road,0,780,canvas.width,canvas.width/8)
    if(Math.random()>0.97){
        texts.size.push(10+Math.random()*20);
        texts.direction.push(Math.floor(Math.random() * 2));
        texts.y.push(Math.random()*1000);
        if(texts.direction[texts.direction.length-1]==1){
            texts.x.push(1600);
        }else{
            texts.x.push(-300);
        }
        texts.contents.push(wordlist[Math.floor(Math.random()*wordlist.length)]);
    }
    droplist.x.push(Math.random()*1800);
    droplist.y.push(0);
    for (let p=0;p <droplist.x.length;p++) {
        ctx.drawImage(drop,droplist.x[p],droplist.y[p],10,10);
        droplist.y[p]+=15
        droplist.x[p]-=5;
        if(droplist.y[p]>1000){
            droplist.y.splice(p,1)
            droplist.x.splice(p,1)
        }
    }
    for (let c = 0; c <cloudx.length;c++){
        ctx.drawImage(cloud,cloudx[c],-50,250,100);
        cloudx[c]-=1
        if(cloudx[c]<-250){
            cloudx[c]=1400
        }
    }
    for(let t=0; t<texts.x.length;t++){
        ctx.font =texts.size[t].toString()+"px Consolas";
        ctx.fillText(texts.contents[t],texts.x[t],texts.y[t],1000);
        if(texts.direction[t]==1){
            texts.x[t] -=1;
            if(texts.x[t]<-300){
                texts.x.splice(t,1);
                texts.y.splice(t,1);
                texts.contents.splice(t,1);
                texts.direction.splice(t,1);
                texts.size.splice(t,1);
            }
        }else{
            texts.x[t] +=1;
            if(texts.x[t]>1600){
                texts.x.splice(t,1);
                texts.y.splice(t,1);
                texts.contents.splice(t,1);
                texts.direction.splice(t,1);
                texts.size.splice(t,1);
            }
        }
        
    }
    if(boxanim.direction){
        boxanim.Pos+=1;
        if(boxanim.Pos>1525){
            boxanim.direction=false;
        }
    }else{
        boxanim.Pos-=1;
        if(boxanim.Pos<1500){
            boxanim.direction=true;
        }
    }
    
    ctx.drawImage(box,(canvas.width-250)/2,boxanim.Pos,250,200)

    if(mouse.y>1000){
        canvas.classList.remove("umbrella");
    }else{
        canvas.classList.add("umbrella");
    }
    boxdir={x:((canvas.width-250)/2)-mouse.x,y:(boxanim.Pos-mouse.y)};
    boxdirnorm=Math.sqrt(Math.pow(boxdir.x,2)+Math.pow(boxdir.y,2));
    boxdir={x:boxdir.x/boxdirnorm,y:boxdir.y/boxdirnorm};
    ctx.save()
    ctx.translate(mouse.x+boxdir.x*40+25,mouse.y+boxdir.y*40+25);
    ctx.rotate((Math.PI/2)+Math.atan2(boxdir.y,boxdir.x))
    ctx.drawImage(finder, -finder.width / 2, -finder.height / 2)
    
    ctx.restore()

    if(transition){
        ctx.fillStyle="rgba(255,255,255,"+transa+")"
        ctx.fillRect(0,0,10000,10000);
        transa +=0.1;
        if(transa>=0.9){
            window.location.href = "main.html";
            
        }
    }
    if(transa<0.9){
        requestAnimationFrame(draw);
    }

}

draw();