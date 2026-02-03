import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), ".data");
const PREFS_FILE = join(DATA_DIR, "preferences.json");

interface Preferences {
  topics: string[];
  updatedAt: string;
}

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory might already exist
  }
}

export async function GET() {
  try {
    await ensureDataDir();
    const data = await readFile(PREFS_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    // Return default preferences if file doesn't exist
    return NextResponse.json({ topics: [], updatedAt: new Date().toISOString() });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { topics } = await request.json();

    if (!Array.isArray(topics)) {
      return NextResponse.json(
        { error: "Topics must be an array" },
        { status: 400 }
      );
    }

    await ensureDataDir();

    const preferences: Preferences = {
      topics,
      updatedAt: new Date().toISOString(),
    };

    await writeFile(PREFS_FILE, JSON.stringify(preferences, null, 2));

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json(
      { error: "Failed to save preferences" },
      { status: 500 }
    );
  }
}
