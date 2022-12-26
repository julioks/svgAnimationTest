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
function makeRepeatingLines(sourceLine,repeatedLine,incerment){
  //check which part is shared
  var newx1,newx2,newy1,newy2
  if (sourceLine.getAttribute("x2")==repeatedLine.getAttribute("x2")) {
    newx2=sourceLine.getAttribute("x2")
  }
  else{
    newy2=sourceLine.getAttribute("y2")
  }
  //get x1 and y1
  newx1=xFromDistance(sourceLine.getAttribute("x1"),
  sourceLine.getAttribute("x2"),
  sourceLine.getAttribute("y1"),
  sourceLine.getAttribute("y2"),
  incerment)
  newy1=yFromDistance(sourceLine.getAttribute("x1"),
  sourceLine.getAttribute("x2"),
  sourceLine.getAttribute("y1"),
  sourceLine.getAttribute("y2"),
  incerment)
  //get the slope of the line to be repeated
  var slope = ( parseFloat( sourceLine.getAttribute("y2"))  -   sourceLine.getAttribute("y1")
  ) / (  sourceLine.getAttribute("x2")
  - sourceLine.getAttribute("x1"));
  //solve for the remaining one
  if(newx2==null){
    newx2=newx1+Math.sqrt(Math.pow(slope,2)-Math.pow((newy2-newy1),2))
  }
  else{
    newy2=newx2=newx1+newy1
  }
  return makeSingleLine(newx1,newx2,newy1,newy2)

}
makeBaseLines();
//makeEightLines();
drawLines(mlines);
console.log(makeRepeatingLines(mlines[0],mlines[1],10))
drawLines(makeRepeatingLines(mlines[0],mlines[1],10))
//drawLines(horShift(mlines[1],10))


