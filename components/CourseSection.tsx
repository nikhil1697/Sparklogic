import React from 'react';
import { COURSES } from '../constants';
import { CheckCircle2, Server, Layout } from 'lucide-react';

const CourseSection: React.FC = () => {
  return (
    <section id="courses" className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Premium Courses</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Industry-aligned curriculum designed by experts to make you job-ready from day one.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {COURSES.map((course) => (
            <div key={course.id} className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden flex flex-col hover:border-blue-500/30 transition-all duration-300">
              <div className="p-8 pb-0">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl ${course.id === 'devops' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    {course.id === 'devops' ? <Server size={32} /> : <Layout size={32} />}
                  </div>
                  <span className="text-slate-400 text-sm font-medium border border-slate-700 px-3 py-1 rounded-full">
                    {course.duration}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                <p className="text-slate-400 mb-8">{course.description}</p>
                
                <div className="space-y-6">
                  {course.modules.map((module, idx) => (
                    <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center mr-3 border border-slate-700">
                          {idx + 1}
                        </span>
                        {module.title}
                      </h4>
                      <div className="flex flex-wrap gap-2 pl-9">
                        {module.topics.map((topic, tIdx) => (
                          <span key={tIdx} className="inline-flex items-center text-xs font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded">
                            <CheckCircle2 size={12} className="mr-1 text-blue-500" />
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto p-8 pt-6">
                <button 
                   onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                   className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Get Syllabus & Fee Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;