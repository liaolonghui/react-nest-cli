import React, { ReactNode } from 'react'


export interface IButtonProps {
    className?: string
    children: ReactNode
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Button = (props: IButtonProps) => {
    const { className, children, onClick } = props

    return (
        <div className={`button ${className || ''}`} onClick={onClick}>
            {children}
        </div>
    )
}


export default Button;