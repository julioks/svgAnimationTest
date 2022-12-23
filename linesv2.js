let body = document.body;
var mlines=[];
var vbox=document.createElementNS('http://www.w3.org/2000/svg', 'svg')
vbox.setAttribute("height",window.innerHeight)
vbox.setAttribute("width",window.innerWidth)


function makeSingleLine(x1,x2,y1,y2) {
    var svgline=document.createElementNS('http://www.w3.org/2000/svg','line');
    svgline.setAttribute("x1",x1)
    svgline.setAttribute("x2",x2)
    svgline.setAttribute("y1",y1)
    svgline.setAttribute("y2",y2)
    svgline.setAttribute("class","lineclass")
    return svgline;
}
function makeBaseLines() {
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth/2,
    window.innerHeight/2,
    0));
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth,
    window.innerHeight/2,
    0));
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth,
    window.innerHeight/2,
    window.innerHeight/2));
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth,
    window.innerHeight/2,
    window.innerHeight));
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth/2,
    window.innerHeight/2,
    window.innerHeight));
    mlines.push(makeSingleLine(window.innerWidth/2,
    0,
    window.innerHeight/2,
    window.innerHeight));
    mlines.push(makeSingleLine(window.innerWidth/2,
    0,
    window.innerHeight/2,
    window.innerHeight/2));
    mlines.push(makeSingleLine(window.innerWidth/2,
    0,
    window.innerHeight/2,
    0));
  
}
function makePartLines(line1,line2,increment){
    var returnLines=[];
    var newx1,newx2t,newy1,newy2t,newline
    newx1=xFromDistance(line1.getAttribute("x1"),
    line1.getAttribute("x2t"),
    line1.getAttribute("y1"),
    line1.getAttribute("y2t"),
    increment
    )
    newx2t

    for (let i = 0; i < Math.trunc( line1.getAttribute("x")/increment); i++) {
        returnLines.push( makeSingleLine(x1,x2,window.innerHeight-interval*i,window.innerHeight-interval*i))
     }

    return returnLines
}
function drawLines(lines) {
    lines.forEach(element => {
        vbox.append(element)
    });
    body.append(vbox);
}
function randomGrow(lines) {
    lines=lines.sort((a, b) => 0.5 - Math.random());
    function step(){
        var count=0;
    lines.forEach(element => {
        let nx2=Math.min(parseInt(element.getAttribute("x2t")),parseInt(element.getAttribute("x2"))+randomIntFromInterval(mininc,maxinc))

        /**x1*/
        
        let ny2=Math.min(yFromX(parseFloat(element.getAttribute("x1")),
        parseFloat(element.getAttribute("y1")),
        parseFloat(element.getAttribute("x2t")),
        parseFloat(element.getAttribute("y2t")),
        nx2),parseFloat(element.getAttribute("y2t")))
        if (ny2+mininc+maxinc>parseInt(element.getAttribute("y2t"))) {
            count++ 
        }
       
        element.setAttribute("y2",ny2)
        element.setAttribute("x2",nx2)
     
     }); 
     
     console.log(count,lines.length)
     if (count<lines.length) {
        window.requestAnimationFrame(step)
     }
    
    }
    window.requestAnimationFrame(step)
}
function yFromX(x1,y1,x2t,y2t,nx) {
    //find m and b for y=mx+b
    var gradient = (y2t - y1) / (x2t - x1);//m
    var intercept = y1 - (gradient * x1);//b
    return gradient * nx + intercept;//new y = m*newx + b
  }
  function xFromDistance(x1,x2,y1,y2,distance){
    x1=parseFloat(x1);
    x2=parseFloat(x2);
    y1=parseFloat(y1);
    y2=parseFloat(y2);
    var maindistance=calcDistance(x1,x2,y1,y2)
    return x1+((distance/maindistance)*(x2-x1))
  }
  function yFromDistance(x1,x2,y1,y2,distance){
    x1=parseFloat(x1);
    x2=parseFloat(x2);
    y1=parseFloat(y1);
    y2=parseFloat(y2);
    var maindistance=calcDistance(x1,x2,y1,y2)
    console.log(distance/maindistance*(y2-y1))
    return y1+((distance/maindistance)*(y2-y1))
  }
  function ytarget(a,x1,x2,y1,y2){
    a=parseFloat(a);
    x1=parseFloat(x1);
    x2=parseFloat(x2);
    y1=parseFloat(y1);
    y2=parseFloat(y2);
    var m=(y1-y2)/(x1-x2)
    
    console.log(a)
    return -(m*(x1-a)-y1)
  }

  
  function calcDistance(x1,x2,y1,y2) {
    return Math.sqrt((Math.pow((x2-x1),2)+Math.pow((y2-y1),2)))
  }
  function makeRepeatingLines(prevLine,selfLine,nextLine,distanceInc){
   var nextdist=distanceInc
   var neighx1=prevLine.getAttribute("x1");
   var neighx2=prevLine.getAttribute("x2");
   var neighy1=prevLine.getAttribute("y1");
   var neighy2=prevLine.getAttribute("y2");
   var selfx1=selfLine.getAttribute("x1");
   var selfx2=selfLine.getAttribute("x2");
   var selfy1=selfLine.getAttribute("y1");
   var selfy2=selfLine.getAttribute("y2");
   var addlines=[]
    while (nextdist<calcDistance(neighx1,neighx2,neighy1,neighy2)) {
    var newx1=xFromDistance(neighx1,neighx2,neighy1,neighy2,nextdist)
    var newy1=yFromDistance(neighx1,neighx2,neighy1,neighy2,nextdist)
    //var newx2=xtarget(neighx1,neighx2,neighy1,neighy2,newx1,newy1)
    var newy2=ytarget(newx1,selfx1,selfx2,selfy1,selfy2)

    addlines.push(makeSingleLine(newx1,newx1,newy1,newy2))
    nextdist=nextdist+distanceInc
    //console.log(xFromDistance(neighx1,neighx2,neighy1,neighy2,nextdist))
}
return addlines
  }

makeBaseLines();
//makeEightLines();
drawLines(mlines);

drawLines(makeRepeatingLines(mlines[0],mlines[1],mlines[2],10))
//drawLines(horShift(mlines[1],10))


