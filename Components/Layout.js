// Importing the 'Footer' and 'NavBar' components
import Footer from "./Footer";
import NavBar from "./NavBar";

// Functional component 'Layout' for creating a consistent layout structure
const Layout = ({ children }) => {
    return (
        <div>
            {/* Navigation bar component */}
            <NavBar />

            {/* Content passed as children */}
            {children}

            {/* Footer component */}
            <Footer />
        </div>
    );
};

// Exporting the 'Layout' component
export default Layout;
