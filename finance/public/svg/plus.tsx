import * as React from "react"

function PlusSVG(props: any) {
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
        d="M8 2.75a.5.5 0 00-1 0V7H2.75a.5.5 0 000 1H7v4.25a.5.5 0 001 0V8h4.25a.5.5 0 000-1H8V2.75z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default PlusSVG
