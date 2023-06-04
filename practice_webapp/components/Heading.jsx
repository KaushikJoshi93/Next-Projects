'use client';

import { useEffect, useState } from "react";

const Heading = (props) => {
    const [counter , setCounter] = useState(0);
    useEffect(()=>console.log(props),[])
  return (
    <div>This is a client component and it will render on client side . Counter value is <span onClick={() => setCounter((prev)=>++prev)}>{counter}</span></div>
  )
}

export default Heading