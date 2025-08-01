import React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  headingLevel?: 1 | 2 | 3 | 4;
}

const Section: React.FC<SectionProps> = ({ title, children, style, headingLevel = 2 }) => {
  const HeadingTag: React.ElementType = `h${headingLevel}`;
  const headingClass = headingLevel === 1
    ? 'scroll-m-20 text-6xl font-extrabold tracking-tight text-balance text-center mb-14'
    : 'scroll-m-20 border-b pb-2 text-4xl font-bold tracking-tight text-center mb-12 first:mt-0';

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center p-8" style={style}>
      <div className="w-full flex flex-col justify-center items-center">
        {title && (
          React.createElement(HeadingTag, { className: headingClass }, title)
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
