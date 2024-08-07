// components/HeroSection.tsx
const HeroSection: React.FC = () => {
  return (
    <section
      className="relative w-full h-[500px] bg-cover bg-center"
      style={{ backgroundImage: "url(/img/DefaultPhoto.jpg)" }}
    >
      <div className="h-full flex flex-col justify-center items-center bg-black bg-opacity-50 text-white pt-16 px-4 md:px-16 lg:px-32">
        <h1 className="text-4xl font-bold">Enjoy Your Dream Vacation</h1>
        <p className="mt-4 text-lg">
          Plan and book our perfect trip with expert advice, travel tips,
          destination information, and inspiration from us
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
