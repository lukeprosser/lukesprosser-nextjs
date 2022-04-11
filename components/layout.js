import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    // Force footer with 'flex flex-col h-screen'
    // Corresponding 'flex-grow' on <main> in global styles
    <div className='flex flex-col h-screen max-w-lg px-10 mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
