import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Layout.css';

export default function Layout({ children }) {
    return (
        <div>
            <div className='layout-container'>
                <Header />
            </div>
            {children}
            <Footer />
        </div>
    )
}