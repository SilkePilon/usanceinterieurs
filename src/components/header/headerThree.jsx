"use client"
import React from 'react'
import BottomNavbar from './bottomNavbar'
import MobileNavbar from './mobileNavbar'
import useHideShowNavbar from '@/hooks/useHideShowNavbar'

const HeaderThree = () => {
    // Use hook to handle navbar visibility
    useHideShowNavbar();

    return (
        <header className='fixed top-0 left-0 w-full z-[100] overflow-x-clip bg-background shadow-sm'>
            <div className='container-fluid'>
                <div className='container'>
                    <div className='hidden xl:block'>
                        <BottomNavbar />
                    </div>
                </div>
            </div>
            <div className='xl:hidden block'>
                <MobileNavbar />
            </div>
        </header>
    )
}

export default HeaderThree