import styles from "./footer.module.css";
import logo from "../../../../public/images/eaglecollectionslogo.png";
import Link from "next/link";
import Image from "next/image";
import {
  FaPhone,
  FaHome,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaTiktok,
  FaSnapchat,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link href="">
          <Image src={logo} alt="eagle collections logo" width="160" />
        </Link>
      </div>

      <div>
        <h2 className={styles.heading}>Contact Us</h2>
        <div className={styles.footercotainer}>
          <span className={styles.span}>
            <FaPhone className={styles.icon} />
            <p>210-310-9644</p>
          </span>

          <span className={styles.span}>
            <FaHome className={styles.icon} />
            <p>11329 Bissonnet Street</p>
            <p>Houston, Texas 77099</p>
          </span>

          <span className={styles.span}>
            <p>Visit our social media</p>
            <div className={styles.social}>
              <Link className={styles.instagram} href="">
                <FaInstagram />
              </Link>
              <Link className={styles.whatsapp} href="">
                <FaWhatsapp />
              </Link>
              <Link href="">
                <FaFacebook className={styles.facebook} />
              </Link>
              <Link className={styles.icon} href="">
                <FaTiktok />
              </Link>
              <Link href="">
                <FaSnapchat className={styles.snapchat} />
              </Link>
              <Link className={styles.icon} href="">
                <FaEnvelope />
              </Link>
            </div>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
