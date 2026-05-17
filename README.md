# LuxQr - Premium QR Code Generator

Modern, premium QR code generation and management web application with expiration dates and file support.

## Features

- **Multiple Content Types**: Create QR codes for text, images, videos, and files
- **Expiration Settings**: Set QR codes to expire in 1 day, 1 week, 1 month, or unlimited
- **Premium Design**: Dark mode with glassmorphism effects and neon touches
- **File Upload**: Support for images, videos, and documents
- **Unique URLs**: Each QR code gets a unique UUID-based URL
- **Expiration Handling**: Beautiful error screens when QR codes expire
- **Responsive Design**: Works perfectly on mobile and desktop
- **Smooth Animations**: Built with Framer Motion for fluid interactions

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS with custom premium design system
- **Icons**: Lucide React
- **QR Code Generation**: qrcode.react
- **Date Handling**: date-fns
- **Animations**: Framer Motion
- **Database**: Vercel KV (Redis)
- **File Storage**: Vercel Blob

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Vercel account (for deployment)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. For local development, you can use mock environment variables or set up Vercel KV/Blob locally

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Set up Vercel KV:
   - Go to Storage tab in Vercel dashboard
   - Add Vercel KV integration
   - Copy environment variables
4. Set up Vercel Blob:
   - Go to Storage tab in Vercel dashboard
   - Add Vercel Blob integration
   - Copy BLOB_READ_WRITE_TOKEN
5. Add environment variables in Vercel project settings:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `BLOB_READ_WRITE_TOKEN`
6. Deploy

## Project Structure

```
LuxQr/
├── app/
│   ├── api/
│   │   ├── generate/      # QR code generation API (Vercel KV)
│   │   ├── upload/        # File upload API (Vercel Blob)
│   │   └── qr/[id]/       # QR code retrieval API (Vercel KV)
│   ├── view/[id]/         # QR code view page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/
│   ├── db.ts              # Vercel KV database functions
│   └── utils.ts           # Utility functions
├── public/
│   └── uploads/           # Local uploads (dev only)
└── components/             # Reusable components
```

## Usage

### Creating a QR Code

1. Select content type (Text, Image, Video, or File)
2. Enter your content or upload a file
3. Choose expiration duration
4. Click "QR Kod Oluştur"
5. Download your QR code

### Viewing QR Code Content

- Scan the QR code or visit the unique URL
- Content is displayed in a premium interface
- If expired, a beautiful error screen is shown

## API Endpoints

### POST /api/generate
Creates a new QR code with the provided content.

**Request Body:**
```json
{
  "content": "string",
  "contentType": "text | image | video | file",
  "fileName": "string (optional)",
  "filePath": "string (optional)",
  "expiration": "1day | 1week | 1month | unlimited"
}
```

**Response:**
```json
{
  "success": true,
  "id": "uuid",
  "url": "/view/{id}"
}
```

### POST /api/upload
Uploads a file to Vercel Blob storage.

**Request:** FormData with file

**Response:**
```json
{
  "success": true,
  "fileName": "string",
  "filePath": "https://blob-url"
}
```

### GET /api/qr/[id]
Retrieves QR code data by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "string",
    "contentType": "string",
    "fileName": "string",
    "filePath": "string",
    "expiresAt": "datetime",
    "createdAt": "datetime"
  }
}
```

## Design System

### Colors
- **Gold**: #FFD700, #FFC700, #E6B800
- **Midnight**: #1a1a2e, #16213e, #0f0f23
- **Neon Purple**: #a855f7
- **Neon Blue**: #3b82f6

### Effects
- Glassmorphism with backdrop blur
- Neon glow effects
- Smooth animations
- Gradient backgrounds

## Database Schema

Data is stored in Vercel KV (Redis) with the following structure:

```typescript
interface QrCodeData {
  id: string;
  content: string;
  contentType: 'text' | 'image' | 'video' | 'file';
  fileName: string | null;
  filePath: string | null;  // Vercel Blob URL
  expiresAt: string | null;
  createdAt: string;
}
```

## Development

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

### Reset Database
```bash
# Clear Vercel KV data via Vercel dashboard or CLI
```

## License

This project is for personal and commercial use.

## Credits

Built with modern web technologies and designed for premium user experience.
