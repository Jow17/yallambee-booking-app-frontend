import { useState } from "react"
import  styles from "../styles/Header.module.css"
import { Link } from "react-router-dom"

function Header() {
    // adding the states 
    const [isActive, setIsActive] = useState(false);
    //add the active class
    const toggleActiveClass = () => {
      setIsActive(!isActive);
    };
    //clean up function to remove the active class
    const removeActive = () => {
      setIsActive(false)
    }
    return (
      <div className="App">
        <header className="App-header">
          <nav className={`${styles.navbar}`}>
            <Link to="/" className={styles.logo}>
            <img src={"/Logo.png"} alt="Logo" className={styles.logoImage} />
            </Link>
            <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
              <li onClick={removeActive}>
                <Link className={`${styles.logo}`} to="/"> 
                    Home 
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link className={`${styles.logo}`} to="/property-listing"> 
                    Properties 
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link className={`${styles.logo}`} to="/booking"> 
                    Bookings 
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link className={`${styles.logo}`} to="/profile"> 
                    Profile 
                </Link>
              </li>
              <li onClick={removeActive}>
                <Link className={`${styles.logo}`} to="/admin">
                    Admin Dashboard 
                </Link>
              </li>
            </ul>
            <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
            </div>
          </nav>
        </header>
      </div>
    );
  }
  export default Header