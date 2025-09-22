import React, { useState } from "react";
import ProjectLightbox from "@/components/ProjectLightbox";
import { Button } from "@/components/ui/button";

export default function ProjectLightboxDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const sampleProject = {
    id: "1",
    title: "Brand Identity Design",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80"
    ],
    tools: ["Photoshop", "Illustrator", "Figma"],
    description: "A comprehensive brand identity project featuring logo design, color palette, and brand guidelines for a modern tech startup.",
    concept: "The concept revolves around minimalism and innovation, using clean lines and bold typography to convey trust and professionalism.",
    designStory: "This project began with extensive research into the client's industry and competitors. After multiple sketching sessions and concept development, we arrived at this final design that perfectly captures the essence of the brand."
  };

  return (
    <div className="bg-white min-h-screen p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Project Lightbox Demo</h1>
        <p className="text-gray-600 mb-6">Click the button to open the project lightbox</p>
        
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3"
        >
          Open Project Details
        </Button>

        <ProjectLightbox
          project={sampleProject}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}