import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

// Server-side sample data fallback (used when DB is unreachable)
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

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    // If the database or Prisma is not available, return a safe sample payload
    // with HTTP 200 so the frontend can render predictable content.
    return NextResponse.json(SAMPLE_PROJECTS, { status: 200 });
  }
}
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, projectUrl, githubUrl, technologies } = body;

    // Validate required fields
    if (!title || !description || !technologies || technologies.length === 0) {
      return NextResponse.json(
        { error: 'Title, description, and technologies are required' },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
        technologies
      }
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}