import React, { FC } from 'react'

interface IProps {
    children: any;
    isTrue: boolean;
}

const RenderIf: FC<IProps> = ({ children, isTrue = false }) => {

    if ( isTrue ) {
        return children;        
    }

    return null;
}

export default RenderIf;