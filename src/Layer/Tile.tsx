import React, { FunctionComponent } from 'react';

interface Props {
  imageUrl: string;
  left: number;
  top: number;
}

const Tile: FunctionComponent<Props> = ({
  left,
  top,
  imageUrl
}) => (
  <div style={{
    position: 'absolute',
    left,
    top,
    width: 256,
    height: 256,
    backgroundImage: `url("${imageUrl}")`,
    border: '1px solid black',
  }} />
);

export default Tile;
