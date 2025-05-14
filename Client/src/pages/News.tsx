import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import Future from '../assets/future.png'
// import newsData from '@/data/newsData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const News = () => {
  const navigate = useNavigate();
  const [visibleNewsCount, setVisibleNewsCount] = useState(6); 
  const [data, setData] = useState([]);

  const handleLoadMore = () => {
    setVisibleNewsCount((prev) => prev + 3); // load 3 more each time
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get("http://localhost:5000/api/all_events");
        setData(response.data.data);

      } catch (error) {

        console.error('Error fetching stories:', error);

      }
    };
    window.scrollTo(0, 0);
    fetchData()
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16 text-center">
        <AnimatedSection>
          <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">Events</h2>
          <p className="text-black dark:text-white max-w-xl mx-auto mb-12">
            Sunt autem nusquam hoc epicurus in gravissimo bello animadversionis metu degendae praesidia firmissima.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 cursor-pointer max-w-[89%] mx-auto px-6">
          {data && data.slice(0, visibleNewsCount).map((news) => (
            <div
              key={news.id}
              className="rounded-sm border-1 overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              onClick={() => navigate(`/news/${news._id}`)}
            >
              <div className="relative h-[300px]">
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-full object-fit"
                />
              </div>
              <div className="p-6 text-left">
                <p className="text-sm text-black dark:text-white mb-2">{new Date(news.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <h3 className="text-lg font-semibold text-black dark:text-white uppercase">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>

          {/* Load More Button */}
          {visibleNewsCount < data.length && (
            <div className="mt-12">
              <button
                onClick={handleLoadMore}
                className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full transition"
              >
                See More →
              </button>
            </div>
          )}

      </section>

      <Footer />
    </div>
  );
};

export default News;