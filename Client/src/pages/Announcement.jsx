import React, { useEffect, useState } from 'react'
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AnimatedSection from '../components/ui/AnimatedSection';
import axios from 'axios';

const Announcement = () => {
    const [visibleNewsCount, setVisibleNewsCount] = useState(6);
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/all_updates");
                setData(response.data.data);

            } catch (error) {

                console.error('Error fetching updates:', error);

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
                    <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">Announcements</h2>
                    <p className="text-black dark:text-white max-w-xl mx-auto mb-12">
                        Sunt autem nusquam hoc epicurus in gravissimo bello animadversionis metu degendae praesidia firmissima.
                    </p>
                </AnimatedSection>
                <div className="grid gap-8 grid-cols-3 md:grid-cols-3 max-w-[90%] mx-auto px-6 container">
                    {data.map((item) => {
                        const isExpanded = expandedItems[item._id];
                        const description = item.description;
                        const shortText = description.length > 150 ? description.slice(0, 150) + "..." : description;
                        return (
                            <div
                                key={item._id}
                                className="group w-auto transition-all duration-300 ease-in-out p-6 mb-6 dark:bg-gray-900 dark:text-gray-100 rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-start justify-between"
                            >
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                    {item.title}
                                </h1>
                                <p className="text-sm text-gray-800 mb-2">{new Date(item.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                                <p className="text-gray-600 text-left dark:text-gray-300 leading-relaxed">
                                    {isExpanded ? description : shortText}
                                </p>
                                {description.length > 150 && (
                                    <button
                                        onClick={() => toggleExpand(item._id)}
                                        className="mt-2 text-sm  text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                                    >
                                        {isExpanded ? 'Show Less' : 'Show More'}
                                    </button>

                                )}
                                <p className="text-sm text-grey-600 text-left  mt-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-2 hover:border-gray-600 hover:cursor-pointer rounded-lg">
                                    # {item.type}
                                </p>
                            </div>
                        )

                    })}
                </div>
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
    )
}

export default Announcement
