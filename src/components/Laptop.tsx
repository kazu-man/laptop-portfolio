import { ContactShadows, Float, PresentationControls } from "@react-three/drei";
import NativeLaptop from "../models/NativeLaptop";
import { useState } from "react";
import SiteName from "./SiteName";
import { RigidBody } from "@react-three/rapier";
export default function Laptop() {
  const [laptopMove, setLaptopMove] = useState(false);
  const urls = [
    {
      id: 1,
      title: "Sift Link copy site",
      url: "https://shift-link-copy-site.vercel.app/",
      model: "virus",
    },
    {
      id: 2,
      title: "Shoes copy site",
      url: "https://d7z2e3isl4ewg.cloudfront.net/",
      model: "cactus",
    },
    {
      id: 3,
      title: "Introduction copy site",
      url: "https://d1lfpwvow4w05v.cloudfront.net/",
      model: "ruby",
    },
    {
      id: 4,
      title: "Scroll copy site",
      url: "https://d13deghd9i5lpg.cloudfront.net/",
      model: "reactLogo",
    },
    {
      id: 5,
      title: "Anime copy site",
      url: "https://d2isjk15o9hzi9.cloudfront.net/",
      model: "taxi",
    },
  ];
  const [selectedUrlId, setSelectedUrlId] = useState(urls[0].id);
  const selectedItem = urls.find((val) => val.id === selectedUrlId);

  return (
    <>
      <PresentationControls
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
        polar={[-Math.PI / 30, Math.PI / 30]}
        rotation={[0.2, 0.2, 0]}
        cursor={true}
      >
        <Float floatIntensity={1}>
          <RigidBody type="fixed">
            <NativeLaptop
              open={laptopMove}
              openMove={setLaptopMove}
              url={selectedItem?.url}
            />
          </RigidBody>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1} opacity={0.4} scale={5} blur={2.4} />
      <SiteName urls={urls} setSelectedUrlId={setSelectedUrlId} />
    </>
  );
}
