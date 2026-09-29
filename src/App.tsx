import { Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home12Page from "@/pages/Home12Page";
import About3Page from "@/pages/About3Page";
import Portfolio1Page from "@/pages/Portfolio1Page";
import PortfolioDetails1Page from "@/pages/PortfolioDetails1Page";
import Archive3Page from "@/pages/Archive3Page";
import BlogDetailsPage from "@/pages/BlogDetailsPage";
import Contact1Page from "@/pages/Contact1Page";
import Contact2Page from "@/pages/Contact2Page";
import PricingPage from "@/pages/PricingPage";
import ManagePage from "@/pages/ManagePage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout headerStyle={1} footerStyle={7} />}>
        <Route path="/" element={<Home12Page />} />
        <Route path="/about-3" element={<About3Page />} />
        <Route path="/portfolio-1" element={<Portfolio1Page />} />
        <Route
          path="/portfolio-details-1"
          element={<PortfolioDetails1Page />}
        />
        <Route path="/archive-3" element={<Archive3Page />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact-1" element={<Contact1Page />} />
        <Route path="/contact-2" element={<Contact2Page />} />
      </Route>
      {/* Standalone Admin Dashboard Route (Headerless/Footerless Layout) */}
      <Route path="/manage" element={<ManagePage />} />
      <Route element={<MainLayout headerStyle={1} footerStyle={7} />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
