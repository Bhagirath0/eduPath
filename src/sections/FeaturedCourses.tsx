import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '@/services';
import type { Course } from '@/types';
import { DOMAIN_COLORS } from '@/utils';

const DIFFICULTY_BADGE: Record<string, string> = {
  Beginner: 'badge badge-green',
  Intermediate: 'badge badge-yellow',
  Advanced: 'badge badge-red',
};

export default function FeaturedCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    courseService.getCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="section-padding bg-surface-primary">
      <div className="container-content">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">COURSES</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
            Start Learning Today
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Structured courses across six technical domains, designed for
            complete beginners to intermediate learners.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {courses.map((course) => {
              const domainColor =
                DOMAIN_COLORS[course.domain as keyof typeof DOMAIN_COLORS] ??
                '#6B7280';
              const skills = course.skillsCovered || course.skills || [];
              const extraSkills = skills.length - 3;
              return (
                <div
                  key={course.id}
                  className="bg-[#121620] rounded-card border border-white/10 shadow-lg hover:border-brand-blue/50 hover:shadow-brand-blue/10 transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Color strip */}
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: domainColor }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="badge badge-blue">{course.domain}</span>
                      <span
                        className={
                          DIFFICULTY_BADGE[course.difficulty] ??
                          'badge badge-gray'
                        }
                      >
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-lg text-text-primary mb-1">
                      {course.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-text-secondary text-sm line-clamp-2 mb-3">
                      {course.tagline}
                    </p>

                    {/* Duration */}
                    <p className="text-xs text-text-muted mb-4">
                      {course.durationWeeks} weeks &middot; {course.estimatedHours} hrs
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-5">
                      {skills.slice(0, 3).map((skill: string) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-gray-300 text-xs border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                      {extraSkills > 0 && (
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs border border-white/10">
                          +{extraSkills} more
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <button
                        onClick={() => navigate(`/courses/${course.slug}`)}
                        className="w-full py-2.5 rounded-lg border border-white/10 bg-white/5 text-white font-medium text-sm hover:bg-brand-blue hover:border-brand-blue transition-all duration-200"
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View all */}
        <div className="text-center">
          <a
            href="/courses"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold text-sm hover:opacity-90 transition-all duration-200"
          >
            View All Courses
          </a>
        </div>
      </div>
    </section>
  );
}
