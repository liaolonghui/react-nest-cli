import React, { ReactNode } from 'react'


export interface ICardProps {
    className?: string
    children: ReactNode
}

const Card = (props: ICardProps) => {
    const { className, children } = props || {};

    return (
        <div className={`card ${className || ''}`}>
            {children}
        </div>
    )
}


export default Card;