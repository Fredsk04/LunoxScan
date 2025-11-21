import { FaDiscord, FaInstagram, FaTiktok } from "react-icons/fa";
import "./styles/footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} LunoxScan. Tous droits réservés.</p>
        <div className="footer-links">
          <a 
            href="https://discord.gg/WeZP2kEBjB" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaDiscord />
          </a>
          <a 
            href="https://www.instagram.com/lunoxscan?igsh=MTFhY2g3N3dkcWJpbg=="
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
