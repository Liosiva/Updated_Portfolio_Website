"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { X, Plus, Upload, Trash2 } from "lucide-react";
import { Project } from "../hooks/useProjectManager";

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, 'id'> | Project) => void;
  project?: Project;
  mode: 'add' | 'edit';
}

export default function ProjectForm({ isOpen, onClose, onSave, project, mode }: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: project?.title || "",
    thumbnail: project?.thumbnail || "",
    images: project?.images || [],
    tools: project?.tools || [],
    description: project?.description || "",
    concept: project?.concept || "",
    designStory: project?.designStory || "",
  });

  const [newTool, setNewTool] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && project) {
      onSave({ ...project, ...formData });
    } else {
      onSave(formData);
    }
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      thumbnail: "",
      images: [],
      tools: [],
      description: "",
      concept: "",
      designStory: "",
    });
    setNewTool("");
    setNewImageUrl("");
  };

  const addTool = () => {
    if (newTool.trim() && !formData.tools.includes(newTool.trim())) {
      setFormData(prev => ({
        ...prev,
        tools: [...prev.tools, newTool.trim()]
      }));
      setNewTool("");
    }
  };

  const removeTool = (toolToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.filter(tool => tool !== toolToRemove)
    }));
  };

  const addImage = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      if (!formData.thumbnail) {
        setFormData(prev => ({
          ...prev,
          thumbnail: newImageUrl.trim()
        }));
      }
      setNewImageUrl("");
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageToRemove),
      thumbnail: prev.thumbnail === imageToRemove ? prev.images[0] || "" : prev.thumbnail
    }));
  };

  const setAsThumbnail = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      thumbnail: imageUrl
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'edit' ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title"
                required
              />
            </div>
            <div>
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                value={formData.thumbnail}
                onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                placeholder="Enter thumbnail image URL"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the project"
              required
            />
          </div>

          {/* Tools */}
          <div>
            <Label>Tools Used</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                placeholder="Add a tool (e.g., Photoshop)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
              />
              <Button type="button" onClick={addTool} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {tool}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeTool(tool)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <Label>Project Images</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Add image URL"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
              />
              <Button type="button" onClick={addImage} size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Project image ${index + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => setAsThumbnail(image)}
                      >
                        Thumbnail
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => removeImage(image)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  {formData.thumbnail === image && (
                    <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                      Thumb
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Concept */}
          <div>
            <Label htmlFor="concept">Concept</Label>
            <Textarea
              id="concept"
              value={formData.concept}
              onChange={(e) => setFormData(prev => ({ ...prev, concept: e.target.value }))}
              placeholder="Describe the concept behind this project"
              required
            />
          </div>

          {/* Design Story */}
          <div>
            <Label htmlFor="designStory">Design Story (Optional)</Label>
            <Textarea
              id="designStory"
              value={formData.designStory}
              onChange={(e) => setFormData(prev => ({ ...prev, designStory: e.target.value }))}
              placeholder="Tell the story behind the design process"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
              {mode === 'edit' ? 'Update Project' : 'Add Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}