
import React, { useEffect, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import Future from '../assets/future.png'
import newsData from '@/data/newsData';
import { Link, useNavigate } from 'react-router-dom';

const News = () => {
  const navigate = useNavigate();

  const [visibleNewsCount, setVisibleNewsCount] = useState(6); // show 3 news first

  const handleLoadMore = () => {
    setVisibleNewsCount((prev) => prev + 3); // load 3 more each time
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16 text-center">
        <AnimatedSection>
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">News</h2>
            <p className="text-black dark:text-white max-w-xl mx-auto mb-12">
             Sunt autem nusquam hoc epicurus in gravissimo bello animadversionis metu degendae praesidia firmissima.
            </p>
        </AnimatedSection>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-[89%] mx-auto px-6">
          {newsData.slice(0, visibleNewsCount).map((news) => (
            <div
              key={news.id}
              className="rounded-sm border-1 overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              onClick={() => navigate(`/news/${news.id}`)}
            >
              <div className="relative  h-56">
                <img
                  src={Future}
                  alt={news.title}
                  className="w-full h-full object-fit"
                />
                </div>
                <div className="p-6 text-left">
                <p className="text-sm text-gray-400 mb-2">{news.date}</p>
                <h3 className="text-lg font-semibold text-gray-800">{news.title}</h3>
                </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleNewsCount < newsData.length && (
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
