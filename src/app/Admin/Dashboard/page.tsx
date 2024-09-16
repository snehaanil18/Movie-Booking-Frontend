"use client";
import React, { useState } from 'react'
import styles from './dashboard.module.css'
import Button from '@/Utils/Components/Button/Button';
import AllMovies from '../Components/Movies/AllMovies/AllMovies';
import AllTheater from '../Components/Theaters/AllTheater/AllTheater';
import AddShows from '../Components/Shows/AddShows/addShows';


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('tab1');

    const switchTabs = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.sidenav}>
                    <Button label="Movies" onClick={() => switchTabs('tab1')} />
                    <Button label="Theaters" onClick={() => switchTabs('tab2')} />
                    <Button label="Shows" onClick={() => switchTabs('tab3')} />
                   
                </div>
                <div className={styles.content}>
                    {activeTab == 'tab1' && (
                        <AllMovies />
                    )}

                    {activeTab == 'tab2' && (
                        <AllTheater />
                    )}

                    {activeTab == 'tab3' && (
                        <AddShows />
                    )}

              
                </div>
            </div>
        </div>
    )
}

export default Dashboard