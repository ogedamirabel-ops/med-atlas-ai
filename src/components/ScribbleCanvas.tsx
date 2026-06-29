import { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { Button } from './ui/button';

interface ScribbleCanvasProps {
  onSave: (dataUrl: string) => void;
}

export function ScribbleCanvas({ onSave }: ScribbleCanvasProps) {
  const [lines, setLines] = useState<any[]>([]);
  const isDrawing = useRef(false);
  const stageRef = useRef<any>(null);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleSave = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL();
      onSave(dataURL);
    }
  };

  const handleClear = () => {
    setLines([]);
  };

  return (
    <div>
      <div className="border rounded-lg overflow-hidden mb-4">
        <Stage
          width={800}
          height={600}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#000"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save Scribble</Button>
        <Button onClick={handleClear} variant="secondary">Clear</Button>
      </div>
    </div>
  );
}
