import { useState } from 'react';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import ScrollToTop from '~/ScrollToTop';

function DefaultLayout({ children }) {
    return (
        <>
            <ScrollToTop />
            <Header />
            <div className="Container">{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
