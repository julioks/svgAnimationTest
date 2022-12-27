//its ok, but it doesnt look great imo, cause its a bi close together
//on the angled parts, as its a bit too close on either the x or y axis
//try to make the increment based on x/y

let body = document.body;
var mlines=[];
var vbox=document.createElementNS('http://www.w3.org/2000/svg', 'svg')
vbox.setAttribute("height",window.innerHeight)
vbox.setAttribute("width",window.innerWidth)
var colors=["#FF9000",
"#FFFF00",
"#90FF00",
"#009090",
"#0000FF",
"#622DD1",
"#900090",
"#FF0000"]

function makeSingleLine(x1,x2,y1,y2,color,cssClass) {
    var svgline=document.createElementNS('http://www.w3.org/2000/svg','line');
    svgline.setAttribute("x1",x1)
    svgline.setAttribute("x2",x2)
    svgline.setAttribute("y1",y1)
    svgline.setAttribute("y2",y2)
    svgline.setAttribute("class",cssClass)
    svgline.setAttribute("style","stroke:"+color+" !important")
    return svgline;
}
function makeBaseLines() {
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth/2,
    window.innerHeight/2,
    0,colors[0],"baseLine"));
    console.log(colors[0])
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth,
    window.innerHeight/2,
    0,colors[1],"baseLine"));
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth,
    window.innerHeight/2,
    window.innerHeight/2,colors[2],"baseLine"));
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth,
    window.innerHeight/2,
    window.innerHeight,colors[3],"baseLine"));
    mlines.push(makeSingleLine(window.innerWidth/2,
    window.innerWidth/2,
    window.innerHeight/2,
    window.innerHeight,colors[4],"baseLine"));
    mlines.push(makeSingleLine(window.innerWidth/2,
    0,
    window.innerHeight/2,
    window.innerHeight,colors[5],"baseLine"));
    mlines.push(makeSingleLine(window.innerWidth/2,
    0,
    window.innerHeight/2,
    window.innerHeight/2,colors[6],"baseLine"));
    mlines.push(makeSingleLine(window.innerWidth/2,
    0,
    window.innerHeight/2,
    0,colors[7],"baseLine"));
  
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
  var newx1,newx2,newy1,newy2,size
  console.log(repeatedLine);
  if (parseFloat( sourceLine.getAttribute("x2"))==parseFloat( repeatedLine.getAttribute("x2"))) {
    newx2=parseFloat( sourceLine.getAttribute("x2"))
    size=calcDistance(sourceLine.getAttribute("x1"),sourceLine.getAttribute("x2"),sourceLine.getAttribute("y1"),sourceLine.getAttribute("y2"))
    
  }
  else{
    newy2=parseFloat( sourceLine.getAttribute("y2"))
    size=calcDistance(sourceLine.getAttribute("x1"),sourceLine.getAttribute("x2"),sourceLine.getAttribute("y1"),sourceLine.getAttribute("y2"))
    
  }
  var retLines=[]
  
  let repeats=size/incerment
  console.log(size,incerment,repeats)
  for (let i = 0; i < repeats; i++) {
    if (parseFloat( sourceLine.getAttribute("x2"))==parseFloat( repeatedLine.getAttribute("x2"))) {
      newx2=parseFloat( sourceLine.getAttribute("x2"))
      size=JSON.parse(JSON.stringify(Math.abs(newx2-sourceLine.getAttribute("x1")))) 
    
    }
    else{
      newy2=parseFloat( sourceLine.getAttribute("y2"))
      size=JSON.parse(JSON.stringify(Math.abs(newy2-sourceLine.getAttribute("y1")))) 
      
    }
     //get x1 and y1
  newx1=xFromDistance(parseFloat( sourceLine.getAttribute("x1")),
  parseFloat( sourceLine.getAttribute("x2")),
  parseFloat( sourceLine.getAttribute("y1")),
  parseFloat( sourceLine.getAttribute("y2")),
  incerment*i)
  newy1=yFromDistance(parseFloat( sourceLine.getAttribute("x1")),
  parseFloat( sourceLine.getAttribute("x2")),
  parseFloat( sourceLine.getAttribute("y1")),
  parseFloat( sourceLine.getAttribute("y2")),
  incerment*i)
  
  //get the slope of the line to be repeated
  var slope = ( parseFloat( repeatedLine.getAttribute("y2"))  -   repeatedLine.getAttribute("y1")) / (  repeatedLine.getAttribute("x2") - repeatedLine.getAttribute("x1"));
  if (!isFinite(slope)) {
    newx1=xFromDistance(parseFloat( sourceLine.getAttribute("x1")),
    parseFloat( sourceLine.getAttribute("x2")),
    parseFloat( sourceLine.getAttribute("y1")),
    parseFloat( sourceLine.getAttribute("y2")),
    incerment*i)
    newy1=yFromDistance(parseFloat( sourceLine.getAttribute("x1")),
    parseFloat( sourceLine.getAttribute("x2")),
    parseFloat( sourceLine.getAttribute("y1")),
    parseFloat( sourceLine.getAttribute("y2")),
    incerment*i)
    
    slope=Math.sign(slope)
      if (newx2==null) {
        newx2=JSON.parse(JSON.stringify(newx1))
      }
      else{
        newy2=JSON.parse(JSON.stringify(newy1))
      }

   

     
       /*newy2=parseFloat( repeatedLine.getAttribute("y2"))+(incerment*i*slope)
      console.log("y2",parseFloat( repeatedLine.getAttribute("y2"))+(incerment*i*slope))*/
     
  }
  else{
//solve for the remaining one
if(newx2==null){
   
  newx2=((slope*newx1)-newy1+newy2)/slope
 }
 else{
 
   newy2=slope*(newx2-newx1)+newy1
 
 }
  }
  console.log(sourceLine.getAttribute('style').slice(7,14))
  var ltomake=makeSingleLine(newx1,newx2,newy1,newy2,sourceLine.getAttribute('style').slice(7,14),"repeaterLine")
  retLines.push(ltomake)
  newx1=null;
  newx2=null;
  newy1=null;
  newy2=null;
 
  }


  return retLines

}
makeBaseLines();
//makeEightLines();

var inc =20
//console.log(makeRepeatingLines(mlines[0],mlines[1],10))
console.log()
var repLines=[]
function deleteChild(e) {
  
  var first = e.firstElementChild;
  while (first) {
      first.remove();
      first = e.firstElementChild;
  }
}
repLines.push(makeRepeatingLines(mlines[0],mlines[1],inc))
repLines.push(makeRepeatingLines(mlines[1],mlines[2],inc))
repLines.push(makeRepeatingLines(mlines[2],mlines[3],inc))
repLines.push(makeRepeatingLines(mlines[3],mlines[4],inc))
repLines.push(makeRepeatingLines(mlines[4],mlines[5],inc))
repLines.push(makeRepeatingLines(mlines[5],mlines[6],inc))
repLines.push(makeRepeatingLines(mlines[6],mlines[7],inc))
repLines.push(makeRepeatingLines(mlines[7],mlines[0],inc))

repLines.push(makeRepeatingLines(mlines[0],mlines[7],inc))
repLines.push(makeRepeatingLines(mlines[1],mlines[0],inc))
repLines.push(makeRepeatingLines(mlines[2],mlines[1],inc))
repLines.push(makeRepeatingLines(mlines[3],mlines[2],inc))
repLines.push(makeRepeatingLines(mlines[4],mlines[3],inc))
repLines.push(makeRepeatingLines(mlines[5],mlines[4],inc))
repLines.push(makeRepeatingLines(mlines[6],mlines[5],inc))
repLines.push(makeRepeatingLines(mlines[7],mlines[6],inc))

repLines.forEach(element => {
  drawLines(element)
});
drawLines(mlines);
window.addEventListener('resize', function(event) {
  console.log("fired")
  deleteChild(vbox)

vbox.setAttribute("height",window.innerHeight)
vbox.setAttribute("width",window.innerWidth)
  console.log(event)
  mlines=[]
  makeBaseLines();
//makeEightLines();

var inc =20
//console.log(makeRepeatingLines(mlines[0],mlines[1],10))
console.log()
var repLines=[]

repLines.push(makeRepeatingLines(mlines[0],mlines[1],inc))
repLines.push(makeRepeatingLines(mlines[1],mlines[2],inc))
repLines.push(makeRepeatingLines(mlines[2],mlines[3],inc))
repLines.push(makeRepeatingLines(mlines[3],mlines[4],inc))
repLines.push(makeRepeatingLines(mlines[4],mlines[5],inc))
repLines.push(makeRepeatingLines(mlines[5],mlines[6],inc))
repLines.push(makeRepeatingLines(mlines[6],mlines[7],inc))
repLines.push(makeRepeatingLines(mlines[7],mlines[0],inc))

repLines.push(makeRepeatingLines(mlines[0],mlines[7],inc))
repLines.push(makeRepeatingLines(mlines[1],mlines[0],inc))
repLines.push(makeRepeatingLines(mlines[2],mlines[1],inc))
repLines.push(makeRepeatingLines(mlines[3],mlines[2],inc))
repLines.push(makeRepeatingLines(mlines[4],mlines[3],inc))
repLines.push(makeRepeatingLines(mlines[5],mlines[4],inc))
repLines.push(makeRepeatingLines(mlines[6],mlines[5],inc))
repLines.push(makeRepeatingLines(mlines[7],mlines[6],inc))

repLines.forEach(element => {
  drawLines(element)
});
drawLines(mlines);
}, true);
//drawLines(makeRepeatingLines(mlines[2],mlines[3],10))
//drawLines(horShift(mlines[1],10)


