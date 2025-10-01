# เสียงเยาวชนไทย (Young Thailand Opinion Survey)

A production-ready web application for conducting a 2-question public opinion survey with live word clouds visualization. Built with Next.js 14, TypeScript, Chakra UI, and MongoDB Atlas.

## Features

- **Two-Question Survey Flow**: Interactive survey with Q1 and Q2 pages
- **Live Word Clouds**: Real-time visualization of aggregated responses using d3-cloud
- **Thai Text Processing**: Custom tokenization using Intl.Segmenter with Thai stopwords
- **Real-time Updates**: Data refreshes every ~8 seconds using SWR
- **Rate Limiting**: IP-based rate limiting to prevent spam
- **Responsive Design**: Mobile-friendly interface with custom Thai branding
- **Anonymous Submissions**: No login required, IP addresses are hashed for privacy

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Framework**: Chakra UI with custom theme
- **Database**: MongoDB Atlas with Mongoose ODM
- **Data Fetching**: SWR for real-time updates
- **Visualization**: d3-cloud for word cloud rendering on HTML5 Canvas
- **Deployment**: Optimized for Vercel

## Project Structure

```
/
├── package.json
├── next.config.js
├── tsconfig.json
├── next-env.d.ts
├── .env.local.example
├── README.md
├── theme.ts                 # Custom Chakra UI theme
├── /pages
│   ├── _app.tsx            # App wrapper with ChakraProvider
│   ├── index.tsx           # Q1: "ความดีคืออะไร"
│   ├── q2.tsx              # Q2: "ต้องทำอย่างไรให้สังคมดี"
│   └── /api
│       └── answers.ts      # GET/POST API for survey responses
├── /components
│   ├── Header.tsx          # App header with branding
│   ├── Footer.tsx          # Simple footer
│   ├── QuestionCard.tsx    # Survey form with word cloud
│   └── WordCloud.tsx       # d3-cloud canvas component
├── /lib
│   └── db.ts               # MongoDB connection singleton
└── /models
    └── Answer.ts           # Mongoose schema for survey responses
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your MongoDB connection details:
   ```env
   MONGODB_URI=mongodb+srv://USER:PASS@CLUSTER/dbname
   MONGODB_DB=young_opinion
   ```

3. **Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Create a database named `young_opinion`
3. Get your connection string and update `MONGODB_URI`
4. Whitelist your deployment IP addresses

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables:
   - `MONGODB_URI`
   - `MONGODB_DB`
3. Deploy with Node.js 18+ runtime
4. Ensure MongoDB Atlas allows connections from Vercel IPs

### Other Platforms

- Compatible with any Node.js hosting platform
- Requires Node.js 18+ for Intl.Segmenter support
- Set environment variables as required

## Features Details

### Thai Text Processing

- Uses `Intl.Segmenter('th')` for accurate Thai word segmentation
- Filters common Thai stopwords and punctuation
- Limits to 200 tokens per submission for performance
- Fallback tokenization for older browsers

### Word Cloud Visualization

- Renders on HTML5 Canvas using d3-cloud
- Font sizes scale from 12px to 64px based on frequency
- 20% of words randomly rotated 90 degrees
- Uses brand color (#fd4420) for consistent styling
- Responsive canvas that adapts to container width

### Rate Limiting & Security

- IP-based rate limiting (10-second window)
- IP addresses hashed with SHA-256 for privacy
- Input validation and sanitization
- 1000 character limit per submission

### Brand Colors

- Primary: `#fd4420` (Brand Orange)
- Background: `#ffe5b6` (Brand Sand)
- Consistent theming throughout the application

## API Endpoints

### POST /api/answers
Submit a new survey response.

**Request Body:**
```json
{
  "questionId": "q1" | "q2",
  "text": "User response text"
}
```

**Response:**
```json
{
  "ok": true,
  "id": "mongodb_object_id"
}
```

### GET /api/answers?questionId={q1|q2}
Get aggregated word cloud data for a question.

**Response:**
```json
{
  "words": [
    { "text": "word", "value": frequency },
    ...
  ]
}
```

## Development

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Performance Considerations

- SWR caching reduces API calls
- MongoDB aggregation pipelines for efficient word counting
- Canvas rendering optimized for smooth updates
- Rate limiting prevents abuse

## Browser Support

- Modern browsers with Intl.Segmenter support
- Fallback tokenization for older browsers
- Mobile-responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2025 เสียงเยาวชนไทย