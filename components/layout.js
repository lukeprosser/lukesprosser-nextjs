import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div className='max-w-lg px-10 mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
