import {Link} from 'react-router-dom';
import logo from '../assets/images/home-icon.png';
const Footer = () => {
    return (
        <div>
            <footer style={{display: "flex"}}>
                <Link to="/"><img src={logo} alt="logo-home" style={{width: "40px", height: "40px", cursor: "pointer"}} /></Link>    
                <p style={{marginTop: "20px", marginLeft: "10px"}}>&copy; {new Date().getFullYear()} Practice Website </p>
            </footer>
        </div>
    );
}

export default Footer;