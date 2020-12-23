import React, { ReactNode, FunctionComponent, createContext, useState, useEffect } from 'react';

interface Props {
  center?: [number, number];
  zoom: number,
  width: number,
  height: number,
  children: ReactNode,
}

interface MapContextType {
  center: [number, number];
  zoom: number,
  width: number,
  height: number,
}

export const MapContext = createContext<MapContextType>({
  zoom: 0,
  center: [0, 0],
  width: 0,
  height: 0,
});

const lonLatToPx: (center: [number, number], zoom: number) => [number, number] = ([lon, lat], zoom) => {
  const worldSize = 256 * Math.pow(2, zoom);
  const x = worldSize * (lon / 360 + 0.5);
  const y = worldSize * (1 - Math.log(Math.tan(Math.PI * (0.25 + lat / 360))) / Math.PI) / 2;
  return [x, y];
}

const pxToLonLat: (center: [number, number], zoom: number) => [number, number] = ([x, y], zoom) => {
  const worldSize = 256 * Math.pow(2, zoom);
  const lon = (x / worldSize - 0.5) * 360;
  const lat = ((Math.atan(Math.exp(-1 * (((y * 2 / worldSize) - 1) * Math.PI))) / Math.PI) - 0.25) * 360;
  return [lon, lat];
}

const Map: FunctionComponent<Props> = ({
  center: initialCenter = [0, 0],
  zoom: initialZoom,
  width,
  height,
  children,
}) => {
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [center, setCenter] = useState<[number, number]>(initialCenter);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const centerPx = lonLatToPx(center, zoom);

  useEffect(() => {
    setZoom(initialZoom);
  }, [initialZoom]);

  useEffect(() => {
    setCenter(initialCenter);
  }, [initialCenter]);

  const handleZoom = (dir: number) => setZoom(dir + zoom);
  const toggleDrag = () => setIsDragging(!isDragging);
  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      const [x, y] = centerPx;
      const {movementX, movementY} = e;
      setCenter(pxToLonLat([x - movementX, y - movementY], zoom));
    }
  }
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => setZoom(zoom - e.deltaY);

  return (
    <MapContext.Provider value={{ center: centerPx, zoom, height, width }}>
      <div
        id="map"
        style={{ width, height, position: 'relative', overflow: 'hidden', border: '3px solid black'}}
        onMouseDown={toggleDrag}
        onMouseUp={toggleDrag}
        onMouseMove={handleDrag}
        onWheel={handleScroll}
      >
        { children }
      </div>
      <div>
        <button
          onClick={() => handleZoom(+1)}
          disabled={zoom >= 19}
        >
          +
        </button>
        <button
          onClick={() => handleZoom(-1)}
          disabled={zoom <= 0}
        >
          -
        </button>
      </div>
    </MapContext.Provider>
  )
};

export default Map;
