import { useEffect, useRef } from "react"
import paper from "paper"

export default function SlideCanvas () {
    const canvasRef = useRef(null);
    
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
            path.strokeColor = 'black';
            path.add(event.point);
        }
    
        tool.onMouseDrag = function (event: any) {
            path.add(event.point);
        }
    
        tool.onMouseUp = function () {
        }
        
    }, [])

    return (
        <canvas ref={canvasRef} className="h-full w-full"></canvas>
    )
}