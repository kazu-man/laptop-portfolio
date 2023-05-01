import { Float, Text, useCursor } from "@react-three/drei";
import { useState } from "react";

type siteNameProps = {
  urls: {
    id: number;
    title: string;
    url: string;
  }[];
  setSelectedUrlId: React.Dispatch<React.SetStateAction<number>>;
  selectedUrlId: number;
};
export default function SiteName({
  urls,
  setSelectedUrlId,
  selectedUrlId,
}: siteNameProps) {
  const [hovered, setHover] = useState(false);
  const [hoveredId, setHoveredId] = useState(0);

  useCursor(hovered);

  return (
    <Float
      speed={0.5} // Animation speed, defaults to 1
      rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.5}
    >
      {urls.map((val, index) => (
        <Text
          key={val.id}
          position={[2, 2 - index * 0.3, 2]}
          rotation={[0, -Math.PI * 0.1, 0]}
          scale={[0.2, 0.2, 0.2]}
          onClick={() => setSelectedUrlId(val.id)}
          onPointerOver={() => {
            setHoveredId(val.id);
            setHover(true);
          }}
          onPointerOut={() => {
            setHoveredId(0);
            setHover(false);
          }}
          color={
            selectedUrlId === val.id
              ? "yellow"
              : hoveredId === val.id
              ? "white"
              : "gray"
          }
        >
          {val.title}
        </Text>
      ))}
    </Float>
  );
}
