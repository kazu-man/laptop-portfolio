import { useCursor } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import SiteNameObject from "./SiteNameObject";
import { urlsType } from "./Laptop";

export default function FallingObjects({
  urls,
  setSelectedUrlId,
}: siteNameProps) {
  const [hovered, setHover] = useState(false);
  const referredSelectedId = useRef(1); // selectedUrlIdをTitleに渡したいが、レンダリングしてしまうのでrefをかます

  useCursor(hovered);

  const cursorIn = () => {
    setHover(true);
  };
  const cursorOut = () => {
    setHover(false);
  };

  const randomPosition = (): [number, number, number] => {
    let randomX = (Math.random() - 0.4) * 3;
    if (randomX > 0) {
      randomX += 2.5;
    } else {
      randomX -= 2.5;
    }

    const randomY = Math.random() * 10;
    const randomZ = (Math.random() - 0.3) * 2;

    return [randomX, randomY, randomZ];
  };

  const siteNameObject = useMemo(() => {
    const updateId = (id: number) => {
      setSelectedUrlId(id);
      referredSelectedId.current = id;
    };

    return (
      <>
        {urls.map((val, index) => (
          <SiteNameObject
            setSelectedUrlId={updateId}
            key={index}
            urls={val}
            objectPosition={randomPosition()}
            cursorIn={cursorIn}
            cursorOut={cursorOut}
            selectedUrlId={referredSelectedId}
          />
        ))}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{siteNameObject}</>;
}

export type siteNameProps = {
  urls: urlsType[];
  setSelectedUrlId: React.Dispatch<React.SetStateAction<number>>;
};
