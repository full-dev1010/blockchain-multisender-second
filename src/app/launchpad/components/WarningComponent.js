import React, { Component } from 'react'

import { bounce, fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
    fadeIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
  }

const WarningCompolent = ({warningText}) => {
    return (
        <StyleRoot>
            <div className="div-warning" style={styles.fadeIn}>
                {warningText}
            </div>
        </StyleRoot>
    )
}

export default WarningCompolent;
