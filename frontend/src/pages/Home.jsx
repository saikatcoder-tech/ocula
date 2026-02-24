import React, { useEffect, useState } from "react";
import api from "../utils/api";

const Home = () => {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchGenerations();
  }, []);

  const fetchGenerations = async () => {
    try {
      const response = await api.get("/api/generation/my");
      setGenerations(response.data.generations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 md:px-20 py-16">
      
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-[#00F5FF] via-[#7C3AED] to-[#FF00E5] bg-clip-text text-transparent">
            AI Architecture Generations
          </span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl">
          Explore structured AI system blueprints generated for scalable,
          production-grade platforms.
        </p>
      </div>

      {/* Loading / Empty */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : generations.length === 0 ? (
        <p className="text-gray-500">No generations available.</p>
      ) : (
        <div className="space-y-8">
          {generations.map((item, index) => {
            const data =
              typeof item.aiResponse === "string"
                ? JSON.parse(item.aiResponse)
                : item.aiResponse;

            return (
              <div
                key={item._id}
                className="bg-[#111827] border border-white/10 rounded-2xl transition duration-300"
              >
                {/* Card Header */}
                <div
                  onClick={() => toggleCard(index)}
                  className="cursor-pointer p-6 flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      Generation #{generations.length - index}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {item.inputText}
                    </p>
                  </div>

                  <div className="text-[#00F5FF] text-xl">
                    {openIndex === index ? "−" : "+"}
                  </div>
                </div>

                {/* Expandable Content */}
                {openIndex === index && (
                  <div className="px-6 pb-8 space-y-10 border-t border-white/10 pt-8">
                    {Object.entries(data).map(([sectionKey, section]) => (
                      <div key={sectionKey}>
                        <h3 className="text-md font-semibold mb-2 capitalize text-[#7C3AED]">
                          {sectionKey.replace(/([A-Z])/g, " $1")}
                        </h3>

                        <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                          {section.summary}
                        </p>

                        <ul className="space-y-2 text-sm text-gray-300">
                          {section.bullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="pl-4 border-l-2 border-[#00F5FF]/40"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;