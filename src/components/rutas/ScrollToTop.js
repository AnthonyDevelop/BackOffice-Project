import React from "react";
import { useLayoutEffect } from 'react'
import { useLocation } from "react-router";

const ScrollToTop = (props) => {

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }, [location]);

  return <>{
        props.children
    }</>
};

export default ScrollToTop;