# AWS Deployment Guide

## Backend (Flask)

1. Build and push Docker image to Amazon ECR.
2. Create ECS Fargate service using that image.
3. Set environment variable `RATE_LIMIT_PER_MIN` and mount persistent volume for `app/data`.
4. Attach Application Load Balancer and expose port 5000.

## Frontend (React)

1. Run `npm run build` in `medical-dashboard`.
2. Upload `medical-dashboard/build` to S3 bucket configured for static hosting.
3. Create CloudFront distribution in front of S3.
4. Add route fallback for SPA (`index.html`).

## CI/CD Suggestion

- Use GitHub Actions:
  - Build backend image and push to ECR on `main`.
  - Deploy ECS task definition update.
  - Build frontend and sync to S3 bucket.
