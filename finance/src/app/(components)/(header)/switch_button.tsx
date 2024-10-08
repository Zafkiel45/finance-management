'use client';
import { useEffect, useState } from "react";
import  SunSVG from '../../../../public/svg/sun';
import  MoonSVG from '../../../../public/svg/moon';

export const SwitchButton = () => {

    const [theme, setTheme] = useState<string>('');

    function HandleAddLightTheme() {
        localStorage.financeTheme = 'light';
        document.body.classList.add('light');
        setTheme(() => 'light');

        document.body.classList.remove('dark');
    };
    function HandleAddDarkTheme() {
        localStorage.financeTheme = 'dark';
        document.body.classList.add('dark');
        setTheme(() => 'dark');
      
        document.body.classList.remove('light');
    };
    useEffect(() => {
        const matchTheme: boolean = 
            matchMedia('(prefers-color-theme: dark)').matches;
        
        if(matchTheme) {
            HandleAddDarkTheme();
        } else {
            HandleAddLightTheme();
        };
    }, []);
    function HandleSwitchMode() {
        if(localStorage.financeTheme) {
            const matchTheme: string = localStorage.financeTheme; 

            if(matchTheme === 'dark') {
                HandleAddLightTheme();
            } else {
                HandleAddDarkTheme();
            };
            
        } else {
            window.alert('ocorreu um erro')
        }
    }
    
    return (
        <button onClick={HandleSwitchMode} className="border group border-[#414141] p-2 desktopBig:p-3 rounded-md destkopMini:hover:bg-gray-700 transition-all">
            {theme === 'dark' ? 
                <MoonSVG className="fill-[#eeeeee] mobileMini:h-5 desktopMedium:h-7 desktopMedium:w-7 desktopBig:h-9 desktopBig:w-9 mobileMini:w-5" />
                :
                <SunSVG className="fill-[#414141] mobileMini:h-5 desktopMedium:h-7 desktopBig:w-9 desktopBig:h-9 desktopMedium:w-7 mobileMini:w-5 destkopMini:group-hover:fill-[#eeeeee]"/>
            }
        </button>
    )

};