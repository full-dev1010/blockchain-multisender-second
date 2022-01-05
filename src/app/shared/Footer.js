import React, { Component } from 'react';
// import { Trans } from 'react-i18next';
import logo from '../../assets/new_images/images/logo2.png';

class Footer extends Component {
  render () {
    return (
      // <footer className="footer">
      //   <div className="container-fluid">
      //     <div className="d-sm-flex justify-content-center justify-content-sm-between w-100">
      //       <img className="footer-logo" src={require('../../assets/images/logo-mini.png')} alt="footer-logo" />
      //       <ul className="footer-list"> 
      //         <li>Terms and Conditions</li>
      //         <li>Privacy Policy</li>
      //         <li>Documentation</li>
      //         <li>Audits</li>
      //       </ul>
      //     </div>
      //   </div>
      // </footer>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo"><img src={logo} alt="footer-logo" className="" /></div>
          <div className="footer-items">
            <div className="terms-and-conditions">&#8226; Terms and Conditions</div>
            <div className="privacy">&#8226; Privacy Podivcy</div>
            <div className="documentation">&#8226; Documentation</div>
            <div className="aut">&#8226; Audits</div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;