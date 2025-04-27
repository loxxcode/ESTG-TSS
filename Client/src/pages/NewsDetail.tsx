import { useParams } from "react-router-dom";
import newsData from "@/data/newsData";
import Navbar from "@/components/layout/Navbar";
import Future from '../assets/future.png'

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const news = newsData.find((n) => n.id === Number(id));

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
    </section>
  );
}
