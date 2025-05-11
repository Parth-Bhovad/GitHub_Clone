//importing custom css
import "../styles/dashboard.css"

//importing components
import LeftAside from "./LeftAside";
import MainSection from "./MainSection";
import RightAside from "./RightAside";

function Dashboard() {
    return (
        <>
            <section id="dashboard">
                <LeftAside />
                <MainSection />
                <RightAside />
            </section>
        </>
    );
}

export default Dashboard;