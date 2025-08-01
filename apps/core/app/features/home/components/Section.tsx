
import React from 'react';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="h-screen w-full flex flex-col justify-center items-center p-8">
      <div className="w-full flex flex-col justify-center items-center">
        {title && (
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 text-center tracking-wide"
                style={{ textShadow: '0 0 10px rgba(173, 216, 230, 0.5), 0 0 20px rgba(173, 216, 230, 0.3)'}}>
                {title}
            </h2>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
