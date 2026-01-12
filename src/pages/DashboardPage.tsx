import type { JSX } from "react";
import Services from "../components/Services";
import PromoSlider from "../components/PromoSlider";
import MainLayout from "../components/layout/MainLayout";

const Dashboard = (): JSX.Element => {
    return (
        <>
          <MainLayout>
            <Services/>
            <PromoSlider/>
          </MainLayout>
        </>
    )
}

export default Dashboard;