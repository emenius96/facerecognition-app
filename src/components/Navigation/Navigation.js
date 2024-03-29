import React from 'react';



const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn) {
        return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick = {() => onRouteChange('signout')} className ='f3 link dim white underline pa3 pointer'>Sign Out</p>
                </nav>
        );
    } 
}

export default Navigation;