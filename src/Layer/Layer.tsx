import React, { FunctionComponent, useContext } from 'react';
import { MapContext } from '../Map';
import Tile from './Tile';

interface Props {
  serviceUrl: string;
  copyrightInfo?: React.ReactNode;
}

const Layer: FunctionComponent<Props> = ({
  serviceUrl,
  copyrightInfo,
}) => {
  const { zoom, width, center, height } = useContext(MapContext);
  const [ mercatorX, mercatorY ] = center;

  const offsetX = Math.floor(mercatorX - width / 2);
  const offsetY = Math.floor(mercatorY - height / 2);

  const leftCol = Math.floor(offsetX / 256);
  const topRow = Math.floor(offsetY / 256);
  
  const tiles: Array<[number, number, string]> = [];

  for (var x = leftCol; x * 256 < offsetX + width; x++) {
    for (var y = topRow; y * 256 < offsetY + height; y++) {
      if (x < 0 || y < 0 || x >= 1 << zoom || y >= 1 << zoom) {
        continue;
      }

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
    {copyrightInfo && <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white'}}>{ copyrightInfo }</div>}
    </>
  );
};

export default Layer;

