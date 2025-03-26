# Deploying to Vercel

## Prerequisites

- A Vercel account
- Git repository with your project

## Setup Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Log in to your Vercel account

3. Click "Add New..." > "Project"

4. Import your Git repository

5. Configure the project:
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install

6. Add Environment Variables:
   - VITE_SUPABASE_URL: Your Supabase URL
   - VITE_SUPABASE_ANON_KEY: Your Supabase anonymous key

7. Click "Deploy"

## Handling Client-Side Routing

The `vercel.json` file in this project includes configuration for client-side routing with React Router. This ensures that all routes are properly handled by the application.

## Troubleshooting

- If you encounter build errors, check the Vercel build logs for details
- Ensure all environment variables are correctly set
- For issues with client-side routing, verify the `vercel.json` configuration

## Updating Your Deployment

Vercel automatically deploys when you push changes to your repository. You can also manually trigger a deployment from the Vercel dashboard.

## Preview Deployments

Vercel creates preview deployments for pull requests, allowing you to test changes before merging to your main branch.
