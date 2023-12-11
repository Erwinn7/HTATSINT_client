// les imports neccessaire pour faire mnon loader customizer

import React from 'react';
import { Oval, Watch, ThreeDots } from 'react-loader-spinner';
//import CustomLoader from 'components/CustomLoader/CustomLoader';

function CustomLoader  (){
 return (
    <ThreeDots 
    height="80" 
    width="80" 
    radius="9"
    color="#4fa94d" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={true}
     />
 )
}
export default CustomLoader;