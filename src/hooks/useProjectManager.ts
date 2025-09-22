import { useState, useCallback } from 'react';

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  images: string[];
  tools: string[];
  description: string;
  concept: string;
  designStory?: string;
}

export const useProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Brand Identity - Eco Cafe",
      thumbnail: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=1200&q=80",
        "https://images.unsplash.com/photo-1583623733044-f9a7d2b4be0a?w=1200&q=80",
      ],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
      description: "Complete brand identity design for an eco-friendly coffee shop.",
      concept: "The concept focused on sustainability and organic elements while maintaining a modern, clean aesthetic.",
      designStory: "This project began with extensive research into sustainable design practices."
    },
    {
      id: "2",
      title: "Mobile App UI Design",
      thumbnail: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&q=80",
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&q=80",
      ],
      tools: ["Figma", "Adobe XD", "Sketch"],
      description: "UI/UX design for a fitness tracking mobile application.",
      concept: "Created an intuitive interface that motivates users through gamification elements.",
      designStory: "The design process involved extensive user research and iterative prototyping."
    }
  ]);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects(prev => [newProject, ...prev]);
    return newProject;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updates } : project
      )
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  }, []);

  const getProject = useCallback((id: string) => {
    return projects.find(project => project.id === id);
  }, [projects]);

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProject,
  };
};