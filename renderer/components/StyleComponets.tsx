import React, { ReactNode } from 'react'

interface Props {
	color?: string
	fontSize?: string
	children: ReactNode
}
export const Bold = ({ children, color, fontSize }: Props) => (
	<span style={{ fontWeight: 'bold', color: color, fontSize: fontSize }}>
		{children}
	</span>
)

export const Colored = ({ children, color, fontSize }: Props) => (
	<span style={{ color: color, fontSize: fontSize }}>{children}</span>
)
