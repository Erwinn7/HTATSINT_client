import React from 'react';

const ModalsNoRecFound = ({ text }) => {

    const styles = {
          message: {
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Ombre légère
        },
    };


  return (
      <div style={styles.message} className='text-center' >{text}</div>
  );
};



export default ModalsNoRecFound;
