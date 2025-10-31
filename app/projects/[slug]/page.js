import React from 'react';
import ProjectDetailPage from '@/components/ProjectDetailPage';
import { projectDetails } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectDetails[slug];
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Project Case Study`,
    description: project.overview,
    openGraph: {
      title: `${project.title} - Project Case Study | Lume Outdoor`,
      description: project.overview,
      images: project.gallery?.[0] ? [project.gallery[0]] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectDetails[slug];
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetailPage projectId={slug} />;
}

export async function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({
    slug: slug,
  }));
}