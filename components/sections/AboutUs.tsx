import Image from "next/image";
import React from "react";

function AboutUs() {
  return (
    <div id="about" className="about-us bg-gray-50 select-none">
      <div className="container mx-auto py-16 px-6 md:px-12">
        {/* Top Row: Heading + Image */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Left: Heading */}
          <div className="flex-1 max-w-sm">
            <p className="text-red-600 font-semibold text-sm mb-3">
              How It Started
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Next Generation <span className="text-red-600">Digital Security Solutions</span> for a Safer Tomorrow
            </h1>
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-end w-full">
            <div className="rounded-2xl overflow-hidden bg-blue-100 w-full md:max-w-lg h-72 md:h-96 relative">
              <Image
                src="/images/general/get-in-touch.png"
                alt="About us"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Description + Stats */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Left: Description */}
          <div className="flex-1 max-w-sm">
            <p className="text-gray-500 text-sm leading-relaxed">
              Here at Digital Security Solutions, we are committed to providing cutting-edge security measures to protect you and your assets. With our innovative approach and expert team, we ensure that your security needs are met with the highest standards.
            </p>
          </div>

          {/* Right: Stats Grid */}
          <div className="flex-1 max-w-sm">
            <div className="bg-white rounded-2xl shadow-sm p-6 grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-extrabold text-red-600">3.5</p>
                <p className="text-gray-500 text-sm mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-red-600">23</p>
                <p className="text-gray-500 text-sm mt-1">Project Challenge</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-red-600">830+</p>
                <p className="text-gray-500 text-sm mt-1">Positive Reviews</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-red-600">100K</p>
                <p className="text-gray-500 text-sm mt-1">Trusted Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;