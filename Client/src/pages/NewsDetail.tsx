import { useNavigate, useParams } from "react-router-dom";
import newsData from "@/data/newsData";
import Navbar from "@/components/layout/Navbar";
import Future from '../assets/future.png'
import { useState } from "react";

export default function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((n) => n.id === Number(id));

  const [visibleNewsCount, setVisibleNewsCount] = useState(6); // show 3 news first
  
    const handleLoadMore = () => {
      setVisibleNewsCount((prev) => prev + 3); // load 3 more each time
    };

  if (!news) return <div>News not found</div>;

  return (
    <section className="py-16 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
        <img src={Future} alt={news.title} className="w-full shadow-lg rounded-lg mb-6" />
        <p className="text-gray-800 mb-8">{news.date}</p>
        <p className="text-gray-400">{news.description}</p>
      </div>
      <div className="grid gap-8 grid-cols-1 mt-20 md:grid-cols-3 max-w-[89%] mx-auto px-6">
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
                    <div className="mt-12 text-center">
                      <button
                        onClick={handleLoadMore}
                        className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full transition"
                      >
                        See More →
                      </button>
                    </div>
                  )}
    </section>
  );
}
