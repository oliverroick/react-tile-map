import React, { ReactNode, FunctionComponent, createContext } from 'react';

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
  zoom,
  width,
  height,
  children,
}) => (
  <MapContext.Provider value={{ center, zoom, height, width }}>
    <div id="map" style={{ width, height, position: 'relative', overflow: 'hidden', border: '3px solid black'}}>
      { children }
    </div>
  </MapContext.Provider>
);

export default Map;
