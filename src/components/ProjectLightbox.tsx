"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight, X, Edit } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

interface ProjectLightboxProps {
  isOpen?: boolean;
  onClose?: () => void;
  onEdit?: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    tools: string[];
    concept: string;
    designStory?: string;
    images: string[];
  };
}

export default function ProjectLightbox({
  isOpen = true,
  onClose = () => {},
  onEdit = () => {},
  project = {
    id: "1",
    title: "Brand Identity Design",
    description: "A complete brand identity design for a modern tech startup",
    tools: ["Photoshop", "Illustrator", "Figma"],
    concept:
      "The concept was to create a bold, memorable identity that reflects the company's innovative approach while maintaining simplicity and recognizability.",
    designStory:
      "This project began with extensive research into the client's industry and competitors. After multiple sketching sessions and concept development, we arrived at this final design that perfectly captures the essence of the brand.",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      "https://images.unsplash.com/photo-1600775508114-5c30cf941a2f?w=800&q=80",
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    ],
  },
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
    );
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-5xl w-full p-0 overflow-hidden">
        <div className="relative">
          {/* Header with Close and Edit buttons */}
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/10 hover:bg-black/20 text-white rounded-full"
              onClick={onEdit}
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/10 hover:bg-black/20 text-white rounded-full"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Image carousel */}
          <div className="relative w-full h-[400px] md:h-[500px] bg-black">
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} - image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Navigation arrows */}
            {project.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white rounded-full"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 text-white rounded-full"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </div>

          {/* Project details */}
          <div className="p-6 md:p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl font-bold">
                {project.title}
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 mt-2">
                {project.description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                TOOLS USED
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Concept</h3>
                <p className="text-gray-600">{project.concept}</p>
              </div>

              {project.designStory && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Design Story</h3>
                  <p className="text-gray-600">{project.designStory}</p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 mt-8 pt-4 border-t">
              <Button
                variant="outline"
                onClick={onEdit}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Project
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}