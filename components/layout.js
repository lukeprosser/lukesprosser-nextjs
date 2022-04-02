import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className='container'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
