import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import WhyChooseUs from "./WhyChooseUs";
import HomeServices from "./HomeServices";
import Testimonial from "./Testimonial";

async function fetchWithRetry(url, retries = 3, delay = 300) {
  try {
    const res = await fetch(url);

    // If Vercel cold start returns 404 or 500 — retry
    if (!res.ok) {
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, delay));
        return fetchWithRetry(url, retries - 1, delay);
      }
      throw new Error(`Failed to fetch: ${url}`);
    }

    return await res.json();
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return fetchWithRetry(url, retries - 1, delay);
    }
    throw err;
  }
}

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "HomeHero";

    const loadData = async () => {
      try {
        const [servicesData, testimonialsData] = await Promise.all([
          fetchWithRetry("https://home-hero-server-zeta.vercel.app/services"),
          fetchWithRetry(
            "https://home-hero-server-zeta.vercel.app/testimonials"
          ),
        ]);

        setServices(servicesData.slice(0, 6));
        setTestimonials(testimonialsData);
      } catch (err) {
        console.error("Home page load error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center h-[50vh] items-center">
        <span className="loading loading-spinner text-accent text-3xl"></span>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <>
      <Slider />
      <WhyChooseUs />
      <HomeServices services={services} />
      <Testimonial testimonials={testimonials} />
    </>
  );
};

export default Home;
