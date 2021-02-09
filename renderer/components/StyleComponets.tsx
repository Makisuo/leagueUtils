import React, { FC, ReactNode } from 'react'

interface Props {
	color?: string
	children: ReactNode
}
export const Bold = ({ children, color }: Props) => (
	<span style={{ fontWeight: 'bold', color: color }}>{children}</span>
)

export const Colored = ({ children, color }: Props) => (
	<span style={{ color: color }}>{children}</span>
)
