import React, { useEffect } from "react";
import "./EffectButton.css";

function EffectButton({
  type,
  id,
  className,
  ripple,
  onClick,
  style,
  children,
}) {
  useEffect(() => {
    const btnRipple = document.querySelectorAll(".btn-ripple");
    btnRipple.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const { pageX, pageY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();
        let x = ((pageX - rect.left) / currentTarget.offsetWidth) * 100;
        let y = ((pageY - rect.top) / currentTarget.offsetHeight) * 100;

        const ripple = document.createElement("span");
        const rippleColor = btn.dataset.ripple || "#212129";
        ripple.classList.add("ripple-effect");
        ripple.style.background = rippleColor;

        btn.appendChild(ripple);
        ripple.style.left = `${x}%`;
        ripple.style.top = `${y}%`;
        setTimeout(() => {
          ripple.remove();
        }, 700);
      });
    });
  }, []);

  return (
    <button
      type={type ? type : "button"}
      id={id}
      className={`btn btn-ripple ${className ? className : ""}`}
      data-ripple={ripple}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default EffectButton;
