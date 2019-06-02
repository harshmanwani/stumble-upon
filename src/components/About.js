import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../assets/profile-img.jpg';

const About = () => (
    <div className="about">
        <div>
            Stumble upon cool websites and useful links submitted by other users. <br/>
            You can also&nbsp;
            <span className="underline-fill">
                <Link to="/login">
                    Sign Up
                </Link>
            </span> 
            &nbsp;and submit one.
        </div>
        <br/>
        <div>
            This is just a hobby project made with 
            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                <span className="react underline-fill"><i className="fab fa-react"></i>&nbsp;React</span>
            </a>
            &amp; 
            <a href="https://graphql.org/" target="_blank" rel="noopener noreferrer">
                <span className="graphql underline-fill">GraphQL</span>
            </a>
            .<br/>
            If you also want to contribute, join this open github repository.
            <div className="git-repo highlight">
                <a href="https://github.com/harshmanwani/stumble-upon" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                    <strong>{`  Github repository`}</strong>
                </a>
            </div>
        </div>
        <div className="profile">
            <div className="img">
                <img src={ProfileImg} alt="Harsh Manwani"/>
            </div>
            <h4>Harsh Manwani</h4>
            <div className="links">
                <a href="https://www.linkedin.com/in/harshmanwani/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin highlight"></i>
                </a>
                <a href="https://github.com/harshmanwani" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github highlight"></i>
                </a>
                <a href="https://instagram.com/invokerharsh" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram highlight"></i>
                </a>
                <a href="https://twitter.com/invokerharsh" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter highlight"></i>
                </a>
                <a href="https://facebook.com/harshmanwani" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f highlight"></i>
                </a>
            </div>
        </div>
    </div>
)

export default About;