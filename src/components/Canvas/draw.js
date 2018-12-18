function getCartesianPoint(point, canvasCenter){
  const { x: xp, y: yp } = point;
  const { x: xc, y: yc } = canvasCenter;
  return {
    x: xp - xc,
    y: yc - yp
  }
}

function getCanvasPoint(point, canvasCenter){
  const { x: xp, y: yp } = point;
  const { x: xc, y: yc } = canvasCenter;
  return {
    x: xc + xp,
    y: yc - yp
  }
}


function drawEffect({d, ctx, effect,frattalePoint}){

  if(effect === 'noise'){
    if(Math.random(0,1)*100 > 99.5) {
      ctx.lineTo(frattalePoint.x + Math.random(-1,1)* 30 ,frattalePoint.y+ Math.random(-1,1)* 30);

    }
  }

  if(effect === 'tree'){
    if(d % 30 === 0){
      ctx.lineTo(frattalePoint.x + Math.random(-1,1)* 20 ,frattalePoint.y+ Math.random(-1,1)* 20);
    }
    
  }

}


export const drawFrattali = ({ctx, line, frattali, canvasCenter, effect}) => {
  
  let frattaliLines = Array.from({length: frattali}, (e) => [])

  for (let p = 0; p < line.length; p++) {

    const point = getCartesianPoint(line[p], canvasCenter)
    const radius = Math.sqrt(Math.abs(Math.pow(point.x, 2) + Math.pow(point.y,2)))
    const alpha = Math.atan2(point.y, point.x) * 180 / Math.PI;
    const anglePointToCenter = alpha < 0 ? 180 + (180 + alpha) : alpha
    const angles = Array.from({length: frattali}, (e, index) =>( 360 / frattali)*(index + 1))
    
    for (let i = 0; i < angles.length; i++) {  
      const frattaleAngle = angles[i];
      const frattaleX = Math.cos((anglePointToCenter - frattaleAngle)*Math.PI/180) * radius
      const frattaleY = Math.sin((anglePointToCenter - frattaleAngle )*Math.PI/180) * radius
      const frattalePoint = getCanvasPoint({
        x: frattaleX,
        y: frattaleY
      }, canvasCenter)

      frattaliLines[i][p] = frattalePoint
    }
  }

  for (let i = 0; i < frattaliLines.length; i++) {
    const frattaleLine = frattaliLines[i];
    ctx.beginPath();
    for (let d = 0; d < frattaleLine.length; d++) {
      const frattalePoint = frattaleLine[d];
      ctx.lineTo(frattalePoint.x,frattalePoint.y);

      if(effect){
        drawEffect({d, ctx, effect, frattalePoint})
      }

      
      ctx.strokeStyle="#ac00ff"
    }
    ctx.stroke();
    ctx.closePath();  
  }
}