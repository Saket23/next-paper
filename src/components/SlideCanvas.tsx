import { useEffect, useRef } from "react"
import paper from "paper"

type EventObjType = {
    x: Number,
    y: Number,
    time: Number
}

// //@ts-ignore
// const getDistance = (P1:EventObjType , P2: EventObjType) => Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2));


export default function SlideCanvas () {
    const canvasRef = useRef(null);
    const lastFivePointsRef = useRef<EventObjType[]>([]);
    const tempCircle1 = useRef<paper.Path.Circle | null>(null);
    const tempCircle2 = useRef<paper.Path.Circle | null>(null);
    // const currentVelocity = useRef<number>(0);
    // const curentPoint = useRef<paper.Point>();


    const calculateNextPoint = () => {
        const lastPoint = lastFivePointsRef.current[4];
        const secondLastPoint = lastFivePointsRef.current[3];

        //@ts-ignore
        const diffX = lastPoint.x - secondLastPoint.x;

        //@ts-ignore
        const diffY = lastPoint.y - secondLastPoint.y;
      
        //@ts-ignore
        const nextX = lastPoint.x + diffX;

        //@ts-ignore
        const nextY = lastPoint.y + diffY;

        const nextToNextX = nextX + diffX
        const nextToNextY = nextY + diffY

        const next = { x: nextX, y: nextY }
        const nextToNext = { x: nextToNextX, y: nextToNextY }
      
        return [next, nextToNext];
    }
    
    useEffect(() => {
        paper.install(window);
    
        paper.setup(canvasRef.current ?? '');

        // Create a simple drawing tool:
        let tool = new paper.Tool();
        let path: any;
        let pencil = {}
        let layer = new paper.Layer();
        layer.name = 'paper';
        layer.activate();

        // Define a mousedown and mousedrag handler
        tool.onMouseDown = function (event: any) {
            path = new paper.Path();
            lastFivePointsRef.current = []
            path.strokeColor = 'black';
            path.add(event.point);
            
        }
    
        tool.onMouseDrag = function (event: any) {
            path.add(event.point)
            if(lastFivePointsRef.current.length >= 5){
                lastFivePointsRef.current.shift();
            }
            const eventObj = {...event.point, time: Date.now()}
            lastFivePointsRef.current.push(eventObj)

            // const currentDistance = getDistance(lastFivePointsRef.current[0], eventObj);
            // //@ts-ignore
            // const timeDifference = eventObj.time - lastFivePointsRef.current[0].time;

            // currentVelocity.current = currentDistance/timeDifference
            console.log('saket', event.point)
            if(lastFivePointsRef.current.length > 2){
                const [nextPoint, nextToNext] = calculateNextPoint()

                if(tempCircle1.current){
                    tempCircle1.current.remove();
                }

                if(tempCircle2.current){
                    tempCircle2.current.remove();
                }

                const strokeWidth = paper.project.currentStyle.strokeWidth;

                const radius = strokeWidth / 4;
            
                tempCircle1.current = new paper.Path.Circle({
                  center: nextPoint,
                  radius: radius,
                });
            
                tempCircle1.current.strokeColor = paper.project.currentStyle.strokeColor;
                tempCircle1.current.strokeWidth = strokeWidth;
            
                tempCircle1.current.fillColor = new paper.Color(0.5, 0, 0.5);

                tempCircle2.current = new paper.Path.Circle({
                    center: nextPoint,
                    radius: radius,
                  });
              
                  tempCircle2.current.strokeColor = paper.project.currentStyle.strokeColor;
                  tempCircle2.current.strokeWidth = strokeWidth;
                  tempCircle2.current.fillColor = new paper.Color(0.5, 0, 0.5);
                
            }
        }
    
        tool.onMouseUp = function () {
        }
        
    }, [])

    return (
        <canvas ref={canvasRef} className="h-full w-full"></canvas>
    )
}