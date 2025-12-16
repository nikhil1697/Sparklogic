import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-10 lg:mb-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
              <img 
                src="https://picsum.photos/seed/coding/800/600" 
                alt="Students learning" 
                className="relative rounded-2xl shadow-2xl w-full object-cover border border-slate-800"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Bridging the Gap Between <span className="text-blue-400">Talent</span> and <span className="text-purple-400">Opportunity</span></h2>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              At <strong>Spark Logic</strong>, we believe that practical skills are the currency of the future. 
              Our curriculum is not just about theory; it's about building, breaking, and fixing real systems.
            </p>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Whether you are looking to master the CI/CD pipelines of DevOps or the complex architectures of Full Stack development, 
              we provide the environment, mentorship, and placement support to get you there.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-3xl font-bold text-white mb-1">500+</h3>
                <p className="text-slate-500 text-sm">Students Placed</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
                <p className="text-slate-500 text-sm">Placement Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;