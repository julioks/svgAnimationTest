//math on vertlines function doesnt add up

let body = document.body;
var horlines=[];
var vertlines=[];
var vbox=document.createElementNS('http://www.w3.org/2000/svg', 'svg')
vbox.setAttribute("height",window.innerHeight)
vbox.setAttribute("width",window.innerWidth)


function drawline(x1,x2,y1,y2){
var svgline=document.createElementNS('http://www.w3.org/2000/svg','line');
svgline.setAttribute("x1t",x1)
svgline.setAttribute("x2t",x2)
svgline.setAttribute("y1t",y1)
svgline.setAttribute("y2t",y2)
svgline.setAttribute("class","lineclass")
return svgline;
}

function makeVertLines(interval,y1,y2){
    for (let i = 0; i < Math.trunc( window.innerWidth/interval)*2; i++) {
       vertlines.push( drawline((-(window.innerWidth))+(i*interval),0+(i*interval),y1,y2))
    }
}
function makeHorLines(interval,x1,x2){
    for (let i = 0; i < Math.trunc( window.innerHeight/interval); i++) {
       horlines.push( drawline(x1,x2,window.innerHeight-interval*i,window.innerHeight-interval*i))
    }
}

function addvBox(){
    horlines.forEach(element => {
        vbox.append(element)
    });
    vertlines.forEach(element => {
        vbox.append(element)
    });
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
makeVertLines(20,0,window.innerHeight);
makeHorLines(20,0,window.innerWidth);
addvBox();


body.append(vbox);

function randomGrow(mininc,maxinc){
    horlines=horlines.sort((a, b) => 0.5 - Math.random());
    vertlines=vertlines.sort((a, b) => 0.5 - Math.random());
   horlines.forEach(element => {
        element.setAttribute("x1",0)
        element.setAttribute("x2",0)
        element.setAttribute("y1",element.getAttribute("y1t"))
        element.setAttribute("y2",element.getAttribute("y2t"))
    });
function steph(){
    horlines.forEach(element => {
        let nx2=Math.min(parseInt(element.getAttribute("x2t")),parseInt(element.getAttribute("x2"))+randomIntFromInterval(mininc,maxinc))
        element.setAttribute("x2",nx2)
     });
     window.requestAnimationFrame(steph) 
    }
window.requestAnimationFrame(steph)
   vertlines.forEach(element => {
        element.setAttribute("x1",element.getAttribute("x1t"))
        element.setAttribute("x2",0)
        element.setAttribute("y1",element.getAttribute("y1t"))
        element.setAttribute("y2",0)
    });
    function stepv(){
        var count=0;
    vertlines.forEach(element => {
        let ny2=Math.min(parseInt(element.getAttribute("y2t")),parseInt(element.getAttribute("y2"))+randomIntFromInterval(mininc,maxinc))

        /**x1*/

        let nx2=Math.min((ny2*(element.getAttribute("x2t")/element.getAttribute("y2t")))+element.getAttribute("x2t"),parseInt(element.getAttribute("x2t")))
        if (ny2+mininc+maxinc>parseInt(element.getAttribute("y2t"))) {
            ny2=parseInt(element.getAttribute("y2t"))
        }
        if (nx2+mininc+maxinc>parseInt(element.getAttribute("x2t"))) {
            nx2=parseInt(element.getAttribute("x2t"))
        }
        element.setAttribute("y2",ny2)
        element.setAttribute("x2",nx2)
        if (nx2==parseInt(element.getAttribute("x2t"))){
            count++;
        }
     }); 
     
     console.log(count,vertlines.length)
     if (count<vertlines.length) {
        window.requestAnimationFrame(stepv)
     }
    
    }
   window.requestAnimationFrame(stepv)
    
 
   

}
randomGrow(1,10)