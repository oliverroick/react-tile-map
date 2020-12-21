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

const Map: FunctionComponent<Props> = ({
  center = [0, 0],
  zoom: initialZoom,
  width,
  height,
  children,
}) => {
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    setZoom(initialZoom);
  }, [initialZoom]);

  const handleZoom = (dir: number) => setZoom(dir + zoom);

  return (
    <MapContext.Provider value={{ center, zoom, height, width }}>
      <div id="map" style={{ width, height, position: 'relative', overflow: 'hidden', border: '3px solid black'}}>
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
