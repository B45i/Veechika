import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div>
                <h2>വീചിക</h2>
                <p className="app-subtitle">Online Malayalam Radio</p>
            </div>
            <a
                href="https://bit.ly/veechika"
                target="_blank"
                rel="noopener noreferrer"
            >
                Feedback
            </a>
        </nav>
    );
};

export default Navbar;
