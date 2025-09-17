import { NextResponse } from "next/server";

// Simple placeholder image (solid color) generated on the fly
export async function GET(_req, context) {
  const params = await context.params;
  const width = Number(params?.w) || 300;
  const height = Number(params?.h) || 200;

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>
    <rect width='100%' height='100%' fill='rgb(241, 245, 249)'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='rgb(100, 116, 139)'>${width}x${height}</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}


