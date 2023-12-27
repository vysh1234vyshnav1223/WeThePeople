import { Link, useLocation } from 'react-router-dom';
import './AccountNav.css';

export default function AccountNav() {

    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[1];

    if (subpage === undefined) {
        subpage = 'profile';
    }

    function linkClasses(type = null) {
        let classes = 'nav-option';
        if (type === subpage) {
            classes += ' active';
        } else {
            classes += ' inactive';
        }

        return classes;
    }

    return (
        <div>
            <nav className='account-nav'>
                <Link className={linkClasses('profile')} to={'/profile'}>
                    My Profile
                </Link>
                <Link className={linkClasses('projects')} to={'/projects'}>
                    My Projects
                </Link>
                <Link className={linkClasses('backed-projects')} to={'/backed-projects'}>
                    Backed Projects
                </Link>
            </nav>
        </div>
    );
}