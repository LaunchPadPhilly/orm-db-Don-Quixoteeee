import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

// Server-side sample projects (fallback for single-project requests)
const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Next.js and Tailwind CSS.',
    imageUrl: '/project1.jpg',
    projectUrl: null,
    githubUrl: null,
    technologies: ['Next.js', 'Tailwind CSS', 'React'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
 {
    id: 2,
    title: 'Movie Database',
    description: 'A reactive movie database with search functionality.',
    imageUrl: '/project2.jpg',
    projectUrl: null,
    githubUrl: null,
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Aero Tech',
    description: 'A responsive weather dashboard using external APIs.',
    imageUrl: '/project3.jpg',
    projectUrl: null,
    githubUrl: null,
    technologies: ['JavaScript', 'APIs', 'Chart.js'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: id }
    });

    if (!project) {
      // If record not found in DB, try to return a sample project
      const fallback = SAMPLE_PROJECTS.find(p => p.id === id) || null
      if (fallback) {
        return NextResponse.json(fallback)
      }

      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    // On server-side errors (DB down, etc.) return a sample project when possible
    const id = parseInt(params.id)
    const fallback = SAMPLE_PROJECTS.find(p => p.id === id) || null
    if (fallback) {
      return NextResponse.json(fallback)
    }

    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;

    const project = await prisma.project.update({
      where: { id: id },
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    
    // Handle Prisma "record not found" error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id: id }
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025' || error.message?.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    console.error('Error deleting project:', error);
    
    // Handle Prisma "record not found" error
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
