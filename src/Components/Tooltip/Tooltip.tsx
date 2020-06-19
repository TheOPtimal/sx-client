import React, { useState } from "react";
import "./Tooltip.scss";

export default React.memo(function Tooltip({
  message,
  active,
}: {
  active: boolean;
  message: string;
}) {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);

  active &&
    document.body.addEventListener("mousemove", (event) => {
      setMouseX(event.x);
      setMouseY(event.y);
    });

  return active ? (
    <div className="Tooltip" style={{ top: mouseY - 10, left: mouseX + 13 }}>
      {message}
    </div>
  ) : null;
});
