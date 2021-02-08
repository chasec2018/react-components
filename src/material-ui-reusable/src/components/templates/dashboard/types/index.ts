import React, { ReactElement } from 'react';

export interface IDashboardTheme {
    textDark?: string;
    textLight?: string;
    backgroundDark?: string;
    backgroundLight?: string;
    sidebarWidth?: number;
    sidebarBackground?: string;
    appBarBackground?: string;
    containerBackground?: string;
    containerSize?: 'xl' | 'lg'| 'md' | 'sm'
}


export interface IDashboardFooter {
    children: any
}

export interface IDashboardHeader {
    children: any;
}

export interface IDashboardLink {
    children?: ReactElement[] | ReactElement | any;
    routeTo?: string;
    buttonText?: string;
    buttonColor?: string;
    buttonIcon?: any;
}

export interface IDashboard {
    children: ReactElement[] | ReactElement | any;
    brand?: string;
    header?: any;
    footer?: any;
    logo?: any;
    theme?: IDashboardTheme;
    options?: any;
}

