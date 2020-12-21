import React, { FunctionComponent, useContext } from 'react';
import { MapContext } from '../Map';
import Tile from './Tile';

interface Props {
  serviceUrl: string;
}

const Layer: FunctionComponent<Props> = ({
  serviceUrl
}) => {
  const { zoom, width, center, height } = useContext(MapContext);
  const [ lon, lat ] = center;

  const worldSize = 256 * Math.pow(2, zoom);
  const mercatorX = worldSize * (lon / 360 + 0.5)
  const mercatorY = worldSize * (1 - Math.log(Math.tan(Math.PI * (0.25 + lat / 360))) / Math.PI) / 2

  const offsetX = Math.floor(mercatorX - width / 2);
  const offsetY = Math.floor(mercatorY - height / 2);

  const leftCol = Math.floor(offsetX / 256);
  const topRow = Math.floor(offsetY / 256);
  
  const tiles: Array<[number, number, string]> = [];

  for (var x = leftCol; x * 256 < offsetX + width; x++) {
    for (var y = topRow; y * 256 < offsetY + height; y++) {
      tiles.push([
        256 * x - offsetX,
        256 * y - offsetY,
        serviceUrl.replace('{z}', zoom.toString()).replace('{y}', y.toString()).replace('{x}', x.toString())
      ])
    }
  }
  
  return (
    <>
    {tiles.map(
      ([ left, top, url ]) => (
        <Tile key={`${top},${left}`} left={left} top={top} imageUrl={url} />
      )
    )}
    </>
  );
};

export default Layer;

