import React from 'react';
import ProjectDetailPage from '@/components/ProjectDetailPage';
import { projectDetails } from '@/lib/content';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const project = projectDetails[params.slug];
  
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

export default function ProjectPage({ params }) {
  const project = projectDetails[params.slug];
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetailPage projectId={params.slug} />;
}

export async function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({
    slug: slug,
  }));
}