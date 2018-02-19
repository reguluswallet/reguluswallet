import React from 'react';
import {Svg} from 'expo';
import {Colors, Layout} from '../constants';


const SlideBackground = (props) => {
    let {width, height} = Layout.window;

    let h = height / 2;
    let w = width;

    let points = `0,0 0,${h} ${w},${h} ${w},75`;

    if (props.flipped) {
        points = `0,75 0,${h} ${w},${h} ${w},0`;
    }

    return (
        <Svg height={h} width={w}>
            <Svg.Polygon
                points={points}
                fill={Colors.offWhite}
            />
        </Svg>
    );
};

export {SlideBackground};