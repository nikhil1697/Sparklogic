import React from 'react';
import { Briefcase, Users, Award, Rocket } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Briefcase className="h-8 w-8 text-blue-400" />,
              title: "Placement Assistance",
              desc: "Dedicated support to help you land your dream job with mock interviews and resume building."
            },
            {
              icon: <Users className="h-8 w-8 text-purple-400" />,
              title: "Expert Mentors",
              desc: "Learn from industry professionals who are currently working in top MNCs."
            },
            {
              icon: <Rocket className="h-8 w-8 text-orange-400" />,
              title: "Hands-on Projects",
              desc: "Don't just watch videos. Build real-world projects that you can showcase on GitHub."
            },
            {
              icon: <Award className="h-8 w-8 text-green-400" />,
              title: "Certification",
              desc: "Earn a certificate of completion that validates your skills to future employers."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-slate-900 p-6 rounded-xl border border-slate-800 hover:border-blue-500/20 transition-all">
              <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;