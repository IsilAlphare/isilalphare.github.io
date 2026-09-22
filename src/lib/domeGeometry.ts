// Project a solid, extruded four-point star onto the SVG plane.
const outline = [[0,-67],[13,-18],[61,0],[13,16],[0,67],[-14,16],[-61,0],[-14,-18]];
export function starFaces(angle: number) {
  const rotate = ([x,y,z]: number[]) => {
    const xx = x * Math.cos(angle) + z * Math.sin(angle);
    const zz = -x * Math.sin(angle) + z * Math.cos(angle);
    const tilt = -.14;
    return [xx, y*Math.cos(tilt)-zz*Math.sin(tilt), y*Math.sin(tilt)+zz*Math.cos(tilt)];
  };
  const vertices = [-7,7].flatMap(z=>outline.map(([x,y])=>rotate([x,y,z])));
  // Triangulated front and back surfaces make the subtle faceting visible.
  vertices.push(rotate([0,0,-11]), rotate([0,0,11]));
  const faces: number[][] = [];
  for (let i=0;i<8;i++) {
    const next=(i+1)%8;
    faces.push([16,next,i], [17,i+8,next+8], [i,next,next+8,i+8]);
  }
  return faces.map((indices,index)=>{
    const points=indices.map(i=>vertices[i]);
    const [a,b,c]=points;
    const u=b.map((v,i)=>v-a[i]), v=c.map((n,i)=>n-a[i]);
    const normal=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    const length=Math.hypot(...normal)||1;
    const light=Math.abs((normal[0]*-.4+normal[1]*-.5+normal[2]*.76)/length);
    return {
      points: points.map(([x,y,z])=>`${(260+x*650/(650-z)).toFixed(2)},${(285+y*650/(650-z)).toFixed(2)}`).join(' '),
      depth: points.reduce((sum,p)=>sum+p[2],0)/points.length,
      fill: `hsl(${index%3===2 ? 185 : 265-index%4*12} 23% ${48+light*34}%)`,
    };
  }).sort((a,b)=>a.depth-b.depth);
}
export function orbitPosition(angle: number, rx: number, ry: number) {
  return { x: rx*Math.cos(angle), y: ry*Math.sin(angle) };
}
