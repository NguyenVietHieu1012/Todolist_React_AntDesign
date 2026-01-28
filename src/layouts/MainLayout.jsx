import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({children}) => {
    return (
        <div className="app-container" style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <Header/>
            <main className="content" style={{flex: "1"}}>{children}</main>
            <Footer/>
        </div>
    );
}

export default MainLayout;