// @flow
import React from 'react';

import buildingIcon from '../../assets/icons/building.svg';

import './ProgressBarWithLogo.scss'

type Props = {
    logo?: string,
    size?: number,
    percentage?: number,
    strokeWidth?: number
}

const ProgressBarWithLogo = ({
    logo,
    size = 80,
    percentage = 0,
    strokeWidth = 1
}: Props) => {

    const radius = (size - strokeWidth) / 2;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;

    return (
        <div className="progress-bar-with-logo">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    className="progress-bar-with-logo__background"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`} 
                />
                <circle
                    className="progress-bar-with-logo__progress"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }} 
                />
            </svg>
            <img src={logo ? logo : buildingIcon} alt="logo" className="progress-bar-with-logo__image" />
        </div>
    );
}

export default ProgressBarWithLogo;