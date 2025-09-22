"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, Plus, Edit, Trash2 } from "lucide-react";
import ProjectLightbox from "./ProjectLightbox";
import ProjectForm from "./ProjectForm";
import { useProjectManager, Project } from "../hooks/useProjectManager";

export default function PortfolioGrid() {
  const { projects, addProject, updateProject, deleteProject } = useProjectManager();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const openLightbox = (project: Project) => {
    setSelectedProject(project);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const openAddForm = () => {
    setEditingProject(null);
    setFormMode('add');
    setIsFormOpen(true);
  };

  const openEditForm = (project: Project) => {
    setEditingProject(project);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleSaveProject = (projectData: Omit<Project, 'id'> | Project) => {
    if (formMode === 'edit' && 'id' in projectData) {
      updateProject(projectData.id, projectData);
    } else {
      addProject(projectData as Omit<Project, 'id'>);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
    }
  };

  return (
    <section className="w-full py-16 bg-white" id="portfolio">
      <div className="container mx-auto px-4">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Work</h2>
          <Button 
            onClick={openAddForm}
            className="bg-pink-500 hover:bg-pink-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="aspect-square relative overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => openLightbox(project)}
            >
              <Card className="w-full h-full border-0 rounded-md overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col items-center justify-center">
                  <h3 className="text-white text-lg font-medium px-4 text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 mb-4">
                    {project.title}
                  </h3>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-black backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(project);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-blue-500 hover:text-white backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditForm(project);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-red-500 hover:text-white backdrop-blur-sm"
                      onClick={(e) => handleDeleteProject(project.id, e)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Project Lightbox */}
      {selectedProject && (
        <ProjectLightbox
          project={selectedProject}
          isOpen={isLightboxOpen}
          onClose={closeLightbox}
          onEdit={() => {
            closeLightbox();
            openEditForm(selectedProject);
          }}
        />
      )}

      {/* Project Form */}
      <ProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProject}
        project={editingProject || undefined}
        mode={formMode}
      />
    </section>
  );
}