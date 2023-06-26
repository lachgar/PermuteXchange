import React from 'react';
import {  FaAddressCard, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f7f7f7', padding: '20px', marginTop: '50px' }}>
      
      <div style={{ backgroundColor: '#ebebeb', padding: '10px 0', marginTop: '20px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>&copy; {new Date().getFullYear()}. Tous droits réservés. Développé par Pr. Mohamed LACHGAR (<FaWhatsapp size={20} color="#25D366" /> +212 708 193 797 - <FaAddressCard size={20} color="#25D366" /> lachgar.m@ucd.ac.ma)</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
