import React from 'react';
import sara from '../assets/sara.jpeg';
import antonia from '../assets/Antonia.jpeg';
import linkedin from '../assets/linkedinlogo.png';
import github from '../assets/githublogo.png';
import '../styling/Contact.css';

export const Contact = () => {
  return (
    <div className="wider-contact-div">
      <div className="contact-sara">
        <div className="profile-pic">
          <img src={sara} className="contact-logo" alt="link to Sara's portfolio" />
          <a
            href="https://portfolio-sara-battilotti.netlify.app/"
            target="_blank"
            rel="noreferrer">
            <p>Sara Battilotti </p>
          </a>
        </div>
        <div className="links">
          <a
            href="https://www.linkedin.com/in/sarabattilotti/"
            target="_blank"
            rel="noreferrer"><img src={linkedin} className="contact-logo" alt="link to Sara's LinkedIn" />
          </a>
          <a
            href="https://github.com/SaraBat"
            target="_blank"
            rel="noreferrer"><img src={github} className="contact-logo" alt="link to Sara's GitHub" />
          </a>
        </div>
      </div>
      <div className="contact-antonia">
        <div className="profile-pic">
          <img src={antonia} className="contact-logo" alt="link to Antonia's portfolio" />
          <a
            href="https://antoniagranit.netlify.app/"
            target="_blank"
            rel="noreferrer">
            <p> Antonia Granit </p>
          </a>
        </div>
        <div className="links">
          <a
            href="https://www.linkedin.com/in/antoniagranit/"
            target="_blank"
            rel="noreferrer"><img src={linkedin} className="contact-logo" alt="link to Antonia's LinkedIn" />
          </a>
          <a
            href="https://github.com/AntoniaGranit"
            target="_blank"
            rel="noreferrer"><img src={github} className="contact-logo" alt="link to Antonia's GitHub" />
          </a>
        </div>
      </div>
    </div>
  )
}