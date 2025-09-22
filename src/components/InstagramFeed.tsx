"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle, ExternalLink, Instagram } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  projectUrl?: string;
}

interface InstagramFeedProps {
  posts?: InstagramPost[];
  title?: string;
  subtitle?: string;
  instagramUrl?: string;
}

export default function InstagramFeed({
  posts = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      caption:
        "Data visualization dashboard showing sales trends and customer insights for Q4 analysis.",
      likes: 124,
      comments: 18,
      projectUrl: "/projects/sales-dashboard",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      caption:
        "Interactive Power BI report analyzing customer behavior patterns and market segmentation.",
      likes: 89,
      comments: 7,
      projectUrl: "/projects/customer-analysis",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      caption:
        "Python data analysis project revealing key insights from social media engagement metrics.",
      likes: 215,
      comments: 32,
      projectUrl: "/projects/social-analytics",
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80",
      caption:
        "Machine learning model for predictive analytics in retail forecasting and inventory optimization.",
      likes: 167,
      comments: 14,
      projectUrl: "/projects/ml-forecasting",
    },
    {
      id: "5",
      imageUrl:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
      caption:
        "Statistical analysis of healthcare data revealing treatment effectiveness and patient outcomes.",
      likes: 143,
      comments: 21,
      projectUrl: "/projects/healthcare-stats",
    },
    {
      id: "6",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      caption:
        "Financial data modeling and risk assessment dashboard for investment portfolio optimization.",
      likes: 178,
      comments: 26,
      projectUrl: "/projects/financial-modeling",
    },
  ],
  title = "Project Highlights",
  subtitle = "Selected works from my data analysis portfolio",
  instagramUrl = "https://www.instagram.com/liosiva_1006?igsh=MTRmNXI1bjU2anB4ZQ==",
}: InstagramFeedProps) {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <div
                  className="aspect-square w-full bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                  onClick={() => setSelectedPost(post)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-transparent"
                    onClick={() => setSelectedPost(post)}
                  >
                    <ExternalLink className="h-8 w-8" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm line-clamp-2 mb-3">{post.caption}</p>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs p-0 h-auto hover:bg-transparent hover:text-pink-500"
                    onClick={() => setSelectedPost(post)}
                  >
                    View Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-gradient-to-r from-pink-500 to-teal-400 hover:from-pink-600 hover:to-teal-500 text-white"
            onClick={() => window.open(instagramUrl, "_blank")}
          >
            <Instagram className="mr-2 h-5 w-5" />
            Follow me on Instagram
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        {selectedPost && (
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">Project Details</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                From my data analysis portfolio
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-square w-full bg-cover bg-center rounded-md overflow-hidden">
                <img
                  src={selectedPost.imageUrl}
                  alt="Project"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-base mb-4">{selectedPost.caption}</p>
                <div className="flex items-center space-x-4 mb-6 text-gray-500">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{selectedPost.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{selectedPost.comments}</span>
                  </div>
                </div>
                {selectedPost.projectUrl && (
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-teal-400 hover:from-pink-600 hover:to-teal-500 text-white"
                    onClick={() =>
                      (window.location.href = selectedPost.projectUrl || "#")
                    }
                  >
                    View Full Project
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}