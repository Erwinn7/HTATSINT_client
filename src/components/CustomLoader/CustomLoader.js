// les imports neccessaire pour faire mnon loader customizer

import React from 'react';
import { Oval, Watch, ThreeDots } from 'react-loader-spinner';
//import CustomLoader from 'components/CustomLoader/CustomLoader';

function CustomLoader  (){
 return (
    <ThreeDots 
    height="80" 
    width="50" 
    radius="9"
    color="black" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName="  "
    visible={true}
    //#4fa94d
     />
 )
}
export default CustomLoader;