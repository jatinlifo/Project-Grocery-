import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Treanding from "../components/Treanding";
import Footer from "../components/Footer";


function Home() {

    return (
        <>
            <div className="">
                <Navbar />
                <Hero />
                <Treanding />
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default Home;