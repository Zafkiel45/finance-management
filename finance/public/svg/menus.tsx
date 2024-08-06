import * as React from "react"

function MinusSvg(props:any) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.25 7.5a.5.5 0 01.5-.5h9.5a.5.5 0 010 1h-9.5a.5.5 0 01-.5-.5z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default MinusSvg
