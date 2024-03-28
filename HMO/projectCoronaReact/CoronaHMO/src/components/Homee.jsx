import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './Home.css'; // קובץ CSS עבור עיצוב הרקעות
import MemberList from './MemberList';
export default function Home(){
  const scrollToBottom = () => {
    window.scrollTo({
      top: 750,
      behavior: 'smooth'
    });
  };
  return (
    <>
    
    <div>
      <div className="background-container">
        <div className="background-image top"></div>
        <button className="arrow-container" onClick={scrollToBottom}>
            <ArrowDownwardIcon className="arrow" sx={{ fontSize: 100 }} />
          </button>
      </div>
    </div>
    <MemberList/>
    </>
  );
}
