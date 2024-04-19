import "./header.css"
import logo from '../logo.png';
import profile from '../profile.jpg';

export default function HeaderComponent() {
    return (
        <>
            <div className='header'>
                <span className='logo-span'>
                    <img className='logo' src={logo} alt='Logo here' />
                </span>
                <span className='profile'>
                    <img className='logo' src={profile} alt='profile here' />
                </span>
            </div>
        </>
    )
}