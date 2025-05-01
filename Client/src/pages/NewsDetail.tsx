import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Future from '../assets/future.png'
import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import NotFound from "./NotFound";

interface NewsItem {
  id: number;
  title: string;
  createdAt: string;
  imageUrl: string;
  description: string;
}

export default function NewsDetailPage() {
  const { id } = useParams();
  console.log("News id from Url",id);
  const navigate = useNavigate();

  const [data, setData] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/single_event/${id}`);
        setData(response.data);
        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!data) return <NotFound />

  return (
    <section className="py-16 px-6">
      <Navbar />
      <div className="max-w-4xl mt-10 mb-20 mx-auto">
        <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
        <img src={Future} alt={data.title} className="w-full rounded-lg mb-6" />
        <p className="text-sm text-gray-800 mb-2">{new Date(data.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
        <p className="text-gray-700">{data.description}</p>
       
      </div>
      <Footer />
    </section>
  );
}
