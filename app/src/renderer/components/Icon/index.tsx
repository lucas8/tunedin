import React from 'react';
import styled from 'styled-components';
import icons from './icons.json';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
    glyph: string;
    size?: number;
    children?: React.ReactNode;
    fill?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InlineSvg = styled.svg<any>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: inherit;
    fill: currentColor;
`;

const SvgWrapper = styled.div<{ size: number }>`
    display: inline-block;
    flex: 0 0 ${(props) => (props.size ? `${props.size}px` : '32px')};
    width: ${(props) => (props.size ? `${props.size}px` : '32px')};
    height: ${(props) => (props.size ? `${props.size}px` : '32px')};
    min-width: ${(props) => (props.size ? `${props.size}px` : '32px')};
    min-height: ${(props) => (props.size ? `${props.size}px` : '32px')};
    position: relative;
    color: inherit;
`;

function findGlyph(s: string): string {
    const possibleIcon = icons.find((x) => x.name === s);

    if (possibleIcon) {
        return possibleIcon.path;
    } else {
        return '';
    }
}

export const Icon = (props: IconProps) => {
    const { size = 32, glyph, children, fill, ...rest } = props;

    return (
        <SvgWrapper size={size} className="icon" {...rest}>
            <InlineSvg
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="1.414"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={glyph}
                viewBox="0 0 32 32"
                preserveAspectRatio="xMidYMid meet"
                fit={true}
                width={size}
                height={size}
            >
                <title>{glyph}</title>
                <g>
                    {children}
                    <path d={findGlyph(glyph)} fill={fill}></path>
                </g>
            </InlineSvg>
        </SvgWrapper>
    );
};
