import React from "react";

const Loader = ({ mode, size }) => {
  switch (mode) {
    case "grid":
      return (
        <div className="w-full flex items-center justify-center">
          <svg width="105" height="105" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" className="fill-indigo-400">
            <circle cx="12.5" cy="12.5" r="12.5">
              <animate attributeName="fill-opacity" begin="0s" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5">
              <animate attributeName="fill-opacity" begin="100ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="52.5" cy="12.5" r="12.5">
              <animate attributeName="fill-opacity" begin="300ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="52.5" cy="52.5" r="12.5">
              <animate attributeName="fill-opacity" begin="600ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="92.5" cy="12.5" r="12.5">
              <animate attributeName="fill-opacity" begin="800ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="92.5" cy="52.5" r="12.5">
              <animate attributeName="fill-opacity" begin="400ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="12.5" cy="92.5" r="12.5">
              <animate attributeName="fill-opacity" begin="700ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="52.5" cy="92.5" r="12.5">
              <animate attributeName="fill-opacity" begin="500ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
            <circle cx="92.5" cy="92.5" r="12.5">
              <animate attributeName="fill-opacity" begin="200ms" dur="1s" values="1;.2;1" calcMode="linear" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      );

    default:
      return (
        <div className="relative w-full flex items-center justify-center ">
          <div className="absolute font-medium text-indigo-400 uppercase text-sm">Loading</div>
          <svg width={size || "105"} height={size || "105"} viewBox={size ? `0 0 ${size} ${size}` : "0 0 38 38"} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                <stop stop-color="#818cf8" stop-opacity="0" offset="0%" />
                <stop stop-color="#818cf8" stop-opacity=".631" offset="63.146%" />
                <stop stop-color="#818cf8" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(1 1)">
                <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
                </path>
                <circle fill="#818cf8" cx="36" cy="18" r="1">
                  <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite" />
                </circle>
              </g>
            </g>
          </svg>
        </div>
      );
  }
};

export default Loader;
