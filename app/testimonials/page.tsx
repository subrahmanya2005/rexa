'use client';

import React from 'react';

type Testimonial = {
  name: string;
  location: string;
  feedback: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: 'Rahul',
    location: 'Puttur',
    feedback:
      'Rexa is the best shop in Puttur for branded shoes. I don’t need to travel to the city anymore!',
    rating: 5,
  },
  {
    name: 'Ashith',
    location: 'Uppinangady',
    feedback:
      'Whenever I need new clothing or accessories, Rexa in Puttur is my first stop. Genuine quality and good prices.',
    rating: 4,
  },
  {
    name: 'Sandeep',
    location: 'Sullia',
    feedback:
      'Finally, a shop in Puttur with original branded sneakers. I bought mine from Rexa, super comfortable!',
    rating: 5,
  },
  {
    name: 'Mohammed Irfan',
    location: 'Kabaka',
    feedback:
      'Shopping in Rexa feels easy—no online delivery needed. I can try outfits right here in Puttur and pick the best fit.',
    rating: 4,
  },
  {
    name: 'Darshan',
    location: 'Puttur Town',
    feedback:
      'The fragrance collection at Rexa is amazing. Now Puttur has its own branded store!',
    rating: 5,
  },
  {
    name: 'Ashwin Kumar',
    location: 'Nekkilady',
    feedback:
      'Great staff and latest fashion. Rexa has made branded shopping convenient for everyone in Puttur.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const defaultAvatar = 'https://www.gravatar.com/avatar/?d=mp&s=100';

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          What People Are Saying
        </h2>

        {/* Responsive grid instead of flex */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full border-2 border-indigo-500"
                  src={defaultAvatar}
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className={`w-4 h-4 ${
                          starIndex < testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.342 4.124a1 1 0 00.95.69h4.332c.969 0 1.371 1.24.588 1.81l-3.505 2.544a1 1 0 00-.364 1.118l1.342 4.123c.3.922-.755 1.688-1.54 1.118L10 14.347l-3.505 2.544c-.784.57-1.838-.196-1.54-1.118l1.342-4.123a1 1 0 00-.364-1.118L2.428 9.551c-.783-.57-.38-1.81.588-1.81h4.332a1 1 0 00.95-.69l1.342-4.124z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
