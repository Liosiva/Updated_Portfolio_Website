"use client";

import React from "react";
import HeroSection from "../components/HeroSection";
import PortfolioGrid from "../components/PortfolioGrid";
import InstagramFeed from "../components/InstagramFeed";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Avatar } from "../components/ui/avatar";
import { AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Mail, Instagram, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-950"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Work</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore my portfolio of data analysis projects and visualizations
            </p>
          </div>
          <PortfolioGrid />
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <Avatar className="h-40 w-40 border-4 border-white dark:border-gray-800 shadow-lg">
                <AvatarImage
                  src="https://i.postimg.cc/K8hmsk4Z/download-1-s.jpg"
                  alt="Gatta Venkata Siva"
                />
                <AvatarFallback>GVS</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I'm Gatta Venkata Siva, a passionate data analyst with a
                keen eye for detail and a love for transforming raw data into
                meaningful insights. With expertise in data visualization, 
                statistical analysis, and business intelligence, I help 
                organizations make data-driven decisions.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                My approach combines analytical thinking with creative 
                visualization to deliver insights that not only reveal 
                patterns but also effectively communicate findings to 
                stakeholders and drive business growth.
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "SQL",
                    "Power BI",
                    "Excel",
                    "Machine Learning",
                    "Statistics"
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-lg italic text-teal-600 dark:text-teal-400">
                "Data tells a story - I help you understand it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto">
          <InstagramFeed 
            instagramUrl="https://www.instagram.com/liosiva_1006?igsh=MTRmNXI1bjU2anB4ZQ=="
          />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Contact Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
            Let's work together on your next project
          </p>

          <div className="text-center mb-8">
            <Button
              className="bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600 text-white px-8 py-3 mr-4"
              onClick={() => window.open('mailto:gattasiva12@gmail.com', '_blank')}
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Me
            </Button>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <Input id="name" placeholder="Your name" className="w-full" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project"
                className="w-full min-h-[150px]"
              />
            </div>
            <div className="text-center">
              <Button className="bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600 text-white px-8 py-2">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 dark:bg-black text-white text-center">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} Gatta Venkata Siva. All rights
            reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://www.instagram.com/liosiva_1006?igsh=MTRmNXI1bjU2anB4ZQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="mailto:gattasiva12@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/venkata-siva-gatta-a22503180/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}