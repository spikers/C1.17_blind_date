import React from 'react';

const Container = () => {
  return(
    <div>
      <Nav />
      {props.children}
    </div>
  )
}

export default Container;