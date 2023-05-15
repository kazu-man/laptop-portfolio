import { useCursor } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import Title from "./Title";

export type siteNameProps = {
  urls: {
    id: number;
    title: string;
    url: string;
    model: string;
  }[];
  setSelectedUrlId: React.Dispatch<React.SetStateAction<number>>;
};
export default function SiteName({ urls, setSelectedUrlId }: siteNameProps) {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);
  const referredSelectedId = useRef(1); // selectedUrlIdをTitleに渡したいが、レンダリングしてしまうのでrefをかます

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

  const blocks = useMemo(() => {
    const updateId = (id: number) => {
      setSelectedUrlId(id);
      referredSelectedId.current = id;
    };

    return (
      <>
        {urls.map((val, index) => (
          <Title
            setSelectedUrlId={updateId}
            key={index}
            urls={val}
            textPosition={randomPosition()}
            cursorIn={cursorIn}
            cursorOut={cursorOut}
            selectedUrlId={referredSelectedId}
          />
        ))}
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{blocks}</>;
}
