import Footer from "@/components/footer";
import HeaderFour from "@/components/header/headerFour";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderFour />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
